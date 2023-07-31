from fastapi import FastAPI, status
from fastapi.responses import RedirectResponse
from fastapi.exceptions import RequestValidationError

from .cors import setup_cors
from .env import API_URL
from .routers.auth import auth
from .routers.game import game
from .utils.exception_handler import validation_exception_handler


app = FastAPI()

setup_cors(app)

app.include_router(auth)
app.include_router(game)


@app.get("/")
async def root():
    response = RedirectResponse(
        url=f"{API_URL}/login", status_code=status.HTTP_307_TEMPORARY_REDIRECT
    )
    return response


@app.exception_handler(RequestValidationError)
async def validation_exception(request, exc):
    return await validation_exception_handler(request, exc)
