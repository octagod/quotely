"""Flask Main Point"""
from flask import Flask, jsonify
app = Flask(__name__)


@app.route("/data",methods=["GET"])
def index():
    """index route"""
    data = [{"name": "Owen", "occupation": "Software Engineer"}]
    data = jsonify(data)
    return data

if __name__ == "__main__":
    app.run(debug=True, port="4000")
