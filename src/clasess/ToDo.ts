import { NoteList } from "./NoteList.js";

export class ToDo{
    container: HTMLElement
    form:HTMLElement
    input:HTMLInputElement
    buttonWrapper:HTMLElement
    button:HTMLButtonElement
    list:HTMLElement
    private _notes: NoteList
    constructor(container: HTMLElement){
        this.container = container 
        // Создание формы, инпута и кнопки
        this.form = document.createElement('form')
        this.input = document.createElement('input')
        this.buttonWrapper = document.createElement('div')
        this.button = document.createElement('button')
        this.list = document.createElement('div')
        // Добавление классов Bootstrap
        this.container.classList.add('pt-5', 'pb-5','mw-50','w-50')
        this.form.classList.add('input-group','mb-3')
        this.input.classList.add('form-control')
        this.buttonWrapper.classList.add('input-group-append')
        this.button.classList.add('btn', 'btn-primary')
        // Добавления атрибутов
        this.button.textContent = "Добавить дело"
        this.button.disabled = true
        this.input.placeholder = 'Есть какие-то дела?'
        // Добавление всего в контейнер
        this.buttonWrapper.append(this.button)
        this.form.append(this.input)
        this.form.append(this.buttonWrapper)
        this.container.append(this.form)
        this.container.append(this.list)
        // Добавление в массив списка дел
        this._notes = new NoteList(this.list, 'my')
        // Если инпут пуст, кнопка не активна
        this.input.addEventListener('input', () => {
            this.button.disabled = false 
            if(this.input.value === '' )[
                this.button.disabled = true
            ]
        })
        // Обработчик действия кнопки 
        this.form.addEventListener('submit', (e)=>{
            e.preventDefault()
            if(!this.input.value){
                return
            }
            if(this._notes){
                this._notes.add(this.input.value)
            }
            // Обнуление инпута
            this.input.value = ''
            if(this.input.value === '' )[
                this.button.disabled = true
            ]
        })
    }
}