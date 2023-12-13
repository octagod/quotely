"""Handle all api endpoints"""
import os
import jwt
from flask import jsonify, request, make_response
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv

from quotely.models import Users
from quotely import app, db


bcrypt = Bcrypt()
load_dotenv()
secret_key = os.environ["SECRET_KEY"]



@app.route('/register', methods=["POST"])
def register():
    "create new user route"
    response = {}
    user = request.get_json()
    email, fullname, password = user.values()

    # check if email exists in db
    docs = Users.query.filter_by(email=email).all()
    if len(docs) == 0:
        # create user
        if len(fullname) > 3:
            # hash password
            hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
            # add user to db
            db_user = Users(email=email, fullname=fullname, password=hashed_password)
            db.session.add(db_user)
            db.session.commit()
            # create token
            token = jwt.encode({"id": db_user.id}, secret_key, algorithm="HS256").decode("utf-8")
            res = make_response(jsonify({
                "success": True,
            }))
            res.set_cookie("token", token, httponly=True, max_age=1)
            return res
        else:
            response = {
                "success": False,
                "msg": "Full Name too short",
                "error": "Full Name too short"
            }
    else:
        # user exists
        response = {
            "success": False,
            "msg": "Email already exists",
            "error": "Email exists in database"
        }

    return jsonify(response)

@app.route("/login", methods=["POST"])
def login():
    """Login route"""
    response = {}

    email, password = (request.get_json()).values()
    # check that email exists
    docs = Users.query.filter_by(email=email).all()
    if(len(docs) == 1):
        if bcrypt.check_password_hash(pw_hash=docs[0].password, password=password):
            # pass user to frontend and set token
            token = jwt.encode({"id": docs[0].id}, secret_key, algorithm="HS256").decode("utf-8")
            res = make_response(jsonify({
                "success": True, 
                "user": {
                    "id": docs[0].id,
                    "fullname": docs[0].fullname,
                    "email": docs[0].email,
                }
            }))
            res.set_cookie("token", token, httponly=True, max_age=1)
            return res
        response = {"success": False, "msg": "Password incorrect", "error": "Password incorrect"}
    response = {"success": False, "msg": "Email doesn't exist", "error": "No email found in db"}


    return response
