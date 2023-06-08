from decouple import Config, RepositoryEnv
import os

# Get the current working directory
cwd = os.getcwd()

# Get the path to the file with settings parameters
dotenv_file = os.path.join(cwd, "resources", ".env")

# Load the environment variables from the .env file
env_config = Config(RepositoryEnv(dotenv_file))

# Get the URL path from the environment variables
url_path = env_config.get("url_path")

# Get the database URL from the environment variables
database_url = env_config.get("database_url")

# Get the security parameters from the environment variables
secret_key = env_config.get("secret_key")
algorithm = env_config.get("algorithm")
