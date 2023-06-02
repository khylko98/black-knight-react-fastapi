from fastapi import HTTPException, status
import json


# Method to read .json file by path to .json file
def readJSON(path_to_file: str, file_name: str):
    try:
        file = open(path_to_file)
        data_from_file = json.load(file)
        file.close()
        return data_from_file
    except: 
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND, 
            detail = f"{file_name} not found")