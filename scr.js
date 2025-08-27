

document.querySelector(".start-div > .button").addEventListener("click", ()=>{
  sendMessage( document.querySelector("#question-input").value)
} )

document.querySelector("#question-input").addEventListener("keydown", (e)=>{
  if (e.keyCode === 13) {
    sendMessage( document.querySelector("#question-input").value)
  }
})
let sessionId = "";

function postRequest(url, data, successCallback) {
  axios.post(url, data, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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'
    }
  })
  .then(successCallback)
  .catch(function(error) {
    console.error(error);
  });
}

//отправляет запрос
function sendMessage(message) {
  document.querySelector(".center").style.display = "flex";
  const apiUrl = 'https://api.openai.com/v1/chat/completions';
  const data = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'system', content: 'You are a customer' }, { role: 'user', content: message }],
    // 'max_tokens': 1000,
    'n': 1
    // ,
    // 'stop': '\n'
  };

  postRequest(apiUrl, data, handleResponse);
}

function handleResponse(response) {
  console.log(response);
  const modelReply = response.data.choices[0].message.content;
  displayMessage(modelReply);
}

//выполняется, когда пришел ответ
function displayMessage(message) {
  document.querySelector(".center").style.display = "none";
  console.log(message);
  var outputDiv = document.getElementById("output");
  outputDiv.innerText = message;
}