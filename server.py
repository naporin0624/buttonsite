from flask import Flask, jsonify, render_template
from flask_cors import CORS
from flask_restful import Api, Resource, reqparse

from os import listdir
from os.path import join, isfile, isdir, basename

app = Flask(__name__, static_folder="dist/static", template_folder="dist")
CORS(app)
api = Api(app)



class test(Resource):
    def get(self):
        path = "static/voice"
        ret_list = list()
        dirs = [join(path, d) for d in listdir(path) if isdir(join(path,d))]
        ret_list = [{
                "basepath":path.split("/")[-1],
                "title": d.split("/")[-1],
                "button": [f.split("/")[-1] for f in listdir(d) if isfile(join(d, f))]
            } for d in dirs]
        return {"button":ret_list}


api.add_resource(test, "/api/button")


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def get_vue(path):
    return render_template('index.html')

# 一応エラーハンドラ


@app.errorhandler(403)
@app.errorhandler(404)
@app.errorhandler(500)
def error_handler(error):
    msg = 'Error: {code}'.format(code=error.code)
    return jsonify({"result": "Failed",
                    "message": msg,
                    "errorcode": error.code})


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)