from fastapi import HTTPException, status
import json


# Method to read .json file by path to .json file
def read_JSON(path_to_file: str, file_name: str):
    try:
        file = open(path_to_file)
        data_from_file = json.load(file)
        return data_from_file
    except: 
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND, 
            detail = f"{file_name} not found")
    finally:
        if file:
            file.close()
            