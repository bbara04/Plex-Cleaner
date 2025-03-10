from flask import Flask, jsonify, send_from_directory
from flask_socketio import SocketIO
from flask_cors import CORS
from flask import request
import requests
import json
from reader import plex_reader, radarr_reader, sonarr_reader, tautilli_reader

app = Flask(__name__, static_folder='./frontend/dist')
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

# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and path.endswith(('js', 'css', 'html', 'png', 'jpg', 'jpeg', 'svg', 'ico', 'json')):
        # Serve static files (React build files)
        return send_from_directory(app.static_folder, path)
    else:
        # Fallback to React's index.html
        return send_from_directory(app.static_folder, 'index.html')

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

    # if file name contains any of these strings, it will be excluded from the list
    excluded_str = config['excluded_lines']

    tautulli_stats = tautilli_reader.readTautulli(config['server']['ip'], config['tautulli']['port'], config['tautulli']['api'])
    plex_stats = plex_reader.readPlex(config['server']['ip'], config['plex']['port'], config['plex']['api'])
    sonarr_stats = sonarr_reader.readSonarr(config['server']['ip'], config['sonarr']['port'], config['sonarr']['api'])
    radarr_stats = radarr_reader.readRadarr(config['server']['ip'], config['radarr']['port'], config['radarr']['api'])

    sel_list = []

    for tautulli in tautulli_stats:
        for plex in plex_stats:
            if tautulli[0] == plex[0]:
                tiltott = False
                # Check if the file name contains any of the excluded strings
                for exc_str in excluded_str:
                    if exc_str.lower() in plex[2].lower():
                        tiltott = True
                        break
                # Handle the case if the media is a show
                if tiltott == False and plex[3] == "show":
                    for sonarr in sonarr_stats:
                        if fileNameCrop(sonarr[2]) == fileNameCrop(plex[2]) and tautulli[2] > config['sonarr']["delete_after_days"]:
                            sel_list.append({"title": sonarr[1], "last_watched": tautulli[2], "id":sonarr[0], "type": "show"})
                # Handle the case if the media is a movie
                elif tiltott == False and plex[3] == "movie":
                    for radarr in radarr_stats:
                        if fileNameCrop(radarr[2]) == fileNameCrop(plex[2]) and tautulli[2] > config['radarr']["delete_after_days"]:
                            sel_list.append({"title": radarr[1], "last_watched": tautulli[2], "id":radarr[0], "type": "movie"})

    return jsonify(sel_list)

all_media = {}

# Get all media that can be found in all of the libraries
# It also combines the data from the Plex, Sonarr, Radarr and Tautulli libraries
@app.route('/api/media/all', methods = ['GET'])
def get_all_media():
        global all_media
    
        tautulli_stats = tautilli_reader.readTautulli(config['server']['ip'], config['tautulli']['port'], config['tautulli']['api'])
        plex_stats = plex_reader.readPlex(config['server']['ip'], config['plex']['port'], config['plex']['api'])
        sonarr_stats = sonarr_reader.readSonarr(config['server']['ip'], config['sonarr']['port'], config['sonarr']['api'])
        radarr_stats = radarr_reader.readRadarr(config['server']['ip'], config['radarr']['port'], config['radarr']['api'])
    
        sel_list = []
    
        for tautulli in tautulli_stats:
            for plex in plex_stats:
                if tautulli[0] == plex[0]:
                    if plex[3] == "show":
                        for sonarr in sonarr_stats:
                            if fileNameCrop(sonarr[2]) == fileNameCrop(plex[2]):
                                sel_list.append({"title": sonarr[1], "last_watched": tautulli[2], "id":sonarr[0], "type": "show"})
                    elif plex[3] == "movie":
                        for radarr in radarr_stats:
                            if fileNameCrop(radarr[2]) == fileNameCrop(plex[2]):
                                sel_list.append({"title": radarr[1], "last_watched": tautulli[2], "id":radarr[0], "type": "movie"})

        all_media = sel_list
        return jsonify(sel_list)


# Delete media from the libraries
@app.route('/api/media/<int:media_id>', methods=["DELETE"])
def delete_media(media_id):

    media_type = None

    print(all_media)
    print(media_id)

    # Find the media in the all_media list
    media_item = next((x for x in all_media if x['id'] == media_id), None)

    if media_item:
        media_type = media_item['type']
    else:
        return jsonify({"error": "Media not found"}), 404
    
    print("media type:" + media_type)

    print(f"http://{config['server']['ip']}:{config['sonarr']['port']}/api/v3/series/{media_id}?deleteFiles=true&addImportListExclusion=false&apikey={config['sonarr']['api']}")

    if media_type == "show":
        response = requests.delete(f"http://{config['server']['ip']}:{config['sonarr']['port']}/api/v3/series/{media_id}?deleteFiles=true&addImportListExclusion=false&apikey={config['sonarr']['api']}")
    elif media_type == "movie":
        response = requests.delete(f"http://{config['server']['ip']}:{config['radarr']['port']}/api/v3/movie/{media_id}?deleteFiles=true&addImportExclusion=false&apikey={config['radarr']['api']}")

    print(response)

    if response.status_code == 200:
        return jsonify(media_item['title']), 200
    else:
        return jsonify(media_item['title']), 400


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
