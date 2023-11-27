import pickle
from flask import Flask, request
from phishing_detection_url.URLFeatureExtraction import featureExtraction

clf = pickle.load(open("phishing_detection_url/XGBoostClassifier.pickle.dat", "rb"))
app = Flask(__name__)

@app.route("/")
def get_phishing_score():
    package = ""
    for _, url in request.args.items():
        package += url + '\n'
    return package

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
