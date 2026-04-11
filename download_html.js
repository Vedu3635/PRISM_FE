const https = require('https');
const fs = require('fs');

const url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzEwZWE4OGI1NDc2YTRkYWY5ZWE3OTU5OWY4ZWE5NjlmEgsSBxDDtKXOyRQYAZIBJAoKcHJvamVjdF9pZBIWQhQxNjgzOTg3NTM3NjM3MTA2NDQ4NQ&filename=&opi=89354086";

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    fs.writeFileSync('login_screen.html', data);
    console.log("Downloaded login_screen.html");
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
