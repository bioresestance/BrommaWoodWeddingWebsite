"""
    Administrator script to manage the FastAPI application.
"""

import argparse
import pandas as pd

from app.database.db_connection import start_db_connection, stop_db_connection
from app.database.models import Admin, Guest

def create_admin_user(username: str, password: str, email: str):
    admin = Admin(username=username, email=email)
    admin.hash_password(password)
    admin.save()

def delete_admin_user(username: str):
    Admin.objects(username=username).delete()

def create_guests(filename: str, delete: bool = False):
    # Read the Excel file
    df = pd.read_excel(filename)

    # Iterate over the rows of the DataFrame
    for _, row in df.iterrows():
        first_name = row['First Name']
        last_name = row['Last Name']
        invite_code = row['Invite Code']
        plus_one_allowed = row['Plus One Allowed']


        # Check if a Guest with the same firstname, lastname, and invite_code already exists
        existing_guest = Guest.objects(
            first_name=first_name,
            last_name=last_name,
        ).first()

        if delete and existing_guest is not None:
            existing_guest.delete()
            print(f"Guest {first_name} {last_name} deleted.")

        if existing_guest is None:
            # Create a new Guest object
            guest = Guest(
                first_name=first_name,
                last_name=last_name,
                plus_one_allowed=plus_one_allowed
            )

            # Hash the invite code to use as the password
            guest.hash_password(str(invite_code))

            # Save the Guest object to the database
            guest.save()
            print(f"Guest {first_name} {last_name} created.")
        else:
            print(f"Guest {first_name} {last_name} already exists, skipping.")

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Manage your FastAPI application.')
    subparsers = parser.add_subparsers()

    parser_create_user = subparsers.add_parser('create-admin')
    parser_create_user.add_argument('username')
    parser_create_user.add_argument('password')
    parser_create_user.add_argument('email')
    parser_create_user.set_defaults(func=create_admin_user)

    parser_delete_user = subparsers.add_parser('delete-admin')
    parser_delete_user.add_argument('username')
    parser_delete_user.set_defaults(func=delete_admin_user)

    parser_create_guests = subparsers.add_parser('create-guests')
    parser_create_guests.add_argument('filename')
    parser_create_guests.set_defaults(func=create_guests)
    parser_create_guests.add_argument("-d", "--delete", action="store_true", help="Delete all existing guests before creating new ones.")

    args = parser.parse_args()
    start_db_connection()
    func = vars(args).pop('func')
    func(**vars(args))
    stop_db_connection()