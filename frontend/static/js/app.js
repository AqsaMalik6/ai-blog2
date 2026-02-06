let currentChatId = null;

document.addEventListener('DOMContentLoaded', () => {
    loadChats();
    setupTextarea();
});

function setupTextarea() {
    const textarea = document.getElementById('topicInput');
    textarea.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
    textarea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            generateBlog();
        }
    });
}

function setTopic(topic) {
    const input = document.getElementById('topicInput');
    input.value = topic;
    input.style.height = 'auto';
    input.style.height = (input.scrollHeight) + 'px';
    input.focus();
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
}

async function loadChats() {
    try {
        const response = await fetch('/api/chats');
        const chats = await response.json();
        const chatList = document.getElementById('chatList');
        chatList.innerHTML = '';
        chats.forEach(chat => {
            const div = document.createElement('div');
            div.className = `chat-item ${chat.id === currentChatId ? 'active' : ''}`;
            div.innerHTML = `
                <div class="chat-item-title" onclick="loadChat(${chat.id})">${chat.title}</div>
                <button class="delete-btn" onclick="deleteChat(${chat.id}, event)">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 6h18m-2 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6"/>
                    </svg>
                </button>
            `;
            chatList.appendChild(div);
        });
    } catch (e) {
        console.error(e);
    }
}

async function loadChat(id) {
    currentChatId = id;
    try {
        const response = await fetch(`/api/chats/${id}/messages`);
        const messages = await response.json();

        const welcome = document.getElementById('welcomeScreen');
        if (welcome) welcome.style.display = 'none';

        const display = document.getElementById('chatMessages');
        display.innerHTML = '';
        messages.forEach(msg => addMessageToUI(msg.role, msg.content));
        loadChats();
        scrollToBottom();
    } catch (e) { console.error(e); }
}

async function deleteChat(id, e) {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
        await fetch(`/api/chats/${id}`, { method: 'DELETE' });
        if (currentChatId === id) createNewChat();
        loadChats();
    } catch (e) { console.error(e); }
}

function createNewChat() {
    currentChatId = null;
    document.getElementById('welcomeScreen').style.display = 'block';
    document.getElementById('chatMessages').innerHTML = '';
    document.getElementById('topicInput').value = '';
    loadChats();
}

async function generateBlog() {
    const input = document.getElementById('topicInput');
    const topic = input.value.trim();
    if (!topic || input.disabled) return;

    input.value = '';
    input.style.height = 'auto';
    input.disabled = true;
    document.getElementById('sendBtn').disabled = true;

    // Remove welcome screen
    const welcome = document.getElementById('welcomeScreen');
    if (welcome) welcome.style.display = 'none';

    addMessageToUI('user', topic);
    showLoading();

    try {
        const res = await fetch('/api/generate-blog', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ topic, user_id: 1 })
        });
        const data = await res.json();
        removeLoading();

        if (data.success) {
            addMessageToUI('assistant', data.content);
            currentChatId = data.chat_id;
            loadChats();
        } else {
            addMessageToUI('assistant', "**System Error**: " + (data.detail || "Unable to process request."));
        }
    } catch (err) {
        removeLoading();
        addMessageToUI('assistant', "**Connection Error**: Please check if the server is running.");
    } finally {
        input.disabled = false;
        document.getElementById('sendBtn').disabled = false;
        input.focus();
    }
}

function addMessageToUI(role, content) {
    const display = document.getElementById('chatMessages');
    const wrapper = document.createElement('div');
    wrapper.className = `message-wrapper ${role === 'user' ? 'user' : 'ai'}`;

    const label = role === 'user' ? 'You' : 'AI Assistant';
    const avatar = role === 'user'
        ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>`
        : `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z"/></svg>`;

    wrapper.innerHTML = `
        <div class="message-header">
            <div class="avatar-icon">${avatar}</div>
            <span>${label}</span>
        </div>
        <div class="message-bubble">
            ${formatMarkdown(content)}
        </div>
    `;
    display.appendChild(wrapper);
    scrollToBottom();
}

function formatMarkdown(text) {
    // Basic formatting
    text = text.replace(/^# (.*$)/gm, '<h2>$1</h2>');
    text = text.replace(/^## (.*$)/gm, '<h3>$1</h3>');
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/\n\n/g, '<br><br>');
    text = text.replace(/\n/g, '<br>');
    return text;
}

function showLoading() {
    const display = document.getElementById('chatMessages');
    const wrapper = document.createElement('div');
    wrapper.className = 'message-wrapper ai loading-msg';
    wrapper.innerHTML = `
        <div class="message-header">
            <div class="avatar-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z"/></svg></div>
            <span>AI Assistant</span>
        </div>
        <div class="loading-row">
            <div class="dot"></div><div class="dot"></div><div class="dot"></div>
        </div>
    `;
    display.appendChild(wrapper);
    scrollToBottom();
}

function removeLoading() {
    const loader = document.querySelector('.loading-msg');
    if (loader) loader.remove();
}

function scrollToBottom() {
    const container = document.getElementById('chatContainer');
    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
}