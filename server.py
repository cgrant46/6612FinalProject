import pickle
import pandas as pd
from flask import Flask, request
from phishing_detection_url.URLFeatureExtraction import featureExtraction

clf = pickle.load(open("phishing_detection_url/XGBoostClassifier.pickle.dat", "rb"))
app = Flask(__name__)

@app.route("/")
def get_phishing_score():
    features = []
    for _, url in request.args.items():
        features.append( featureExtraction(url) )
    feature_names = ['Domain', 'Have_IP', 'Have_At', 'URL_Length', 'URL_Depth','Redirection', 
                        'https_Domain', 'TinyURL', 'Prefix/Suffix', 'DNS_Record', 'Web_Traffic', 
                        'Domain_Age', 'Domain_End', 'iFrame', 'Mouse_Over','Right_Click', 'Web_Forwards', 'Label']
    features = pd.DataFrame(features, columns=feature_names)
    features = features.drop( ['Domain'], axis=1 )
    return features

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
