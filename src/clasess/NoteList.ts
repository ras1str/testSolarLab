import { Note } from './Note.js'

interface INote {
    id: number
    name: string,
    container: NoteList,
    done: boolean,
}

export class NoteList {
    _notes: INote[] = []
    list: HTMLDivElement
    container: HTMLElement
    empty: HTMLElement
    private _key: string
    constructor(container: HTMLElement, key: string = '') {
        this.container = container
        // Создание блока списка дел
        this.list = document.createElement('div')
        this.list.classList.add('list-group')
        // Ключ для LocalStorage
        this._key = key
        container.innerHTML = ''
        container.append(this.list)
        this.empty = document.createElement('div')
        // Обновление списка дел из LocalStorage
        this.update()
        // Проверка на пустату списка дел
        this.checkEmpty()
    }
    // Добавление id делу
    newId() {
        let max: number = 0;
        for (const note of this._notes) {
            if (note.id > max) {
                max = note.id
            }
        }
        return max + 1
    }
    // Проверка на пустату списка дел
    checkEmpty() {
        if (this._notes.length === 0) {
            this.empty = document.createElement('div')
            this.empty.classList.add(
                'd-flex',
                'list-group-item',
                'justify-content-center',
                'align-items-center',
                'bg-light',
                'p-5',
                'text-secondary')
            this.empty.textContent = "Список дел пуст"
            this.list.append(this.empty)
        } else {
            if (this.empty) {
                this.empty.remove()
            }
        }
    }
    // Добавление дела в список 
    add(name: string = '', done: boolean = false) {
        let id = this.newId()
        let newNote: INote = new Note(this, name, done, id)
        this._notes.push(newNote)
        this.checkEmpty()
        // Сохранение в LS
        this.save()
        return id
    }
    // Удаление дела из списка 
    remove(value: number) {
        let id = value
        this._notes.forEach((note, index) => {
            if (note.id === id) {
                this._notes.splice(index, 1)
            }
        }) 
        // Проверка на пустоту нового списка
        this.checkEmpty()
         // Сохранение в LS
        this.save()
    }
    // Сохранение в LS
    save() {
        let saveList = []
        for (const note of this._notes) {
            saveList.push({
                id: note.id,
                name: note.name,
                done: note.done
            })
            console.log(note.done)
        }
        localStorage.setItem(this._key, JSON.stringify(saveList))
    }
    // обновление списка дел из LocalStorage
    update() {
        let startList = []
        this._notes = []
        this.list.innerHTML = ''
        if (this._key) {
            let dataLS = localStorage.getItem(this._key)
            if (dataLS != null) {
                startList = JSON.parse(dataLS)
            }
        }
        if (startList.length > 0) {
            for (const obj of startList) {
                let newNote: INote = new Note(this, obj.name, obj.done, obj.id)
                this._notes.push(newNote)
            }
        }
    }
}