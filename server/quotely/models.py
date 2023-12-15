"""Models file: Models are the tables created as classes"""
from datetime import datetime
from quotely import db


class Users(db.Model):
    """Users table"""
    id = db.Column(db.Integer, primary_key=True)
    fullname = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(50), nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    projects = db.relationship('Projects', backref="creator", lazy=True )

    def __repr__(self):
        """String representation of the class"""
        return f"User({self.fullname}, {self.email})"


class Projects(db.Model):
    """Projects table"""
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.String(1000), nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    def __repr__(self):
        """String representation of the class"""
        return f"Project({self.title}, uid={self.user_id})"
