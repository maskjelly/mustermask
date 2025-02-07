(function () {
    const script = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();

    // Load required libraries
    const loadDependencies = () => {
        return new Promise((resolve) => {
            if (!window.marked) {
                const markedScript = document.createElement('script');
                markedScript.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
                markedScript.onload = () => {
                    const purifyScript = document.createElement('script');
                    purifyScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.0.5/purify.min.js';
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
        fontFamily: script.getAttribute("data-font-family") || "Inter, sans-serif",
        suggestedMessages: [
            "How can I get started? 🚀",
            "What are the pricing plans? 💰",
            "I need technical support 🔧",
            "Book a demo call 📅"
        ]
    };

    // Create widget container with Shadow DOM
    const widget = document.createElement("div");
    widget.id = "customer-support-widget";
    const shadow = widget.attachShadow({ mode: "open" });

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
            background: rgba(0,0,0,0.05);
            padding: 2px 6px;
            border-radius: 4px;
            font-family: Monaco, Consolas, 'Courier New', monospace;
            font-size: 0.9em;
        }

        .bot-message pre {
            background: rgba(0,0,0,0.05);
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
            border-left: 3px solid rgba(0,0,0,0.1);
            margin: 1em 0;
            padding-left: 1em;
            color: rgba(0,0,0,0.7);
        }

        .bot-message a {
            color: #0066cc;
            text-decoration: none;
            font-weight: 500;
        }

        .bot-message a:hover {
            text-decoration: underline;
        }
    `;

    // Main styles
    const style = document.createElement('style');
    style.textContent = `
        ${markdownStyles}

        .chat-container {
            position: fixed;
            ${config.position.includes("bottom") ? "bottom: 20px" : "top: 20px"};
            ${config.position.includes("right") ? "right: 20px" : "left: 20px"};
            width: 380px;
            height: 600px;
            background: linear-gradient(145deg, #ffffff, #f8f9ff);
            border-radius: 16px;
            font-family: ${config.fontFamily};
            z-index: 9999;
            overflow: hidden;
            box-shadow: 
                0 4px 24px rgba(0,0,0,0.08),
                0 1px 2px rgba(0,0,0,0.04);
            border: 1px solid rgba(255,255,255,0.7);
            display: none;
            flex-direction: column;
            backdrop-filter: blur(10px);
        }

        .chat-bubble {
            position: fixed;
            ${config.position.includes("bottom") ? "bottom: 20px" : "top: 20px"};
            ${config.position.includes("right") ? "right: 20px" : "left: 20px"};
            background: linear-gradient(135deg, #000000, #1a1a1a);
            color: #fff;
            padding: 16px 24px;
            border-radius: 100px;
            cursor: pointer;
            font-size: 14px;
            box-shadow: 
                0 4px 12px rgba(0,0,0,0.15),
                0 0 0 1px rgba(255,255,255,0.1);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .chat-bubble:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(0,0,0,0.15);
        }

        .chat-header {
            background: linear-gradient(to right, #fafafa, #f8f9ff);
            padding: 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid rgba(0,0,0,0.06);
        }

        .chat-header h3 {
            margin: 0;
            font-size: 16px;
            font-weight: 500;
        }

        .chat-body {
            flex: 1;
            overflow-y: auto;
            padding: 16px;
            background: linear-gradient(145deg, #ffffff, #fafafa);
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .message {
            padding: 12px 16px;
            border-radius: 14px;
            font-size: 14px;
            line-height: 1.5;
            max-width: 85%;
            animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            border: 1px solid rgba(0,0,0,0.04);
        }

        .user-message {
            background: linear-gradient(135deg, #000000, #1a1a1a);
            color: #ffffff;
            align-self: flex-end;
        }

        .bot-message {
            background: linear-gradient(135deg, #ffffff, #f8f9ff);
            color: #000000;
            align-self: flex-start;
        }

        .suggested-messages {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 12px;
            animation: fadeIn 0.3s ease forwards;
        }

        .suggested-message {
            background: linear-gradient(135deg, #ffffff, #f8f9ff);
            border: 1px solid rgba(0,0,0,0.08);
            color: #000000;
            padding: 8px 16px;
            border-radius: 100px;
            font-size: 13px;
            cursor: pointer;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            white-space: nowrap;
        }

        .input-container {
            padding: 16px;
            background: linear-gradient(to right, #fafafa, #f8f9ff);
            border-top: 1px solid rgba(0,0,0,0.06);
        }

        .input-wrapper {
            display: flex;
            align-items: center;
            gap: 8px;
            background: #ffffff;
            padding: 8px 16px;
            border-radius: 100px;
            border: 1px solid rgba(0,0,0,0.08);
        }

        .input-container input {
            flex: 1;
            border: none;
            background: transparent;
            padding: 8px 0;
            font-size: 14px;
            color: #000000;
        }

        .input-container input:focus {
            outline: none;
        }

        .send-button {
            background: none;
            border: none;
            cursor: pointer;
            padding: 4px;
            color: #666;
            transition: all 0.2s ease;
        }

        .typing-indicator {
            display: flex;
            gap: 4px;
            padding: 12px 16px;
            background: linear-gradient(135deg, #ffffff, #f8f9ff);
            border-radius: 14px;
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

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
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
                <button class="chat-toggle">✕</button>
            </div>
            <div class="chat-body">
                <div class="bot-message">
                    Hi! How can I help you today? 
                    <div class="suggested-messages">
                        ${config.suggestedMessages.map(msg => 
                            `<button class="suggested-message">${msg}</button>`
                        ).join('')}
                    </div>
                </div>
            </div>
            <div class="input-container">
                <div class="input-wrapper">
                    <input type="text" placeholder="Type your message..." />
                    <button class="send-button">📤</button>
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

        // Storage handling
        const storageKey = "customerSupportHistory";
        let conversationHistory = JSON.parse(localStorage.getItem(storageKey)) || [];
        const userIdKey = "customerSupportUserId";
        let userId = localStorage.getItem(userIdKey) || `user_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
        localStorage.setItem(userIdKey, userId);

        // Handle suggested message clicks
        suggestedMessages.forEach(button => {
            button.addEventListener("click", () => {
                const message = button.textContent;
                const suggestedContainer = shadow.querySelector(".suggested-messages");
                if (suggestedContainer) {
                    suggestedContainer.remove();
                }
                handleUserMessage(message);
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
            div.scrollIntoView({ behavior: "smooth" });
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
            indicator.scrollIntoView({ behavior: "smooth" });
            return indicator;
        }

        async function handleUserMessage(message) {
            addMessageWithMarkdown(message, true);
            chatInput.value = "";
            
            const typingIndicator = showTypingIndicator();
            conversationHistory.push({ role: "user", content: message });

            try {
                const response = await fetch("/api/chat", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId, history: conversationHistory }),
                });
                
                const data = await response.json();
                typingIndicator.remove();
                
                if (data.response) {
                    addMessageWithMarkdown(data.response, false);
                    conversationHistory.push({ role: "assistant", content: data.response });
                    localStorage.setItem(storageKey, JSON.stringify(conversationHistory));
                }
            } catch (error) {
                typingIndicator.remove();
                addMessageWithMarkdown("Sorry, I couldn't process your request.", false);
            }
        }

        // Event listeners
        chatInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter" && chatInput.value.trim()) {
                handleUserMessage(chatInput.value.trim());
            }
        });

        sendButton.addEventListener("click", () => {
            if (chatInput.value.trim()) {
                handleUserMessage(chatInput.value.trim());
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

        // Initialize chat
        if (conversationHistory.length > 0) {
            conversationHistory.forEach(msg => {
                addMessageWithMarkdown(msg.content, msg.role === "user");
            });
        }
    }

    initializeWidget().catch(console.error);
})();