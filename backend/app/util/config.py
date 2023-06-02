from decouple import Config, RepositoryEnv
import os


# Get full path to project dir
cwd = os.getcwd()

# Get path to file with settings param
DOTENV_FILE = f"{cwd}/resources/.env"

ENV_CONFIG = Config(RepositoryEnv(DOTENV_FILE))

# Get url path from file .env
URL_PATH = ENV_CONFIG.get('url_path')
# Get DB url from file .env
DATABASE_URL = ENV_CONFIG.get('database_url')
# Security params
SECRET_KEY = ENV_CONFIG.get("secret_key")
ALGORITHM = ENV_CONFIG.get("algorithm")