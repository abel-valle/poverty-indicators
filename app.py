from flask import Flask
from flask import render_template

data_path = './input/'
app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(host='localhost', port=5000, debug=True)
