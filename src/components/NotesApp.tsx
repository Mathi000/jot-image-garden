import React, { useEffect, useRef } from 'react';

const NotesApp: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Insert our vanilla JS app into the container
    containerRef.current.innerHTML = `
      <div class="notes-container">
        <header class="notes-header">
          <h1>NoteKeeper</h1>
          <p>Take notes and upload images easily</p>
        </header>

        <div class="notes-content">
          <div class="notes-sidebar">
            <button id="new-note-btn" class="primary-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              New Note
            </button>
            <div id="notes-list" class="notes-list">
              <!-- Notes will be listed here -->
            </div>
          </div>

          <div class="note-editor">
            <div class="editor-toolbar">
              <input type="text" id="note-title" placeholder="Note title..." class="note-title-input" />
              <div class="editor-actions">
                <button id="save-note-btn" class="action-button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                  Save
                </button>
                <button id="delete-note-btn" class="action-button danger">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                  Delete
                </button>
              </div>
            </div>

            <div class="editor-content">
              <textarea id="note-content" placeholder="Start typing your note here..."></textarea>
              
              <div class="image-upload-section">
                <div class="image-upload-header">
                  <h3>Images</h3>
                  <label for="image-upload" class="image-upload-label">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"></path><line x1="16" y1="5" x2="22" y2="5"></line><line x1="19" y1="2" x2="19" y2="8"></line><circle cx="9" cy="9" r="2"></circle><path d="M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg>
                    Add Image
                  </label>
                  <input type="file" id="image-upload" accept="image/*" multiple hidden />
                </div>
                <div id="image-preview-container" class="image-preview-container">
                  <!-- Image previews will appear here -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Add CSS for our vanilla app
    const style = document.createElement('style');
    style.textContent = `
      .notes-container {
        display: flex;
        flex-direction: column;
        height: 100vh;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        color: var(--foreground);
      }

      .notes-header {
        text-align: center;
        padding: 2rem 1rem;
        background: linear-gradient(to right, hsl(220, 50%, 50%, 0.05), hsl(220, 50%, 50%, 0.1));
        border-bottom: 1px solid hsl(var(--border));
      }

      .notes-header h1 {
        font-size: 2.5rem;
        font-weight: 700;
        margin: 0;
        color: hsl(var(--foreground));
      }

      .notes-header p {
        margin-top: 0.5rem;
        font-size: 1.1rem;
        color: hsl(var(--muted-foreground));
      }

      .notes-content {
        display: flex;
        flex: 1;
        overflow: hidden;
      }

      .notes-sidebar {
        width: 250px;
        border-right: 1px solid hsl(var(--border));
        display: flex;
        flex-direction: column;
        padding: 1rem;
        background-color: hsl(var(--secondary));
        overflow-y: auto;
      }

      .primary-button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        background-color: hsl(var(--primary));
        color: hsl(var(--primary-foreground));
        border: none;
        border-radius: 0.5rem;
        padding: 0.75rem 1rem;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .primary-button:hover {
        opacity: 0.9;
      }

      .notes-list {
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .note-item {
        padding: 0.75rem;
        border-radius: 0.5rem;
        border: 1px solid transparent;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .note-item:hover {
        background-color: hsl(var(--accent));
      }

      .note-item.active {
        background-color: hsl(var(--accent));
        border-color: hsl(var(--primary), 0.2);
      }

      .note-item h3 {
        margin: 0 0 0.25rem 0;
        font-size: 0.875rem;
        font-weight: 600;
      }

      .note-item p {
        margin: 0;
        font-size: 0.75rem;
        color: hsl(var(--muted-foreground));
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .note-editor {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 1rem;
        overflow-y: auto;
      }

      .editor-toolbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 1rem;
        border-bottom: 1px solid hsl(var(--border));
        margin-bottom: 1rem;
      }

      .note-title-input {
        font-size: 1.25rem;
        font-weight: 600;
        border: none;
        padding: 0.5rem;
        border-radius: 0.25rem;
        background-color: transparent;
        color: hsl(var(--foreground));
        flex: 1;
      }

      .note-title-input:focus {
        outline: 2px solid hsl(var(--primary), 0.2);
        background-color: hsl(var(--background));
      }

      .editor-actions {
        display: flex;
        gap: 0.5rem;
      }

      .action-button {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0.5rem 0.75rem;
        border-radius: 0.25rem;
        font-size: 0.75rem;
        font-weight: 500;
        background-color: hsl(var(--secondary));
        color: hsl(var(--secondary-foreground));
        border: none;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .action-button:hover {
        background-color: hsl(var(--accent));
      }

      .action-button.danger {
        background-color: transparent;
        color: hsl(var(--destructive));
      }

      .action-button.danger:hover {
        background-color: hsl(var(--destructive), 0.1);
      }

      .editor-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      #note-content {
        flex: 1;
        min-height: 200px;
        padding: 1rem;
        border: 1px solid hsl(var(--border));
        border-radius: 0.5rem;
        resize: none;
        font-family: inherit;
        font-size: 0.875rem;
        line-height: 1.5;
        color: hsl(var(--foreground));
        background-color: transparent;
      }

      #note-content:focus {
        outline: none;
        border-color: hsl(var(--primary), 0.5);
      }

      .image-upload-section {
        border: 1px solid hsl(var(--border));
        border-radius: 0.5rem;
        padding: 1rem;
      }

      .image-upload-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
      }

      .image-upload-header h3 {
        margin: 0;
        font-size: 0.875rem;
        font-weight: 600;
      }

      .image-upload-label {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0.5rem 0.75rem;
        border-radius: 0.25rem;
        font-size: 0.75rem;
        font-weight: 500;
        background-color: hsl(var(--secondary));
        color: hsl(var(--secondary-foreground));
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .image-upload-label:hover {
        background-color: hsl(var(--accent));
      }

      .image-preview-container {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
      }

      .image-preview {
        position: relative;
        width: 100px;
        height: 100px;
        border-radius: 0.25rem;
        overflow: hidden;
        border: 1px solid hsl(var(--border));
      }

      .image-preview img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .image-preview .remove-image {
        position: absolute;
        top: 0.25rem;
        right: 0.25rem;
        background-color: hsl(var(--background), 0.8);
        border: none;
        border-radius: 50%;
        width: 1.5rem;
        height: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.2s ease;
      }

      .image-preview:hover .remove-image {
        opacity: 1;
      }

      /* Responsive styles */
      @media (max-width: 768px) {
        .notes-content {
          flex-direction: column;
        }

        .notes-sidebar {
          width: 100%;
          border-right: none;
          border-bottom: 1px solid hsl(var(--border));
          max-height: 250px;
        }
      }

      .icon {
        width: 1rem;
        height: 1rem;
      }
    `;
    document.head.appendChild(style);

    // Initialize JavaScript functionality
    initNotesApp();

    // Function to initialize our vanilla JS app
    function initNotesApp() {
      let notes = JSON.parse(localStorage.getItem('notes') || '[]');
      let activeNoteId = null;
      const imageFiles = new Map();

      const newNoteBtn = document.getElementById('new-note-btn');
      const saveNoteBtn = document.getElementById('save-note-btn');
      const deleteNoteBtn = document.getElementById('delete-note-btn');
      const notesList = document.getElementById('notes-list');
      const titleInput = document.getElementById('note-title');
      const contentInput = document.getElementById('note-content');
      const imageUpload = document.getElementById('image-upload');
      const imagePreviewContainer = document.getElementById('image-preview-container');

      // Initialize the UI
      renderNotesList();
      
      // Event listeners
      newNoteBtn.addEventListener('click', createNewNote);
      saveNoteBtn.addEventListener('click', saveNote);
      deleteNoteBtn.addEventListener('click', deleteNote);
      imageUpload.addEventListener('change', handleImageUpload);

      // Create a new note
      function createNewNote() {
        activeNoteId = Date.now().toString();
        clearEditor();
        updateActiveNoteInList();
      }

      // Save the current note
      function saveNote() {
        const title = titleInput.value.trim();
        const content = contentInput.value.trim();
        
        if (!title && !content && imageFiles.size === 0) {
          alert('Please add a title, content, or images to save the note');
          return;
        }

        if (!activeNoteId) {
          activeNoteId = Date.now().toString();
        }

        // Convert image files to data URLs for storage
        const imagePromises = Array.from(imageFiles.values()).map(file => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = e => resolve(e.target.result);
            reader.readAsDataURL(file);
          });
        });

        Promise.all(imagePromises).then(imageDataUrls => {
          const existingNoteIndex = notes.findIndex(note => note.id === activeNoteId);
          const newNote = {
            id: activeNoteId,
            title: title || 'Untitled Note',
            content: content,
            images: imageDataUrls,
            updatedAt: new Date().toISOString()
          };

          if (existingNoteIndex >= 0) {
            notes[existingNoteIndex] = newNote;
          } else {
            notes.unshift(newNote);
          }

          localStorage.setItem('notes', JSON.stringify(notes));
          renderNotesList();
          updateActiveNoteInList();
          
          // Show success notification
          const notification = document.createElement('div');
          notification.className = 'notification';
          notification.textContent = 'Note saved successfully!';
          notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: hsl(var(--primary));
            color: hsl(var(--primary-foreground));
            padding: 12px 20px;
            border-radius: 4px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            animation: fadeIn 0.3s, fadeOut 0.3s 2.7s;
          `;
          
          document.body.appendChild(notification);
          
          // Remove notification after 3 seconds
          setTimeout(() => {
            document.body.removeChild(notification);
          }, 3000);
        });
      }

      // Delete the current note
      function deleteNote() {
        if (!activeNoteId) return;
        
        if (confirm('Are you sure you want to delete this note?')) {
          notes = notes.filter(note => note.id !== activeNoteId);
          localStorage.setItem('notes', JSON.stringify(notes));
          activeNoteId = notes.length > 0 ? notes[0].id : null;
          renderNotesList();
          
          if (activeNoteId) {
            displayNote(activeNoteId);
          } else {
            clearEditor();
          }
        }
      }

      // Handle image uploads
      function handleImageUpload(e) {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const fileId = Date.now() + i;
          imageFiles.set(fileId, file);
          
          // Create image preview
          const reader = new FileReader();
          reader.onload = function(event) {
            const previewEl = document.createElement('div');
            previewEl.className = 'image-preview';
            previewEl.innerHTML = `
              <img src="${event.target.result}" alt="Preview" />
              <button class="remove-image" data-id="${fileId}">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            `;
            
            imagePreviewContainer.appendChild(previewEl);
            
            // Add event listener to remove button
            previewEl.querySelector('.remove-image').addEventListener('click', function() {
              const fileId = this.getAttribute('data-id');
              imageFiles.delete(parseInt(fileId));
              previewEl.remove();
            });
          };
          
          reader.readAsDataURL(file);
        }
        
        // Clear the file input
        e.target.value = '';
      }

      // Render the list of notes
      function renderNotesList() {
        notesList.innerHTML = '';
        
        if (notes.length === 0) {
          notesList.innerHTML = '<p class="empty-notes">No notes yet. Create your first note!</p>';
          return;
        }
        
        notes.forEach(note => {
          const noteEl = document.createElement('div');
          noteEl.className = `note-item ${note.id === activeNoteId ? 'active' : ''}`;
          noteEl.setAttribute('data-id', note.id);
          
          const date = new Date(note.updatedAt).toLocaleString();
          const previewText = note.content.length > 30 ? note.content.slice(0, 30) + '...' : note.content;
          
          noteEl.innerHTML = `
            <h3>${note.title}</h3>
            <p>${previewText || 'No content'}</p>
            <small style="font-size: 0.7rem; color: hsl(var(--muted-foreground));">${date}</small>
          `;
          
          noteEl.addEventListener('click', () => {
            displayNote(note.id);
          });
          
          notesList.appendChild(noteEl);
        });
      }

      // Display a note in the editor
      function displayNote(noteId) {
        const note = notes.find(n => n.id === noteId);
        if (!note) return;
        
        activeNoteId = noteId;
        titleInput.value = note.title;
        contentInput.value = note.content;
        
        // Clear existing images
        imageFiles.clear();
        imagePreviewContainer.innerHTML = '';
        
        // Display saved images
        if (note.images && note.images.length > 0) {
          note.images.forEach((imgSrc, index) => {
            // For saved images, we create a preview but don't need to keep the file object
            const previewEl = document.createElement('div');
            previewEl.className = 'image-preview';
            previewEl.innerHTML = `
              <img src="${imgSrc}" alt="Saved image" />
              <button class="remove-image" data-index="${index}">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            `;
            
            imagePreviewContainer.appendChild(previewEl);
            
            // Add event listener to remove button for saved images
            previewEl.querySelector('.remove-image').addEventListener('click', function() {
              const index = parseInt(this.getAttribute('data-index'));
              note.images.splice(index, 1);
              localStorage.setItem('notes', JSON.stringify(notes));
              previewEl.remove();
            });
          });
        }
        
        updateActiveNoteInList();
      }

      // Clear the editor
      function clearEditor() {
        titleInput.value = '';
        contentInput.value = '';
        imageFiles.clear();
        imagePreviewContainer.innerHTML = '';
      }

      // Update the active note in the list
      function updateActiveNoteInList() {
        const noteItems = document.querySelectorAll('.note-item');
        noteItems.forEach(item => {
          if (item.getAttribute('data-id') === activeNoteId) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }

      // Add CSS animation for notifications
      const animationStyle = document.createElement('style');
      animationStyle.textContent = `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOut {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(20px); }
        }
      `;
      document.head.appendChild(animationStyle);
    }

    return () => {
      // Clean up if component unmounts
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full min-h-screen" />
  );
};

export default NotesApp;
