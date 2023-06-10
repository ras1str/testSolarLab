import { Note } from './Note.js';
var NoteList = /** @class */ (function () {
    function NoteList(container, key) {
        if (key === void 0) { key = ''; }
        this._notes = [];
        this.container = container;
        // Создание блока списка дел
        this.list = document.createElement('div');
        this.list.classList.add('list-group');
        // Ключ для LocalStorage
        this._key = key;
        container.innerHTML = '';
        container.append(this.list);
        this.empty = document.createElement('div');
        // Обновление списка дел из LocalStorage
        this.update();
        // Проверка на пустату списка дел
        this.checkEmpty();
    }
    // Добавление id делу
    NoteList.prototype.newId = function () {
        var max = 0;
        for (var _i = 0, _a = this._notes; _i < _a.length; _i++) {
            var note = _a[_i];
            if (note.id > max) {
                max = note.id;
            }
        }
        return max + 1;
    };
    // Проверка на пустату списка дел
    NoteList.prototype.checkEmpty = function () {
        if (this._notes.length === 0) {
            this.empty = document.createElement('div');
            this.empty.classList.add('d-flex', 'list-group-item', 'justify-content-center', 'align-items-center', 'bg-light', 'p-5', 'text-secondary');
            this.empty.textContent = "Список дел пуст";
            this.list.append(this.empty);
        }
        else {
            if (this.empty) {
                this.empty.remove();
            }
        }
    };
    // Добавление дела в список 
    NoteList.prototype.add = function (name, done) {
        if (name === void 0) { name = ''; }
        if (done === void 0) { done = false; }
        var id = this.newId();
        var newNote = new Note(this, name, done, id);
        this._notes.push(newNote);
        this.checkEmpty();
        // Сохранение в LS
        this.save();
        return id;
    };
    // Удаление дела из списка 
    NoteList.prototype.remove = function (value) {
        var _this = this;
        var id = value;
        this._notes.forEach(function (note, index) {
            if (note.id === id) {
                _this._notes.splice(index, 1);
            }
        });
        // Проверка на пустоту нового списка
        this.checkEmpty();
        // Сохранение в LS
        this.save();
    };
    // Сохранение в LS
    NoteList.prototype.save = function () {
        var saveList = [];
        for (var _i = 0, _a = this._notes; _i < _a.length; _i++) {
            var note = _a[_i];
            saveList.push({
                id: note.id,
                name: note.name,
                done: note.done
            });
            console.log(note.done);
        }
        localStorage.setItem(this._key, JSON.stringify(saveList));
    };
    // обновление списка дел из LocalStorage
    NoteList.prototype.update = function () {
        var startList = [];
        this._notes = [];
        this.list.innerHTML = '';
        if (this._key) {
            var dataLS = localStorage.getItem(this._key);
            if (dataLS != null) {
                startList = JSON.parse(dataLS);
            }
        }
        if (startList.length > 0) {
            for (var _i = 0, startList_1 = startList; _i < startList_1.length; _i++) {
                var obj = startList_1[_i];
                var newNote = new Note(this, obj.name, obj.done, obj.id);
                this._notes.push(newNote);
            }
        }
    };
    return NoteList;
}());
export { NoteList };
