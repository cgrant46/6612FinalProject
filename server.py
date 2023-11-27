import pickle
from flask import Flask, request

clf = pickle.load(open("phishing_detection_url/XGBoostClassifier.pickle.dat", "rb"))
app = Flask(__name__)

@app.route("/")
def get_phishing_score():
    return request.args

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
