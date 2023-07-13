from decouple import Config, RepositoryEnv
import os

cwd = os.getcwd()

dotenv_file = os.path.join(cwd, "resources", ".env")
env_config = Config(RepositoryEnv(dotenv_file))

try:
    db_connection_url = env_config.get("db_connection_url", default="")
    secret_key = env_config.get("secret_key", default="")
    algorithm_type = env_config.get("algorithm_type", default="")
    url_path = env_config.get("url_path", default="")
except Exception as e:
    # Handle the exception appropriately
    # (e.g., logging, error reporting, fallback values)
    print(f"Error reading configuration: {e}")
    raise
