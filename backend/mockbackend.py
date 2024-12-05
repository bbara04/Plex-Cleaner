from flask import Flask, jsonify, make_response, render_template
from flask_socketio import SocketIO, emit, send
from flask_cors import CORS
from flask import request
import json

app = Flask(__name__)
socketio = SocketIO(app)
CORS(app)

@app.after_request
def set_csp(response):
    csp = "default-src 'self' http: https: 'unsafe-inline' 'unsafe-eval'"
    response.headers['Content-Security-Policy'] = csp
    return response

config = {}
with open("config.json", "r") as f:
    config = json.load(f)

def fileNameCrop(str):
        return str.split('/')[-1]


@app.route('/api/config', methods = ["GET"])
def get_config():
    return jsonify(config), 200


@app.route('/api/config', methods=["PUT"])
def update_config():
    global config
    tempholder = request.get_json()

    print("Received config:", tempholder)

    config = tempholder

    with open("config.json", "w") as f:
        json.dump(config, f, indent=4)

    return jsonify(config), 200

# Get all media that is expired meaning it has not been watched for a certain amount of days
# It also combines the data from the Plex, Sonarr, Radarr and Tautulli libraries
@app.route('/api/media/expired', methods = ['GET'])
def get_expired_media():
    exampleData = [
        {
            "title": "Inception",
            "last_watched": "2024-12-01T20:30:00",
            "id": 1,
            "type": "movie",
            "checked": False
        },
        {
            "title": "The Matrix",
            "last_watched": "2024-11-28T22:00:00",
            "id": 2,
            "type": "movie",
            "checked": False
        },
        {
            "title": "Breaking Bad",
            "last_watched": "2024-11-25T19:00:00",
            "id": 3,
            "type": "tv_series",
            "checked": False
        },
        {
            "title": "The Witcher",
            "last_watched": "2024-11-20T21:30:00",
            "id": 4,
            "type": "tv_series",
            "checked": False
        }
    ]
    return jsonify(exampleData)

# Get all media that can be found in all of the libraries
# It also combines the data from the Plex, Sonarr, Radarr and Tautulli libraries
@app.route('/api/media/all', methods = ['GET'])
def get_all_media():
    exampleData = [
    {
        "title": "Inception",
        "last_watched": "2024-12-01T20:30:00",
        "id": 1,
        "type": "movie",
        "checked": False
    },
    {
        "title": "The Matrix",
        "last_watched": "2024-11-28T22:00:00",
        "id": 2,
        "type": "movie",
        "checked": False
    },
    {
        "title": "Breaking Bad",
        "last_watched": "2024-11-25T19:00:00",
        "id": 3,
        "type": "tv_series",
        "checked": False
    },
    {
        "title": "The Witcher",
        "last_watched": "2024-11-20T21:30:00",
        "id": 4,
        "type": "tv_series",
        "checked": False
    },
    {
        "title": "The Dark Knight",
        "last_watched": "2024-11-18T18:45:00",
        "id": 5,
        "type": "movie",
        "checked": False
    },
    {
        "title": "Stranger Things",
        "last_watched": "2024-11-15T23:10:00",
        "id": 6,
        "type": "tv_series",
        "checked": False
    },
    {
        "title": "Avatar",
        "last_watched": "2024-11-10T20:00:00",
        "id": 7,
        "type": "movie",
        "checked": False
    },
    {
        "title": "The Mandalorian",
        "last_watched": "2024-11-05T17:30:00",
        "id": 8,
        "type": "tv_series",
        "checked": False
    },
    {
        "title": "The Godfather",
        "last_watched": "2024-10-30T21:00:00",
        "id": 9,
        "type": "movie",
        "checked": False
    },
    {
        "title": "Sherlock",
        "last_watched": "2024-10-25T19:45:00",
        "id": 10,
        "type": "tv_series",
        "checked": False
    }
]
    return jsonify(exampleData)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
