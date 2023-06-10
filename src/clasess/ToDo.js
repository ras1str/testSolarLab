import { NoteList } from "./NoteList.js";
var ToDo = /** @class */ (function () {
    function ToDo(container) {
        var _this = this;
        this.container = container;
        // Создание формы, инпута и кнопки
        this.form = document.createElement('form');
        this.input = document.createElement('input');
        this.buttonWrapper = document.createElement('div');
        this.button = document.createElement('button');
        this.list = document.createElement('div');
        // Добавление классов Bootstrap
        this.container.classList.add('pt-5', 'pb-5', 'mw-50', 'w-50');
        this.form.classList.add('input-group', 'mb-3');
        this.input.classList.add('form-control');
        this.buttonWrapper.classList.add('input-group-append');
        this.button.classList.add('btn', 'btn-primary');
        // Добавления атрибутов
        this.button.textContent = "Добавить дело";
        this.button.disabled = true;
        this.input.placeholder = 'Есть какие-то дела?';
        // Добавление всего в контейнер
        this.buttonWrapper.append(this.button);
        this.form.append(this.input);
        this.form.append(this.buttonWrapper);
        this.container.append(this.form);
        this.container.append(this.list);
        // Добавление в массив списка дел
        this._notes = new NoteList(this.list, 'my');
        // Если инпут пуст, кнопка не активна
        this.input.addEventListener('input', function () {
            _this.button.disabled = false;
            if (_this.input.value === '')
                [
                    _this.button.disabled = true
                ];
        });
        // Обработчик действия кнопки 
        this.form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!_this.input.value) {
                return;
            }
            if (_this._notes) {
                _this._notes.add(_this.input.value);
            }
            // Обнуление инпута
            _this.input.value = '';
            if (_this.input.value === '')
                [
                    _this.button.disabled = true
                ];
        });
    }
    return ToDo;
}());
export { ToDo };
