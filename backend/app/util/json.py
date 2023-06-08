from fastapi import HTTPException, status
import json


def read_JSON(path_to_file: str, file_name: str):
    try:
        with open(path_to_file) as file:
            data_from_file = json.load(file)
            return data_from_file
    except FileNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"{file_name} not found"
        )
