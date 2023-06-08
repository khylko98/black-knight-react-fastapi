from fastapi import FastAPI, status
from fastapi.responses import RedirectResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.encoders import jsonable_encoder
from .util.database import engine
from .model import user
from .controller import auth, game
from .util.config import url_path

app = FastAPI()

# Create database tables
user.Base.metadata.create_all(bind=engine)

# Set up CORS settings
origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(game.router)


@app.get(f'{url_path}')
async def redirect():
    return RedirectResponse(f"{url_path}/login")


# Exception handler for validation errors
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    reformatted_message = []

    for pydantic_error in exc.errors():
        loc, msg = pydantic_error["loc"], pydantic_error["msg"]
        filtered_loc = loc[1:] if loc[0] in ("body", "query", "path") else loc
        field_string = ".".join(filtered_loc)
        reformatted_message.append(f"{field_string}: {msg}")

    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content=jsonable_encoder(
            {"detail": "Invalid request", "errors": reformatted_message}
        ),
    )
