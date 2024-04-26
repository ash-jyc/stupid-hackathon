from flask import Flask, request, jsonify, render_template
import json
from music import choose_song
import numpy as np

# create basic flask application
app = Flask(__name__)

@app.route('/api', methods=['POST'])
# get points from the request
def api():
    # get the data from the request
    data = request.get_json()
    print(data)
    song_data = choose_song()
    print(song_data)
    # return the data as a response
    return jsonify(data)

@app.route('/')
def index():
    return render_template('index.html')

# run the application
if __name__ == '__main__':
    app.run(port=5050)