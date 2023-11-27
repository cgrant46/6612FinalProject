import pickle
import pandas as pd
import numpy as np
from flask import Flask, request
from phishing_detection_url.URLFeatureExtraction import featureExtraction

clf = pickle.load(open("phishing_detection_url/XGBoostClassifier.pickle.dat", "rb"))
app = Flask(__name__)

@app.route("/")
def get_phishing_score():
    features = []
    for _, url in request.args.items():
        features.append( featureExtraction(url) )
    feature_names = ['Have_IP', 'Have_At', 'URL_Length', 'URL_Depth','Redirection', 
                        'https_Domain', 'TinyURL', 'Prefix/Suffix', 'DNS_Record', 'Web_Traffic', 
                        'Domain_Age', 'Domain_End', 'iFrame', 'Mouse_Over','Right_Click', 'Web_Forwards']
    features = pd.DataFrame(features, columns=feature_names)
    prediction = np.average( clf.predict( features ) )
    return str( prediction )

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
