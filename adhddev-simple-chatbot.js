document.addEventListener("DOMContentLoaded", function() {
    const chatBody = document.getElementById("chat-body");
    const chatInput = document.getElementById("chat-input");
    const chatSend = document.getElementById("chat-send");

    const botResponses = {
        greetings: ["Hello!", "Hi there!", "Howdy!"],
        howAreYou: ["I'm a bot, so I'm always good.", "Doing well, thanks for asking!", "I'm just a bunch of code, but thanks for asking!"],
        name: ["I'm a adhd dev's simple chatbot.", "You can call me ADHD Dev.", "Just a friendly chatbot here!"],
        bye: ["Goodbye!", "See you later!", "Take care!"],
        default: ["I'm not sure how to respond to that.", "Could you please rephrase?", "I didn't quite get that."]
    };

    const responseMap = [
        { triggers: ["hello", "hi", "howdy", "hey"], responses: botResponses.greetings },
        { triggers: ["how are you?", "how are you"], responses: botResponses.howAreYou },
        { triggers: ["what is your name?", "what's your name?", "who are you?"], responses: botResponses.name },
        { triggers: ["bye", "goodbye", "see you"], responses: botResponses.bye }
    ];

    chatSend.addEventListener("click", function() {
        const userInput = chatInput.value.toLowerCase().trim();
        if (userInput) {
            addMessage(userInput, "user");
            const botResponse = getBotResponse(userInput);
            setTimeout(() => addMessage(botResponse, "bot"), 500);
            chatInput.value = "";
        }
    });

    chatInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            chatSend.click();
        }
    });

    function addMessage(message, sender) {
        const messageContainer = document.createElement("div");
        messageContainer.classList.add("message-container");
        if (sender === "bot") {
            messageContainer.classList.add("bot");
        }

        const messageDiv = document.createElement("div");
        messageDiv.classList.add(sender === "user" ? "user-message" : "bot-message");
        messageDiv.textContent = message;

        messageContainer.appendChild(messageDiv);
        chatBody.appendChild(messageContainer);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function getBotResponse(userInput) {
        for (let mapping of responseMap) {
            if (mapping.triggers.some(trigger => userInput.includes(trigger))) {
                const responses = mapping.responses;
                return responses[Math.floor(Math.random() * responses.length)];
            }
        }
        const defaultResponses = botResponses.default;
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
});
