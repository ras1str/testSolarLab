import { NoteList } from "./NoteList.js"

export class Note{
    private item: HTMLDivElement
    private buttonGroup: HTMLDivElement
    private nameSpan: HTMLSpanElement
    private doneButton: HTMLButtonElement
    private deleteButton: HTMLButtonElement
    private _name: string = ''
    _done: boolean = false
    id: number
    container
    constructor(container: NoteList, name: string = "", done: boolean = false, id:number) {
        // Создание одного дела
        this.item = document.createElement('div')
        this.buttonGroup = document.createElement('div')
        this.nameSpan = document.createElement('span')
        this.doneButton = document.createElement('button')
        this.deleteButton = document.createElement('button')
        // Добавление классов 
        this.item.classList.add(
            'list-group-item',
            'd-flex',
            'justify-content-between',
            'align-items-center',
            'p-3',
            'text-center',
            'mt-3',
            'border',
            'rounded'
        )
        this.buttonGroup.classList.add('btn-group', "btn-group-sm")
        this.doneButton.classList.add('btn', "btn-success")
        this.doneButton.textContent = 'Готово'
        this.deleteButton.classList.add('btn', 'btn-danger')
        this.deleteButton.textContent = 'Удалить'
        // Слушатель событий на кнопки удалить и готово 
        this.deleteButton.addEventListener('click', () => {
            // удаление из HTML
            this.delete()
            // удаление из массива
            container.remove(id) 
        })
        this.doneButton.addEventListener('click', () => {
            this.done = !this.done
            // сохранение в LS чекбокса при изменение
            container.save()
        })
        // Добавление всех тегов в контейнер
        this.buttonGroup.append(this.doneButton)
        this.buttonGroup.append(this.deleteButton)
        this.item.append(this.nameSpan)
        this.item.append(this.buttonGroup)
        this.name = name
        this.done = done
        this.container = container
        this.id = id
        container.list.append(this.item)  
    }
    set name(value: string) {
        this._name = value
        this.nameSpan.textContent = this._name
    }
    get name() {
        return this._name
    }   
    // Сеттер чекбокса
    set done(value: boolean) {
        this._done = value
        // Изменение стилей при выполнении задания 
        if (value) {
            this.item.classList.add('text-bg-success')
            this.doneButton.classList.add('btn-secondary')
            this.doneButton.classList.remove('btn-success')
        } else {
            this.item.classList.remove('text-bg-success')
            this.doneButton.classList.remove('btn-secondary')
            this.doneButton.classList.add('btn-success')
        }
    }
    get done() {
        return this._done
    }
    // удаление из HTML 
    delete() {
        this.item.remove()
    }
}

