"""
    Administrator script to manage the FastAPI application.
"""

import argparse

from app.database.db_connection import start_db_connection, stop_db_connection
from app.database.models import Admin, Guest

def create_admin_user(username: str, password: str, email: str):
    admin = Admin(username=username, email=email)
    admin.hash_password(password)
    admin.save()

def delete_admin_user(username: str):
    Admin.objects(username=username).delete()


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

    args = parser.parse_args()
    start_db_connection()
    func = vars(args).pop('func')
    func(**vars(args))
    stop_db_connection()