from pymongo import MongoClient

from .env import DATABASE_URL


try:
    db_connection = MongoClient(DATABASE_URL)
    db = db_connection.api
    collection = db["users"]
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")
    raise
