from pymongo import MongoClient
from .env import db_connection_url

try:
    db_connection = MongoClient(db_connection_url)
    db = db_connection.api
    collection = db["users"]
except Exception as e:
    # Handle the exception appropriately
    # (e.g., logging, error reporting, fallback mechanism)
    print(f"Error connecting to MongoDB: {e}")
    raise
