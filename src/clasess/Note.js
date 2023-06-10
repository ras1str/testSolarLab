var Note = /** @class */ (function () {
    function Note(container, name, done, id) {
        if (name === void 0) { name = ""; }
        if (done === void 0) { done = false; }
        var _this = this;
        this._name = '';
        this._done = false;
        // Создание одного дела
        this.item = document.createElement('div');
        this.buttonGroup = document.createElement('div');
        this.nameSpan = document.createElement('span');
        this.doneButton = document.createElement('button');
        this.deleteButton = document.createElement('button');
        // Добавление классов 
        this.item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'p-3', 'text-center', 'mt-3', 'border', 'rounded');
        this.buttonGroup.classList.add('btn-group', "btn-group-sm");
        this.doneButton.classList.add('btn', "btn-success");
        this.doneButton.textContent = 'Готово';
        this.deleteButton.classList.add('btn', 'btn-danger');
        this.deleteButton.textContent = 'Удалить';
        // Слушатель событий на кнопки удалить и готово 
        this.deleteButton.addEventListener('click', function () {
            // удаление из HTML
            _this["delete"]();
            // удаление из массива
            container.remove(id);
        });
        this.doneButton.addEventListener('click', function () {
            _this.done = !_this.done;
            // сохранение в LS чекбокса при изменение
            container.save();
        });
        // Добавление всех тегов в контейнер
        this.buttonGroup.append(this.doneButton);
        this.buttonGroup.append(this.deleteButton);
        this.item.append(this.nameSpan);
        this.item.append(this.buttonGroup);
        this.name = name;
        this.done = done;
        this.container = container;
        this.id = id;
        container.list.append(this.item);
    }
    Object.defineProperty(Note.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
            this.nameSpan.textContent = this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Note.prototype, "done", {
        get: function () {
            return this._done;
        },
        // Сеттер чекбокса
        set: function (value) {
            this._done = value;
            // Изменение стилей при выполнении задания 
            if (value) {
                this.item.classList.add('text-bg-success');
                this.doneButton.classList.add('btn-secondary');
                this.doneButton.classList.remove('btn-success');
            }
            else {
                this.item.classList.remove('text-bg-success');
                this.doneButton.classList.remove('btn-secondary');
                this.doneButton.classList.add('btn-success');
            }
        },
        enumerable: false,
        configurable: true
    });
    // удаление из HTML 
    Note.prototype["delete"] = function () {
        this.item.remove();
    };
    return Note;
}());
export { Note };
