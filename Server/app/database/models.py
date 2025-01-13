from mongoengine import Document, StringField, BooleanField, EmbeddedDocument, EmbeddedDocumentField, ListField, BinaryField

class GuestPlusOne(EmbeddedDocument):
    """
    Guest Plus One class, to be embedded in the Guest class.
    """
    first_name = StringField(default= "")
    last_name = StringField(default= "")
    email = StringField(default= "")
    dietary_restrictions = ListField(StringField(default=""))
    additional_notes = StringField(default= "")



class User(Document):
    """
    Base User class for all user types.
    """
    password = BinaryField(required=True)

    meta = {'collection': 'users', 
            "allow_inheritance": True,
            }


class Admin(User):
    """
    Admin user class.
    """
    username = StringField(required=True,)
    email = StringField(required=True)


class Guest(User):
    """
    Guest user class.
    """
    # Contact fields
    first_name = StringField(required=True)
    last_name = StringField(required=True, unique_with="first_name")
    preferred_name = StringField(default= "")
    email = StringField(default= "")

    # Address fields
    phone = StringField(default= "")
    address = StringField(default= "")
    city = StringField(default= "")
    province = StringField(default= "")
    area_code = StringField(default= "")
    country = StringField(default= "")

    # Miscellaneous fields
    attending = BooleanField(default=False)
    dietary_restrictions = ListField(StringField(default=""))
    additional_notes = StringField(default="")
    is_wedding_party = BooleanField(default=False)
    plus_one_allowed = BooleanField(default=False)
    has_plus_one = BooleanField(default=False)
    plus_one = EmbeddedDocumentField(GuestPlusOne)
