import urllib.request
url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzEwZWE4OGI1NDc2YTRkYWY5ZWE3OTU5OWY4ZWE5NjlmEgsSBxDDtKXOyRQYAZIBJAoKcHJvamVjdF9pZBIWQhQxNjgzOTg3NTM3NjM3MTA2NDQ4NQ&filename=&opi=89354086"
try:
    urllib.request.urlretrieve(url, "login.html")
    print("Download complete")
except Exception as e:
    print(e)
