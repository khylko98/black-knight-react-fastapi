from pymongo import MongoClient

from .env import DATABASE_URL


try:
    client = MongoClient(DATABASE_URL, username="user", password="password")
    db = client["db"]
    collection = db["users"]
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")
    raise
