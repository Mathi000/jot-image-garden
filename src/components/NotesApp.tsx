
import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

const NotesApp = () => {
  const appRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!appRef.current) return;
    
    // Insert our HTML directly into the div
    appRef.current.innerHTML = `
      <div class="messaging-app">
        <header class="app-header">
          <h1>Simple Messaging</h1>
        </header>
        
        <div class="chat-container">
          <div class="chat-header">
            <div class="user-info user1">Person 1</div>
            <div class="user-info user2">Person 2</div>
          </div>
          
          <div class="messages-container" id="messages">
            <!-- Messages will appear here -->
          </div>
          
          <div class="input-container">
            <div class="user-input user1-input">
              <textarea id="user1-input" placeholder="Type message as Person 1..."></textarea>
              <button id="user1-send">Send</button>
            </div>
            
            <div class="user-input user2-input">
              <textarea id="user2-input" placeholder="Type message as Person 2..."></textarea>
              <button id="user2-send">Send</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Add CSS styles
    const style = document.createElement('style');
    style.textContent = `
      .messaging-app {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        width: 100%;
        max-width: 800px;
        margin: 0 auto;
        color: #333;
      }
      
      .app-header {
        text-align: center;
        padding: 15px 0;
        margin-bottom: 20px;
      }
      
      .app-header h1 {
        margin: 0;
        font-size: 1.8rem;
        font-weight: 600;
      }
      
      .chat-container {
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        background: white;
      }
      
      .chat-header {
        display: flex;
        justify-content: space-between;
        padding: 15px;
        background: #f5f5f5;
        border-bottom: 1px solid #eaeaea;
      }
      
      .user-info {
        padding: 8px 15px;
        border-radius: 20px;
        font-weight: 600;
        font-size: 0.9rem;
      }
      
      .user1 {
        background: #e1f5fe;
        color: #0277bd;
      }
      
      .user2 {
        background: #f3e5f5;
        color: #7b1fa2;
      }
      
      .messages-container {
        height: 400px;
        overflow-y: auto;
        padding: 15px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        background: #fafafa;
      }
      
      .message {
        max-width: 80%;
        padding: 10px 15px;
        border-radius: 18px;
        margin-bottom: 5px;
        word-break: break-word;
        position: relative;
        font-size: 0.95rem;
        line-height: 1.4;
      }
      
      .message.user1-message {
        align-self: flex-start;
        background: #e1f5fe;
        color: #0277bd;
        border-bottom-left-radius: 5px;
      }
      
      .message.user2-message {
        align-self: flex-end;
        background: #f3e5f5;
        color: #7b1fa2;
        border-bottom-right-radius: 5px;
      }
      
      .input-container {
        display: flex;
        padding: 15px;
        gap: 10px;
        border-top: 1px solid #eaeaea;
      }
      
      .user-input {
        flex: 1;
        display: flex;
        gap: 8px;
      }
      
      textarea {
        flex: 1;
        border: 1px solid #ddd;
        border-radius: 18px;
        padding: 10px 15px;
        resize: none;
        height: 40px;
        font-family: inherit;
        font-size: 0.9rem;
        outline: none;
        transition: border-color 0.2s;
      }
      
      textarea:focus {
        border-color: #0277bd;
      }
      
      button {
        background: #2196f3;
        color: white;
        border: none;
        border-radius: 18px;
        padding: 0 20px;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.2s;
      }
      
      button:hover {
        background: #0d8aee;
      }
      
      .user1-input button {
        background: #0277bd;
      }
      
      .user1-input button:hover {
        background: #01579b;
      }
      
      .user2-input button {
        background: #7b1fa2;
      }
      
      .user2-input button:hover {
        background: #6a1b9a;
      }
      
      .timestamp {
        font-size: 0.7rem;
        color: rgba(0, 0, 0, 0.5);
        margin-top: 5px;
        text-align: right;
      }
      
      @media (max-width: 600px) {
        .input-container {
          flex-direction: column;
        }
      }
    `;
    document.head.appendChild(style);
    
    // JavaScript for sending messages
    const messagesContainer = document.getElementById('messages');
    const user1Input = document.getElementById('user1-input') as HTMLTextAreaElement;
    const user2Input = document.getElementById('user2-input') as HTMLTextAreaElement;
    const user1SendBtn = document.getElementById('user1-send');
    const user2SendBtn = document.getElementById('user2-send');
    
    // Function to format current time
    const getFormattedTime = () => {
      const now = new Date();
      return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };
    
    // Function to add a message to the chat
    const addMessage = (text: string, sender: 'user1' | 'user2') => {
      if (!text.trim()) return; // Don't send empty messages
      
      const messageElement = document.createElement('div');
      messageElement.classList.add('message', `${sender}-message`);
      
      messageElement.innerHTML = `
        ${text}
        <div class="timestamp">${getFormattedTime()}</div>
      `;
      
      if (messagesContainer) {
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight; // Auto-scroll to bottom
      }
    };
    
    // Event listeners for send buttons
    user1SendBtn?.addEventListener('click', () => {
      if (user1Input) {
        addMessage(user1Input.value, 'user1');
        user1Input.value = '';
        user1Input.focus();
      }
    });
    
    user2SendBtn?.addEventListener('click', () => {
      if (user2Input) {
        addMessage(user2Input.value, 'user2');
        user2Input.value = '';
        user2Input.focus();
      }
    });
    
    // Event listeners for pressing Enter to send
    user1Input?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (user1Input) {
          addMessage(user1Input.value, 'user1');
          user1Input.value = '';
        }
      }
    });
    
    user2Input?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (user2Input) {
          addMessage(user2Input.value, 'user2');
          user2Input.value = '';
        }
      }
    });
    
    // Add some welcome messages
    setTimeout(() => {
      addMessage("Hello! How are you today?", 'user1');
      setTimeout(() => {
        addMessage("I'm doing great, thanks for asking! How about you?", 'user2');
      }, 1000);
    }, 500);
    
    // Notify that the app is ready
    toast("Messaging app ready! You can start sending messages as either person.");
    
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-20">
      <Card className="p-0 overflow-hidden">
        <div ref={appRef} className="w-full"></div>
      </Card>
    </div>
  );
};

export default NotesApp;
