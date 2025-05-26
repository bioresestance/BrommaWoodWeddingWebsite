# /// script
# requires-python = ">=3.12"
# dependencies = [
#     "requests",
# ]
# ///

import argparse
import requests
import json
import csv

def authenticate(base_url, username, password):
    url = f"{base_url}/admin/login"
    data = {
        "username": username,
        "password": password
    }
    response = requests.post(url, data=data)
    if response.status_code == 200:
        return response.json()["access_token"]
    else:
        raise Exception("Authentication failed")

def ensure_users_exist(base_url, token, users):
    headers = {
        "Authorization": f"Bearer {token}"
    }
    for user in users:
        # Check if user exists
        response = requests.get(f"{base_url}/admin/guest/{str(user['username']).lower()}", headers=headers)
        if response.status_code == 404:
            print(f"User {user['username']} does not exists, creating...")
            response = requests.post(f"{base_url}/admin/guest/create", headers=headers, json=user)
            if response.status_code != 201:
                print(f"Failed to create user {user['username']}: {response.text}")
            else:
                print(f"User {user['username']} created successfully")
        else:
            print(f"User {user['username']} already exists")


          


def nuke_db(base_url, token):
    headers = {
        "Authorization": f"Bearer {token}"
    }

    response = requests.post(f"{base_url}/admin/nuke", headers=headers)
    if response.status_code == 200:
        print("Database nuked")
    else:
        print(f"Failed to nuke database: {response.text}")

def send_email(email, base_url, token):
    headers = {
        "Authorization": f"Bearer {token}"
    }

    response = requests.post(f"{base_url}/admin/email/invite/{email}", headers=headers)
    if response.status_code == 200:
        print("Email Sent")
    else:
        print(f"Failed to send email: {response.text}")


def get_attending_guests_to_csv(base_url, token, csv_filename):
    headers = {
        "Authorization": f"Bearer {token}"
    }
    response = requests.get(f"{base_url}/admin/guests/attending", headers=headers)
    if response.status_code == 200:
        guests = response.json().get("attending_guests", [])
        if not guests:
            print("No attending guests found.")
            return []
        with open(csv_filename, mode="w", newline="") as csvfile:
            fieldnames = ["first_name", "last_name", "email"]
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()
            for guest in guests:
                writer.writerow({
                    "first_name": guest.get("first_name", ""),
                    "last_name": guest.get("last_name", ""),
                    "email": guest.get("email", ""),
                })
        print(f"Attending guests written to {csv_filename}")
        return guests
    else:
        print(f"Failed to retrieve attending guests: {response.text}")
        return []
    
def send_logistics_email(base_url, token):
    headers = {
        "Authorization": f"Bearer {token}"
    }

    response = requests.post(f"{base_url}/admin/guests/send_logistics_email", headers=headers)
    if response.status_code == 200:
        print("Emails Sent")
    else:
        print(f"Failed to send email: {response.text}")

def main():
    parser = argparse.ArgumentParser(description="Manage admin endpoints")
    parser.add_argument("--nuke", help="Nuke the database", default=False , action="store_true")
    parser.add_argument("--base-url", help="Base URL of the admin API", default="http://localhost:8000")
    parser.add_argument("--auth-file", help="File containing username and password for authentication", default="auth.json")
    parser.add_argument("--users-file", help="File containing list of users to ensure exist on the server", default="users.json")
    parser.add_argument("--invite", help="Send an invite email to a guest or guests", default="")
    parser.add_argument("--attending-csv", help="Output attending guests to CSV file", default="")
    parser.add_argument("--logistics-email", help="Send logistics email to all guests", default=False, action="store_true")

    args = parser.parse_args()

    with open(args.auth_file, "r") as f:
        auth_data = json.load(f)
        username = auth_data["username"]
        password = auth_data["password"]


    try:
        token = authenticate(args.base_url, username, password)
    except Exception as e:
        print(f"Failed to authenticate: {e}")
        return

    if args.nuke:
        nuke_db(args.base_url, token)

    elif args.logistics_email:
        send_logistics_email(args.base_url, token)

    elif args.invite != "":
        send_email(args.invite, args.base_url, token)

    elif args.attending_csv:
        get_attending_guests_to_csv(args.base_url, token, args.attending_csv)

    else:
        with open(args.users_file, "r") as f:
            users = json.load(f)
        ensure_users_exist(args.base_url, token, users)

if __name__ == "__main__":
    main()