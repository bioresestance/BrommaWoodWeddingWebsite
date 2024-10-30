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
  { "username": "user1", "password": "password1" },
  { "username": "user2", "password": "password2" }
]
```

Run the Script:

```sh
python3 manage_users.py
```
