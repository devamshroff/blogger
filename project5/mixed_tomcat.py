import sys, random
from locust import HttpLocust, TaskSet

def writePost(locust):
    postid = random.randint(1,500)
    url_prefix = '/editor/post?action=save';
    locust.client.post(url_prefix + '&username=cs144&postid={}&title=Loading%20Test&body=***Hello%20World!***'.format(postid), name=url_prefix)

def readPost(locust):
    postid = random.randint(1,500)
    url_prefix = '/editor/post?action=open';
    locust.client.get(url_prefix + '&username=cs144&postid=' + str(postid), name=url_prefix)

class MyTaskSet(TaskSet):
    """ the class MyTaskSet inherits from the class TaskSet, defining the behavior of the user """
    tasks = {writePost: 1, readPost: 10}
    def on_start(locust):
        """ on_start is called when a Locust start before any task is scheduled """
        response = locust.client.post("/login", data={"username":"cs144", "password": "password"})
        if response.status_code != 200:
            print("FAIL to start with posting data to server. Make sure that your server is running.")
            sys.exit();

class MyLocust(HttpLocust):
    """ the class MyLocust inherits from the class HttpLocust, representing an HTTP user """
    task_set = MyTaskSet
    min_wait = 1000
    max_wait = 2000
