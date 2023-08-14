from flask import Flask
from flask_cors import CORS
from download import report

app = Flask(__name__)
CORS(app)
app.register_blueprint(report)
