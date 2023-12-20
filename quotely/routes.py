"""Handle all api endpoints"""
import os
import json
import jwt
from flask import jsonify, request, make_response, send_from_directory
from flask_bcrypt import Bcrypt
from flask_cors import cross_origin
from dotenv import load_dotenv

from quotely.models import Users, Projects
from quotely import app, db


bcrypt = Bcrypt()
load_dotenv()
secret_key = os.environ["SECRET_KEY"]


@app.route('/')
@cross_origin()
def serve():
    """Serves the front end"""
    print(app.static_folder)
    return send_from_directory(app.static_folder, "index.html")

@app.route('/api/register', methods=["POST"])
@cross_origin()
def register():
    "create new user route"
    response = {}
    user_ = request.get_json()
    email, fullname, password = user_.values()

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
            # 1 day
            one_day = 24 * 60 * 60
            res.set_cookie("token", token, httponly=True, max_age=one_day)
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

@app.route("/api/login", methods=["POST"])
@cross_origin()
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
            # 1 day
            one_day = 24 * 60 * 60
            res.set_cookie("token", token, httponly=True, max_age=one_day)
            return res
        else:
            response = {"success": False, "msg": "Password incorrect", "error": "Password incorrect"}
    else:
        response = {"success": False, "msg": "Email doesn't exist", "error": "No email found in db"}

    return response

@app.route('/api/logout', methods=["GET"])
@cross_origin()
def logout():
    """Logout request"""
    res = make_response(jsonify({
        "success": True
    }))
    res.set_cookie("token", "", expires=0)
    return res

@app.route('/api/user', methods=["GET"])
@cross_origin()
def user():
    """Get user details including projects"""
    res = make_response()
    # token
    token = request.cookies.get("token")

    if token:
        try:
            # check that token is valid
            verified = jwt.decode(token, secret_key, algorithms="HS256")
            uid = verified["id"]
            # query db
            doc = Users.query.filter_by(id=uid).first()
            projects = []  # to hold user's projects
            # loop through projects in db and save to projects variable 
            for project in doc.projects:
                projects.append({
                    "id": project.id,
                    "title": project.title,
                    "content": project.content,
                    "timestamp": project.timestamp
                })
            res = make_response(jsonify({
                "success": True, 
                "user": {
                    "id": doc.id,
                    "fullname": doc.fullname,
                    "email": doc.email,
                    "projects": projects
                }
            }))
            res.status_code = 200
        except Exception as e:
            print(f"An unexpected error occured: {e}")
            res = make_response(jsonify({
                "success": False, "msg": "An error occured", "error": f"An unexpected error occured: {e}"
                }))
            res.status_code = 500
    else:
        res = make_response(jsonify({
            "success": False, "msg": "Unauthorised User", "error": "No token"
        }))
        res.status_code = 400

    return res


@app.route("/api/add_project", methods=["POST"])
@cross_origin()
def add_project():
    """Add project to user's projects"""
    res = make_response()
    verify = verify_cookie()

    if verify["success"]:
        try:
            title, content, user_id = (request.get_json()).values()
            project = Projects(title=title, content=json.dumps(content), user_id=user_id)
            db.session.add(project)
            db.session.commit()
            res = make_response(jsonify({
                "success": True,
            }))
            res.status_code = 200
        except Exception as e:
            res = make_response(jsonify({
                "success": False,
                "msg": "An unexpected error occured",
                "error": f"Error: {e}"
            }))
            res.status_code = 500
    else:
        res = make_response(jsonify({
            "success": verify["success"],
            "msg": "An error occured",
            "error": verify["error"]
        }))
        res.status_code = verify["code"]

    return res

@app.route('/api/get_project', methods=["POST"])
@cross_origin()
def get_project():
    """Get Project"""
    res = make_response()
    verify = verify_cookie()

    if verify["success"]:
        req = request.get_json()
        doc = Projects.query.filter_by(id=req["id"]).first()
        project = {
            "id": doc.id,
            "title": doc.title,
            "content": doc.content,
            "timestamp": doc.timestamp
        }
        print(doc)
        res = make_response(jsonify({
            "success": True,
            "project": project
        }))
        res.status_code = 200
    else:
        res = make_response(jsonify({
            "success": verify["success"],
            "msg": "An error occured",
            "error": verify["error"]
        }))
        res.status_code = verify["code"]
    
    return res

@app.route('/api/update_project', methods=["POST"])
@cross_origin()
def update_project():
    """Update project"""
    res = make_response()
    verify = verify_cookie()

    if verify["success"]:
        # get project
        id, title, content = (request.get_json()).values()
        project = Projects.query.filter_by(id=id).first()
        project.title = title
        project.content = json.dumps(content)
        db.session.commit()
        res = make_response(jsonify({
            "success": True
        }))
        res.status_code = 200
    else:
        res = make_response(jsonify({
            "success": verify["success"],
            "msg": "An error occured",
            "error": verify["error"]
        }))
        res.status_code = verify["code"]
    
    return res


@app.route('/api/delete_project', methods=["POST"])
@cross_origin()
def delete_project():
    """Delete Project"""
    res = make_response()
    verify = verify_cookie()

    if verify["success"]:
        try:
            req = request.get_json()
            project = Projects.query.filter_by(id=req["id"]).first()
            db.session.delete(project)
            db.session.commit()
            res = make_response(jsonify({
                "success": True
            }))
            res.status_code = 200
        except Exception as e:
            res = make_response(jsonify({
                "success": False,
                "msg": "An error occured",
                "error": f"An error occured: {e}"
            }))
            res.status_code = 500
    else:
        res = make_response(jsonify({
            "success": verify["success"],
            "msg": "An error occured",
            "error": verify["error"]
        }))
        res.status_code = verify["code"]
    
    return res


@app.route('/api/get_users/<password>', methods=["GET"])
@cross_origin()
def get_users(password):
    """Get all users"""
    res = make_response()
    if password == "chidiogo99":
        docs = Users.query.all()
        users = []
        for user in docs:
            users.append({
                "id": user.id,
                "fullname": user.fullname,
                "email": user.email,
                "projects": len(user.projects)
            })
        res = make_response(jsonify(users))
        res.status_code = 200
    else:
        res.status_code = 404
    return res

def verify_cookie():
    """Verify token"""
    token = request.cookies.get('token')
    if not token:
        return {
            "success": False,
            "error": "Invalid token",
            "code": 400
        }
    try:
        # verify token
        verified = jwt.decode(token, secret_key, algorithms="HS256")
        if verified['id']:
            return {"success": True}
    except Exception as e:
        return {
            "success": False,
            "error": f"An unexpected error occured: {e}",
            "code": 500
        }
