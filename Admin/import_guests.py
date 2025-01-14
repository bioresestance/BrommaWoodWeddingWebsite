# /// script
# requires-python = ">=3.12"
# dependencies = [
#     "openpyxl",
#     "pandas",
# ]
# ///

import pandas as pd
import json
import random
import string
import argparse

# Function to generate a random invite code
def generate_invite_code(length=25):
    characters = string.ascii_letters + string.digits + string.digits
    return ''.join(random.choice(characters) for i in range(length))


def import_guests(file_path: str):
    # Read the Excel file
    df = pd.read_excel(file_path)

    # List to hold all user data
    users = []

    # Process each record
    for index, record in df.iterrows():
        first_name = str(record['First Name']).strip().capitalize()
        last_name = str(record['Last Name']).strip().capitalize()
        plus_one_allowed = record['Plus One Allowed'].strip().lower() == 'yes'
        email = str(record['Email']) if str(record['Email']) != "nan" else ""
        
        username = f"{first_name}_{last_name}"
        invite_code = generate_invite_code()
        
        user_data = {
            "username": username,
            "plus_one": plus_one_allowed,
            "email": email,
            "code": invite_code
        }
        
        users.append(user_data)
    return users


def main():

    # Add excel file as argument
    parser = argparse.ArgumentParser(description="Manage admin endpoints")
    parser.add_argument("--input_file", help="Excel file containing guest data", default="guests.xlsx")
    parser.add_argument("--output_file", help="JSON file to write user data to", default="users.json")

    args = parser.parse_args()

    users = import_guests(args.input_file)

    # Write to JSON file
    with open(args.output_file, 'w') as json_file:
        json.dump(users, json_file, indent=4)

    print("User data has been written to users.json")


if __name__ == "__main__":
    main()