from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from fastapi.exceptions import RequestValidationError
from .config.env import url_path
from .routes.auth import auth
from .routes.game import game
from .util.exception_handler import validation_exception_handler
from .config.cors import setup_cors

app = FastAPI()

setup_cors(app)

app.include_router(auth)
app.include_router(game)


@app.get(f"{url_path}")
async def redirect():
    return RedirectResponse(f"{url_path}/login")


@app.exception_handler(RequestValidationError)
async def validation_exception(request, exc):
    return await validation_exception_handler(request, exc)
