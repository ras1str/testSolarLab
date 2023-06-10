import { ToDo } from './clasess/ToDo.js'

const container: HTMLElement = document.getElementById('app')! // Создание контейнера для ToDo 
const newList = new ToDo(container) // Создание класса ToDO