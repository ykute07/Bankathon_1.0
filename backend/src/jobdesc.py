from flask import Blueprint, request, jsonify

from src.database.TemplateInfo import JD


jobdesc = Blueprint('jobdesc',__name__,url_prefix="/text")

@jobdesc.post('/')
def upload_file():


    job_description = request.get_json()
    print(JD)

    JD[0]  = job_description.get('title') + '\n' + job_description.get('text')
    

    return jsonify({"POST":"test"})
    
    
    

