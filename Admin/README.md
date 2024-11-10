# Admin Tools

This folder contains tools to access the admin api on the website.

# Usage

Create Authentication File: auth.json

```json
{
  "username": "admin",
  "password": "adminpassword"
}
```

Create Users File: users.json

```json
[
  { "username": "user1", "code": "1234567890", "plus_one": false },
  { "username": "user2", "code": "2345678901", "plus_one": false }
]
```

Run the Script:

```sh
python3 manage_users.py
```
