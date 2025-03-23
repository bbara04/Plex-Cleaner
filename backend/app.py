from flask import Flask, jsonify, send_from_directory, request
from flask_socketio import SocketIO
from flask_cors import CORS
import json, requests
from reader import plex_reader, radarr_reader, sonarr_reader, tautilli_reader

app = Flask(__name__, static_folder='./frontend/dist')
socketio = SocketIO(app)
CORS(app)

@app.after_request
def set_csp(response):
    csp = "default-src 'self' http: https: 'unsafe-inline' 'unsafe-eval'"
    response.headers['Content-Security-Policy'] = csp
    return response

# Konfiguráció betöltése
with open("config.json", "r") as f:
    config = json.load(f)

def fileNameCrop(path):
    return path.split('/')[-1]

# =========================
# SERVICE réteg: üzleti logika
# =========================

def get_config_service():
    return config

def update_config_service(new_config):
    global config
    config = new_config
    with open("config.json", "w") as f:
        json.dump(config, f, indent=4)
    return config

def get_expired_media_service():
    """
    Lekéri azokat a médiákat, amelyeknél a nem nézett idő nagyobb,
    mint a konfigurációban megadott delete_after_days érték, és figyelmen kívül hagyja az 
    excluded_lines-ban szereplő elemeket.
    """
    excluded_str = config['excluded_lines']
    tautulli_stats = tautilli_reader.readTautulli(config['server']['ip'],
                                                  config['tautulli']['port'],
                                                  config['tautulli']['api'])
    plex_stats = plex_reader.readPlex(config['server']['ip'],
                                        config['plex']['port'],
                                        config['plex']['api'])
    sonarr_stats = sonarr_reader.readSonarr(config['server']['ip'],
                                              config['sonarr']['port'],
                                              config['sonarr']['api'])
    radarr_stats = radarr_reader.readRadarr(config['server']['ip'],
                                              config['radarr']['port'],
                                              config['radarr']['api'])
    sel_list = []
    for tautulli in tautulli_stats:
        for plex in plex_stats:
            if tautulli[0] == plex[0]:
                tiltott = False
                for exc_str in excluded_str:
                    if exc_str.lower() in plex[2].lower():
                        tiltott = True
                        break
                if not tiltott:
                    if plex[3] == "show":
                        for sonarr in sonarr_stats:
                            if fileNameCrop(sonarr[2]) == fileNameCrop(plex[2]) and \
                               tautulli[2] > config['sonarr']["delete_after_days"]:
                                sel_list.append({
                                    "title": sonarr[1],
                                    "last_watched": tautulli[2],
                                    "id": sonarr[0],
                                    "type": "show"
                                })
                    elif plex[3] == "movie":
                        for radarr in radarr_stats:
                            if fileNameCrop(radarr[2]) == fileNameCrop(plex[2]) and \
                               tautulli[2] > config['radarr']["delete_after_days"]:
                                sel_list.append({
                                    "title": radarr[1],
                                    "last_watched": tautulli[2],
                                    "id": radarr[0],
                                    "type": "movie"
                                })
    return sel_list

def get_all_media_service():
    """
    Lekéri az összes médiát a különböző könyvtárakból (Plex, Sonarr, Radarr, Tautulli)
    és egyesíti az eredményeket.
    """
    tautulli_stats = tautilli_reader.readTautulli(config['server']['ip'],
                                                  config['tautulli']['port'],
                                                  config['tautulli']['api'])
    plex_stats = plex_reader.readPlex(config['server']['ip'],
                                        config['plex']['port'],
                                        config['plex']['api'])
    sonarr_stats = sonarr_reader.readSonarr(config['server']['ip'],
                                              config['sonarr']['port'],
                                              config['sonarr']['api'])
    radarr_stats = radarr_reader.readRadarr(config['server']['ip'],
                                              config['radarr']['port'],
                                              config['radarr']['api'])
    sel_list = []
    for tautulli in tautulli_stats:
        for plex in plex_stats:
            if tautulli[0] == plex[0]:
                if plex[3] == "show":
                    for sonarr in sonarr_stats:
                        if fileNameCrop(sonarr[2]) == fileNameCrop(plex[2]):
                            sel_list.append({
                                "title": sonarr[1],
                                "last_watched": tautulli[2],
                                "id": sonarr[0],
                                "type": "show"
                            })
                elif plex[3] == "movie":
                    for radarr in radarr_stats:
                        if fileNameCrop(radarr[2]) == fileNameCrop(plex[2]):
                            sel_list.append({
                                "title": radarr[1],
                                "last_watched": tautulli[2],
                                "id": radarr[0],
                                "type": "movie"
                            })
    return sel_list

def delete_media_service(medias, media_list):
    """
    Törli a megadott media_id-jű médiákat a megfelelő szolgáltatásból.
    Visszaadja a törölt elemeket címét, vagy hibaüzenetet.
    """
    deleted_medias = []
    errormsg = ""

    for media in medias:
        if media['type'] == "show":
            url = f"http://{config['server']['ip']}:{config['sonarr']['port']}" \
                f"/api/v3/series/{media['id']}?deleteFiles=true&addImportListExclusion=false" \
                f"&apikey={config['sonarr']['api']}"
        elif media['type'] == "movie":
            url = f"http://{config['server']['ip']}:{config['radarr']['port']}" \
                f"/api/v3/movie/{media['id']}?deleteFiles=true&addImportExclusion=false" \
                f"&apikey={config['radarr']['api']}"
        response = requests.delete(url)
        if response.status_code == 200:
            deleted_medias.append(media['id'])
        else:
            errormsg += f"Hiba történt a(z) {media['title']} törlése közben: {response.text}\n"

    return deleted_medias, errormsg

# =========================
# CONTROLLER réteg: Route-ok, melyek meghívják a service függvényeket
# =========================

# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and path.endswith(('js', 'css', 'html', 'png', 'jpg', 'jpeg', 'svg', 'ico', 'json')):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route('/api/config', methods=["GET"])
def get_config():
    return jsonify(get_config_service()), 200

@app.route('/api/config', methods=["PUT"])
def update_config():
    new_config = request.get_json()
    updated_config = update_config_service(new_config)
    return jsonify(updated_config), 200

@app.route('/api/media/expired', methods=['GET'])
def get_expired_media():
    expired_media = get_expired_media_service()
    return jsonify(expired_media)

all_media = []  # Globális lista a "get all" eredmények tárolásához

@app.route('/api/media/all', methods=['GET'])
def get_all_media():
    global all_media
    all_media = get_all_media_service()
    return jsonify(all_media)

@app.route('/api/media', methods=["DELETE"])
def delete_media():
    global all_media
    medias_to_delete = request.get_json()
    title, error = delete_media_service(medias_to_delete, all_media)
    if error != "":
        return jsonify({
            "title": title,
            "error": error
        }), 400
    return jsonify(title), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
