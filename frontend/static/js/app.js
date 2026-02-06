let currentChatId = null;
const API_BASE = '/api';

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadChats();
    setupTextareaAutoResize();
});

// Auto-resize textarea
function setupTextareaAutoResize() {
    const textarea = document.getElementById('topicInput');
    textarea.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });

    // Allow Enter to send (Shift+Enter for new line)
    textarea.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            generateBlog();
        }
    });
}

// Toggle sidebar on mobile
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

// Load all chats
async function loadChats() {
    try {
        const response = await fetch(`${API_BASE}/chats`);
        const chats = await response.json();

        const chatList = document.getElementById('chatList');
        chatList.innerHTML = '';

        if (chats.length === 0) {
            chatList.innerHTML = '<p style="padding: 20px; text-align: center; color: #8e8ea0;">No chats yet</p>';
            return;
        }

        chats.forEach(chat => {
            const chatItem = document.createElement('div');
            chatItem.className = 'chat-item';
            if (chat.id === currentChatId) {
                chatItem.classList.add('active');
            }

            chatItem.innerHTML = `
                <div class="chat-item-title" onclick="loadChat(${chat.id})">${chat.title}</div>
                <button class="delete-btn" onclick="deleteChat(${chat.id}, event)">🗑️</button>
            `;

            chatList.appendChild(chatItem);
        });
    } catch (error) {
        console.error('Error loading chats:', error);
    }
}

// Load specific chat
async function loadChat(chatId) {
    try {
        currentChatId = chatId;
        const response = await fetch(`${API_BASE}/chats/${chatId}/messages`);
        const messages = await response.json();

        const chatMessages = document.getElementById('chatMessages');
        chatMessages.innerHTML = '';

        messages.forEach(message => {
            addMessageToUI(message.role, message.content);
        });

        loadChats(); // Refresh to update active state
        scrollToBottom();
    } catch (error) {
        console.error('Error loading chat:', error);
    }
}

// Delete chat
async function deleteChat(chatId, event) {
    event.stopPropagation();

    if (!confirm('Are you sure you want to delete this chat?')) {
        return;
    }

    try {
        await fetch(`${API_BASE}/chats/${chatId}`, {
            method: 'DELETE'
        });

        if (currentChatId === chatId) {
            currentChatId = null;
            clearChat();
        }

        loadChats();
    } catch (error) {
        console.error('Error deleting chat:', error);
        alert('Failed to delete chat');
    }
}

// Create new chat
function createNewChat() {
    currentChatId = null;
    clearChat();
    document.getElementById('topicInput').focus();
}

// Clear chat display
function clearChat() {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML = `
        <div class="welcome-message">
            <h2>Welcome to AI Blog Generator! 🎯</h2>
            <p>Enter any topic below and I'll:</p>
            <ul>
                <li>🔍 Search the web for latest information</li>
                <li>📊 Analyze and summarize key insights</li>
                <li>✍️ Generate a professional blog article</li>
            </ul>
            <p class="small-text">Powered by Gemini AI</p>
        </div>
    `;
}

// Generate blog
async function generateBlog() {
    const topicInput = document.getElementById('topicInput');
    const topic = topicInput.value.trim();

    if (!topic) {
        alert('Please enter a topic');
        return;
    }

    // Disable input
    const sendBtn = document.getElementById('sendBtn');
    sendBtn.disabled = true;
    topicInput.disabled = true;

    // Clear welcome message if present
    const welcome = document.querySelector('.welcome-message');
    if (welcome) {
        welcome.remove();
    }

    // Add user message
    addMessageToUI('user', `Generate a blog about: ${topic}`);

    // Show loading
    showLoading();

    // Clear input
    topicInput.value = '';
    topicInput.style.height = 'auto';

    try {
        const response = await fetch(`${API_BASE}/generate-blog`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                topic: topic,
                user_id: 1
            })
        });

        const data = await response.json();

        // Remove loading
        removeLoading();

        if (data.success) {
            // Add AI response
            addMessageToUI('assistant', data.content);
            currentChatId = data.chat_id;
            loadChats();
        } else {
            addMessageToUI('assistant', 'Sorry, there was an error generating the blog. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        removeLoading();
        addMessageToUI('assistant', 'Sorry, there was an error connecting to the server. Please check if the server is running and try again.');
    } finally {
        // Re-enable input
        sendBtn.disabled = false;
        topicInput.disabled = false;
        topicInput.focus();
    }
}

// Add message to UI
function addMessageToUI(role, content) {
    const chatMessages = document.getElementById('chatMessages');

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;

    const icon = role === 'user' ? '👤' : '🤖';
    const roleName = role === 'user' ? 'You' : 'AI Assistant';

    messageDiv.innerHTML = `
        <div class="message-header">
            <span>${icon}</span>
            <span>${roleName}</span>
        </div>
        <div class="message-content">${formatContent(content)}</div>
    `;

    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

// Format content (basic markdown-like formatting)
function formatContent(content) {
    // Convert markdown headers
    content = content.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    content = content.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    content = content.replace(/^# (.*$)/gm, '<h1>$1</h1>');

    // Convert bold
    content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Convert line breaks
    content = content.replace(/\n/g, '<br>');

    return content;
}

// Show loading animation
function showLoading() {
    const chatMessages = document.getElementById('chatMessages');
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'message assistant loading-message';
    loadingDiv.innerHTML = `
        <div class="message-header">
            <span>🤖</span>
            <span>AI Assistant</span>
        </div>
        <div class="loading">
            <div class="loading-dot"></div>
            <div class="loading-dot"></div>
            <div class="loading-dot"></div>
        </div>
    `;
    chatMessages.appendChild(loadingDiv);
    scrollToBottom();
}

// Remove loading animation
function removeLoading() {
    const loading = document.querySelector('.loading-message');
    if (loading) {
        loading.remove();
    }
}

// Scroll to bottom
function scrollToBottom() {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}