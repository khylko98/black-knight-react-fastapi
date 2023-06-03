from fastapi import FastAPI, status
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from .util.database import engine
from .model import user
from .controller import auth, game
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from .util.config import URL_PATH


app = FastAPI()

user.Base.metadata.create_all(bind = engine)

# Get access from frontend
origins = [
    "http://localhost:5173"
]

# Set cors settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(auth.router)
app.include_router(game.router)


@app.get(f'{URL_PATH}')
async def redirect():
    return RedirectResponse(f"{URL_PATH}/login")

# Handler for exception with incorrect request's
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    reformatted_message = []

    for pydantic_error in exc.errors():
        loc, msg = pydantic_error["loc"], pydantic_error["msg"]
        filtered_loc = loc[1:] if loc[0] in (
            "body", "query", "path") else loc
        field_string = ".".join(filtered_loc)
        reformatted_message.append(field_string + ": " + msg)

    return JSONResponse(
        status_code = status.HTTP_400_BAD_REQUEST,
        content = jsonable_encoder(
            {"detail": "Invalid request", "errors": reformatted_message}
        ),
    )
