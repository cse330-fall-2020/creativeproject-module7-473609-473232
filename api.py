import time
from flask import Flask

app = Flask(__name__)

# config = {
#   "apiKey": os.environ['FIREBASE_API_KEY'],
#   "authDomain": "community-event-manager.firebaseapp.com",
#   "databaseURL": "https://community-event-manager.firebaseio.com",
#   "projectId": "community-event-manager",
#   "storageBucket": "community-event-manager.appspot.com",
#   "serviceAccount": "app/firebase-private-key.json",
#   "messagingSenderId": "1052538486567"
# }

@app.route('/time')
def get_current_time():
    return {'time': time.time()}
