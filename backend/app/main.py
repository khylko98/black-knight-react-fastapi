from fastapi import FastAPI, status
from .util.database import engine
from .model import user
from .controller import auth, game
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder


app = FastAPI()

user.Base.metadata.create_all(bind = engine)


app.include_router(auth.router)
app.include_router(game.router)


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
