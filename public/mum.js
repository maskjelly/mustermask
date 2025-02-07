(function () {
    const script =
      document.currentScript ||
      [].slice.call(document.getElementsByTagName("script")).pop();
  
    // Load required libraries
    const loadDependencies = () => {
      return new Promise((resolve) => {
        if (!window.marked) {
          const markedScript = document.createElement("script");
          markedScript.src = "https://cdn.jsdelivr.net/npm/marked/marked.min.js";
          markedScript.onload = () => {
            const purifyScript = document.createElement("script");
            purifyScript.src =
              "https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.0.5/purify.min.js";
            purifyScript.onload = resolve;
            document.head.appendChild(purifyScript);
          };
          document.head.appendChild(markedScript);
        } else {
          resolve();
        }
      });
    };
  
    // Configuration
    const config = {
      position: script.getAttribute("data-position") || "bottom-right",
      title: script.getAttribute("data-title") || "Customer Support",
      fontFamily: script.getAttribute("data-font-family") || "GeistSans", // Use
      // GeistSans
      suggestedMessages: [
        "Who am i , what can i do? 🚀",
        "What can i do? 💰",
        "Whats the use of me 🔧",
        "Our team 📅",
      ],
      accentColor: script.getAttribute("data-accent-color") || "#fff", // Set to
      // white for header text
    };
  
    // Create widget container with Shadow DOM
    const widget = document.createElement("div");
    widget.id = "customer-support-widget";
    const shadow = widget.attachShadow({
      mode: "open",
    });
  
    // Markdown-specific styles
    const markdownStyles = `
      .bot-message h1, .bot-message h2, .bot-message h3 {
        font-size: 1.1em;
        margin: 0.8em 0 0.4em;
        font-weight: 600;
      }
  
      .bot-message p {
        margin: 0.6em 0;
        line-height: 1.5;
      }
  
      .bot-message code {
        background: #eee;
        padding: 2px 6px;
        border-radius: 4px;
        font-family: GeistMono, monospace; /* Use GeistMono */
        font-size: 0.9em;
      }
  
      .bot-message pre {
        background: #eee;
        padding: 12px;
        border-radius: 8px;
        overflow-x: auto;
        margin: 1em 0;
      }
  
      .bot-message pre code {
        background: none;
        padding: 0;
        font-size: 0.9em;
      }
  
      .bot-message ul, .bot-message ol {
        padding-left: 24px;
        margin: 0.8em 0;
      }
  
      .bot-message li {
        margin: 0.4em 0;
      }
  
      .bot-message blockquote {
        border-left: 3px solid #ccc;
        margin: 1em 0;
        padding-left: 1em;
        color: #666;
      }
  
      .bot-message a {
        color: ${config.accentColor};
        text-decoration: none;
        font-weight: 500;
      }
  
      .bot-message a:hover {
        text-decoration: underline;
      }
    `;
  
    // Main styles
    const style = document.createElement("style");
    style.textContent = `
      ${markdownStyles}
  
      @keyframes textStream {
        0% {
          opacity: 0;
          transform: translateY(-5px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
  
      .chat-container {
        position: fixed;
        ${config.position.includes("bottom") ? "bottom: 30px" : "top: 30px"};
        ${config.position.includes("right") ? "right: 30px" : "left: 30px"};
        width: 500px; /* Wider */
        height: 700px; /* Taller */
        background-color: #fff;
        border-radius: 12px;
        font-family: ${config.fontFamily}, sans-serif;
        z-index: 9999;
        overflow: hidden;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
        border: 1px solid #222; /* Dark border */
        display: none;
        flex-direction: column;
      }
  
      .chat-bubble {
        position: fixed;
        ${config.position.includes("bottom") ? "bottom: 30px" : "top: 30px"};
        ${config.position.includes("right") ? "right: 30px" : "left: 30px"};
        background-color: #000; /* Black */
        color: #fff;
        padding: 14px 24px; /* Slightly larger */
        border-radius: 28px; /* More rounded */
        cursor: pointer;
        font-size: 16px; /* Slightly larger */
        box-shadow: 0 3px 12px rgba(0, 0, 0, 0.2); /* More pronounced shadow */
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 10px;
        border: 1px solid #222; /* Dark border */
      }
  
      .chat-bubble:hover {
        transform: translateY(-3px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.25);
      }
  
      .chat-header {
        background-color: #000; /* Black Header */
        padding: 16px; /* More padding */
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #222; /* Dark border */
      }
  
      .chat-header h3 {
        margin: 0;
        font-size: 18px; /* Larger title */
        font-weight: 700; /* Bolder */
        color: ${config.accentColor}; /* White Header Text */
      }
  
      .chat-body {
        flex: 1;
        overflow-y: auto;
        padding: 16px; /* More padding */
        background-color: #fff; /* White */
        display: flex;
        flex-direction: column;
        gap: 12px; /* More spacing */
      }
  
      .message {
        padding: 12px 16px;
        border-radius: 24px; /* More rounded */
        font-size: 15px;
        line-height: 1.5;
        max-width: 85%; /* Slightly wider messages */
        animation: slideIn 0.2s ease-out forwards, textStream 0.3s ease-out;
        /* Added textStream animation */
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow */
      }
  
      .user-message {
        background-color: #222; /* Darker for user */
        color: #fff;
        align-self: flex-end;
      }
  
      .bot-message {
        background-color: #f2f2f2; /* Light greyish for bot */
        color: #333;
        align-self: flex-start;
      }
  
      .suggested-messages-container {
        padding: 12px 16px;
        background-color: #fff; /* White */
        border-top: 1px solid #222; /* Dark border */
        display: flex;
        flex-wrap: wrap;
        gap: 8px; /* More spacing */
      }
  
      .suggested-message {
        background-color: #fff;
        border: 1px solid #222; /* Dark border */
        color: #444; /* Darker text */
        padding: 8px 16px;
        border-radius: 24px; /* More rounded */
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s ease;
        white-space: nowrap;
      }
  
      .suggested-message:hover {
        background-color: #000; /* Black on hover */
        color: #fff;
        border-color: #000;
      }
  
      .input-container {
        padding: 16px; /* More padding */
        background-color: #fff; /* White */
        border-top: 1px solid #222; /* Dark border */
      }
  
      .input-wrapper {
        display: flex;
        align-items: center;
        gap: 10px; /* More spacing */
        background-color: #f9f9f9; /* Lighter input background */
        padding: 8px 16px;
        border-radius: 28px; /* More rounded */
        border: 1px solid #222; /* Dark border */
      }
  
      .input-container input {
        flex: 1;
        border: none;
        background: transparent;
        padding: 10px 0;
        font-size: 15px;
        color: #333;
      }
  
      .input-container input:focus {
        outline: none;
      }
  
      .send-button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 6px;
        color: #000; /* Black */
        transition: all 0.2s ease;
      }
  
      .clear-chat-button, .chat-toggle {
        background: none;
        border: none;
        cursor: pointer;
        padding: 6px;
        color: #666; /* Darker gray */
        transition: all 0.2s ease;
        font-size: 15px;
      }
  
      .typing-indicator {
        display: flex;
        gap: 5px;
        padding: 12px 16px;
        background-color: #f0f0f0;
        border-radius: 20px;
        width: fit-content;
        align-self: flex-start;
      }
  
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
  
    // Chat HTML structure
    const chatHTML = `
    <div class="chat-bubble">
      <span class="bubble-message">👋 Need help?</span>
    </div>
    <div class="chat-container">
      <div class="chat-header">
        <h3>${config.title}</h3>
        <div>
          <button class="clear-chat-button">Clear Chat</button>
          <button class="chat-toggle">✕</button>
        </div>
      </div>
      <div class="chat-body">
        <div class="bot-message">
          Hi! How can I help you today?
        </div>
      </div>
      <div
        class="suggested-messages-container"
        style="
          display: flex;
          padding: 20px;
          font-family: 'Playfair Display', serif;
        "
      >
        ${config.suggestedMessages
          .map(
            (msg) =>
              `<button class="suggested-message" style="border-radius: 30px;">${msg}</button>`
          )
          .join("")}
      </div>
      <div class="input-container">
        <div class="input-wrapper">
          <input type="text" placeholder="Type your message..." />
          <button class="send-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 22 2 11 13 11 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;
  
  
    async function initializeWidget() {
      await loadDependencies();
  
      // Attach styles and HTML
      shadow.appendChild(style);
      shadow.innerHTML += chatHTML;
      document.body.appendChild(widget);
  
      // Get DOM elements
      const chatBody = shadow.querySelector(".chat-body");
      const chatInput = shadow.querySelector("input");
      const sendButton = shadow.querySelector(".send-button");
      const chatToggle = shadow.querySelector(".chat-toggle");
      const chatContainer = shadow.querySelector(".chat-container");
      const chatBubble = shadow.querySelector(".chat-bubble");
      const suggestedMessages = shadow.querySelectorAll(".suggested-message");
      const clearChatButton = shadow.querySelector(".clear-chat-button");
      const suggestedMessagesContainer = shadow.querySelector(
        ".suggested-messages-container"
      );
  
      // Storage handling
      const storageKey = "customerSupportHistory";
      let conversationHistory =
        JSON.parse(localStorage.getItem(storageKey)) || [];
      const userIdKey = "customerSupportUserId";
      let userId =
        localStorage.getItem(userIdKey) ||
        `user_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
      localStorage.setItem(userIdKey, userId);
  
      let suggestionsUsed = false;
  
      // Handle suggested message clicks
      suggestedMessages.forEach((button) => {
        button.addEventListener("click", () => {
          const message = button.textContent;
          handleUserMessage(message);
          hideSuggestedMessages();
          suggestionsUsed = true;
        });
      });
  
      function addMessageWithMarkdown(content, isUser) {
        const div = document.createElement("div");
        div.className = `message ${isUser ? "user-message" : "bot-message"}`;
  
        if (!isUser) {
          const parsed = marked.parse(content);
          div.innerHTML = DOMPurify.sanitize(parsed);
        } else {
          div.textContent = content;
        }
  
        chatBody.appendChild(div);
        div.scrollIntoView({
          behavior: "smooth",
        });
      }
  
      function showTypingIndicator() {
        const indicator = document.createElement("div");
        indicator.className = "typing-indicator";
        indicator.innerHTML = `
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        `;
        chatBody.appendChild(indicator);
        indicator.scrollIntoView({
          behavior: "smooth",
        });
        return indicator;
      }
  
      async function handleUserMessage(message) {
        addMessageWithMarkdown(message, true);
        chatInput.value = "";
  
        if (!suggestionsUsed) {
          hideSuggestedMessages();
          suggestionsUsed = true;
        }
  
        const typingIndicator = showTypingIndicator();
        conversationHistory.push({
          role: "user",
          content: message,
        });
  
        try {
          const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId,
              history: conversationHistory,
            }),
          });
  
          const data = await response.json();
          typingIndicator.remove();
  
          if (data.response) {
            addMessageWithMarkdown(data.response, false);
            conversationHistory.push({
              role: "assistant",
              content: data.response,
            });
            localStorage.setItem(
              storageKey,
              JSON.stringify(conversationHistory)
            );
          }
        } catch (error) {
          typingIndicator.remove();
          addMessageWithMarkdown(
            "Sorry, I couldn't process your request.",
            false
          );
        }
      }
  
      function clearChat() {
        conversationHistory = [];
        localStorage.removeItem(storageKey);
        chatBody.innerHTML = ""; // Clear all messages
        showSuggestedMessages();
        suggestionsUsed = false;
      }
  
      function hideSuggestedMessages() {
        suggestedMessagesContainer.style.display = "none";
      }
  
      function showSuggestedMessages() {
        suggestedMessagesContainer.style.display = "flex";
      }
  
      // Event listeners
      chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter" && chatInput.value.trim()) {
          handleUserMessage(chatInput.value.trim());
          hideSuggestedMessages();
          suggestionsUsed = true;
        }
      });
  
      sendButton.addEventListener("click", () => {
        if (chatInput.value.trim()) {
          handleUserMessage(chatInput.value.trim());
          hideSuggestedMessages();
          suggestionsUsed = true;
        }
      });
  
      chatBubble.addEventListener("click", () => {
        chatContainer.style.display = "flex";
        chatBubble.style.display = "none";
      });
  
      chatToggle.addEventListener("click", () => {
        chatContainer.style.display = "none";
        chatBubble.style.display = "flex";
      });
  
      clearChatButton.addEventListener("click", () => {
        clearChat();
      });
  
      // Initialize chat
      if (conversationHistory.length > 0) {
        conversationHistory.forEach((msg) => {
          addMessageWithMarkdown(msg.content, msg.role === "user");
        });
        hideSuggestedMessages();
        suggestionsUsed = true;
      }
    }
  
    initializeWidget().catch(console.error);
  })();