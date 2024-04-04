import requests
from datetime import datetime, timedelta
from random import randrange
import json

url = "http://localhost:3000/api/gpt"
headers = {"Content-Type": "application/json"}
users = ["josh_py"]

for user in users:
    #due_date = (datetime.now() + timedelta(days=randrange(1, 15))).strftime('%Y-%m-%d')
    #due_date = str(datetime.now() + timedelta( days=(randrange(14) + 1) )).split()[0]
    #print(due_date)
    #todays_date = datetime.now()
    #print(todays_date)

    # Define the JSON data
    data = {
        'prompt':
            '\
            Generate JSON data for a student taking 4 university courses, each with their own assignments.\
            Each course will have from 1 to 3 assignments due.\
            The assignments will be in the format\
            {"course_id": "<COURSE_ID_HERE>", "course_title": "<COURSE_TITLE_HERE>", "due_date": "", "description": "<COURSE_DESCRIPTION_HERE>", "user": "' + str(user) + '"}.\
            Do not change the "" of "due_date".\
            Additionally, the user variable is predefined. Each JSON output will be on a separate line. Do not include newlines (the "slash n") in between assignment JSONs.\
            Make specific assignment descriptions, at least 2 sentences each.\
            '
    }
    """
    'prompt': 'Generate JSON data for a single university course assignment. \
        It will have the format {"course_id": "<COURSE_ID_HERE>", "course_title": "<COURSE_TITLE_HERE>", \
        "due_date": "' + due_date + '", "description": "<COURSE_DESCRIPTION_HERE>", "user": "' + user + '"}. \
        Replace <COURSE_ID_HERE>, <COURSE_TITLE_HERE>, and <COURSE_DESCRIPTION_HERE> with randomly generated content. \
        Do not mess with the due_date or user portion.'
    """

    response = requests.post(url, headers=headers, data=json.dumps(data))
    if response.status_code == 200:
        # Print the response content
        jsonresponse_raw = response.json()['response']

        jsonresponse_split_raw = jsonresponse_raw.split("{")
        json_response_split = []
        json_assignments = []
        for i in jsonresponse_split_raw:
            if i != "":
                json_response_split.append("{" + i)

        for i in range(len(json_response_split)):
            due_date = (datetime.now() + timedelta(days=randrange(7, 22))).strftime('%Y-%m-%d')
            e = json.loads(json_response_split[i])
            e["due_date"] = due_date
            json_assignments.append(e)

        for i in json_assignments:
            print(i)


    else:
        print("Error:", response.status_code)
