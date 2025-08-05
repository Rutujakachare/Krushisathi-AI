const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");

function startListening() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-IN";
  recognition.start();

  recognition.onresult = function(event) {
    const spokenText = event.results[0][0].transcript;
    questionEl.textContent = spokenText;

    let response = generateDummyResponse(spokenText);
    answerEl.textContent = response;

    const speech = new SpeechSynthesisUtterance(response);
    window.speechSynthesis.speak(speech);
  };

  recognition.onerror = function(event) {
    answerEl.textContent = "Sorry, I couldn't hear you clearly.";
  };
}

function generateDummyResponse(text) {
  text = text.toLowerCase();

  if (text.includes("weather")) {
    return "The weather today is sunny with a chance of rain in the evening.";
  } else if (text.includes("fertilizer")) {
    return "You can use Urea or NPK 20-20-20 depending on your crop.";
  } else if (text.includes("market")) {
    return "Today's market rate for tomatoes is ₹25 per kg.";
  } else {
    return "Sorry, I don’t have information on that. I’m still learning!";
  }
}
