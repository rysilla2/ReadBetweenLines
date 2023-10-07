var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer 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");
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "messages": [
    {
      "role": "system",
      "content": "test"
    },
    {
      "role": "user",
      "content": "user test"
    }
  ],
  "model": "gpt-3.5-turbo"
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://api.openai.com/v1/chat/completions", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));