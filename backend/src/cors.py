from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .env import FRONTEND_URL


def setup_cors(app: FastAPI):
    origins = [
        FRONTEND_URL,
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
