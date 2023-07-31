import json

from fastapi import HTTPException, status


async def read_json(path_to_file: str, filename: str):
    try:
        with open(path_to_file) as file:
            data_from_file = json.load(file)
            return data_from_file
    except FileNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=f"{filename} not found"
        )
    except (PermissionError, IOError) as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error reading {filename}: {str(e)}",
        )
