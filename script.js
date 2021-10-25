// variables
const create = document.querySelector('.create');

// UI

class UI {
    static loadNotes() {
        const oldNotes = Storage.getNote();
        if (oldNotes) {
            oldNotes.forEach(note => {
                UI.createNote(note);
            })
        }
        create.addEventListener('click', () => {
            UI.createNote();
        })
    }
    static createNote(text='') {
        const note = document.createElement('div');
        note.classList.add('note');
        note.innerHTML = `<div class="tool-box">
                                <i title="settings" class="fas fa-cog settings"></i>
                                <div class="menu">
                                    <div class="form-control">
                                        <label for="text-size"><i class="fas fa-text-height"></i></label>
                                        <input type="number" min="12" max="30" name="text-size" class="text-size">
                                    </div>
                                    <div class="form-control">
                                        <input type="color" name="color" class="color">
                                    </div>
                                </div>
                                <i title="delete" class="fas fa-times delete"></i>
                            </div>
                            <div class="view">
                                <p></p>
                                <textarea></textarea>
                            </div>`;
        const settings = note.querySelector('.settings');
        const menu = note.querySelector('.menu');
        const textInput = note.querySelector('.text-size');
        const textarea = note.querySelector('textarea');
        const color = note.querySelector('.color');
        const del = note.querySelector('.delete')
        if (text.includes('/')) {
            textarea.value = text.split('/')[0];
            textarea.style.fontSize = text.split('/')[1].split('|')[0];
            textarea.style.color = text.split('/')[1].split('|')[1];
        } else {
            textarea.value = text;
        }
        settings.addEventListener('click', () => {
            menu.classList.toggle('show');
            textInput.addEventListener('change', (e) => {
                if (e.target.value >= 12 && e.target.value <= 30) {
                    textarea.style.fontSize = e.target.value + 'px';
                    Storage.saveNote();
                }
            })
            color.addEventListener('change', (e) => {
                textarea.style.color = e.target.value;
                Storage.saveNote();
            })
        })
        textarea.addEventListener('input', (e) => {
            Storage.saveNote();
        })
        del.addEventListener('click', () => {
            note.remove();
            Storage.saveNote();
        })
        document.body.appendChild(note);
    }
}







// Storage
class Storage {
    static saveNote() {
        const notes = document.querySelectorAll('.note textarea');
        const notesArr = [];
        notes.forEach((note,idx) => {
            notesArr.push(note.value + `/${note.style.fontSize||'12px'}|${note.style.color||'#5A605E'}`);
        })
        localStorage.setItem('notes', JSON.stringify(notesArr));
    }
    static getNote() {
        return JSON.parse(localStorage.getItem('notes'));
    }
}



// dom loaded

document.addEventListener('DOMContentLoaded', () => {
    UI.loadNotes();
})


/* possible improvements
    1. font size change in part
    2. color size change in part
*/