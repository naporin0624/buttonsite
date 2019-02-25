import json
from os.path import isdir, isfile, join, splitext
import os

def priority_dir():
    dist_path = "dist/static/voice"
    static_path = "static/voice"
    dist_dir_list = [join(dist_path, d) for d in os.listdir(dist_path) if isdir(join(dist_path, d))]
    static_dir_list = [join(static_path, d) for d in os.listdir(static_path) if isdir(join(static_path, d))]
    return (dist_path, dist_dir_list) if len(dist_dir_list)>=len(static_dir_list) else (static_path, static_dir_list)
    
# def make_json(dir_info_tuple):
#     path, dir_list = dir_info_tuple
#     basename = path.split("/")[-1]
#     ret_list = [{
#         "basepath":basename,
#         "title":d.split("/")[-1],
#         "button":[f.split("/")[-1] for f in os.listdir(d)]
#     } for d in dir_list]
#     return ret_list

def make_json(dir_info_tuple):
    path, dir_list = dir_info_tuple
    basename = path.split("/")[-1]
    ret_list = [{
        "title":d.split("/")[-1],
        "button":[join("static", basename, d, f) for f in os.listdir(d)]
    } for d in dir_list]
    return ret_list

if __name__ == "__main__":
    print("start make json")
    chose_dir_list = priority_dir()
    ret_list = make_json(chose_dir_list)
    json_data = json.dumps(ret_list, ensure_ascii=False, indent=2)
    with open("dist/static/button.json", "w") as f:
        f.write(json_data)
    with open("static/button.json", "w") as f:
        f.write(json_data)