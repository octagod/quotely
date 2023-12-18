"""Package Init file"""
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy


# configurations
app = Flask(__name__, static_folder="frontend/build", static_url_path="")
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///database.db"
db = SQLAlchemy(app)
CORS(app)