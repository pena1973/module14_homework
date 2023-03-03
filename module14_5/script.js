
// Задание 5.

// Написать код приложения, интерфейс которого состоит из двух input и кнопки. 
// В input можно ввести любое число.

// Заголовок первого input — «номер страницы».
// Заголовок второго input — «лимит».
// Заголовок кнопки — «запрос».
// При клике на кнопку происходит следующее:

// Если число в первом input не попадает в диапазон от 1 до 10 
// или не является числом — выводить ниже текст 
// «Номер страницы вне диапазона от 1 до 10»;

// Если число во втором input не попадает в диапазон от 1 до 10 
// или не является числом — выводить ниже текст 
// «Лимит вне диапазона от 1 до 10»;

// Если и первый, и второй input не в диапазонах 
// или не являются числами — выводить ниже текст 
// «Номер страницы и лимит вне диапазона от 1 до 10»;

// Если числа попадают в диапазон от 1 до 10 — сделать запрос 
// по URL https://picsum.photos/v2/list?page=1&limit=10, 
// где GET-параметр page — это число из первого input, 
// а GET-параметр limit — это введённое число второго input.
// Пример. Если пользователь ввёл 5 и 7, то запрос будет вида
//  https://picsum.photos/v2/list?page=5&limit=7.
// После получения данных вывести список картинок на экран.

// Если пользователь перезагрузил страницу, 
// то ему должны показываться картинки из последнего 
// успешно выполненного запроса (использовать localStorage).


// Удачи!


let groupBlock = document.querySelector(".profBlocksWrapper");
let btnNode = document.querySelector('.btn');
let inpNode1 = document.querySelector('.inp1');
let inpNode2 = document.querySelector('.inp2');
let resNode = document.querySelector('.res');

// отрисовка
function render(json) {
  
    if (!json) return;

    for (let i = 0; i < json.length; i++) {
      
        // свойства
        // "id":"0",
        // "author":"Alejandro Escamilla",
        // "width":5000,
        // "height":3333,
        // "url":"https://unsplash.com/photos/yC-Yzbqy7PY",
        // "download_url":"https://picsum.photos/id/0/5000/3333"},

        //  прроверю чтобы с сервера не приехала всякая ерунда    
        if (!json[i].url) continue;
        if (!json[i].download_url) continue;
        if (!json[i].height) continue;
        if (!json[i].width) continue;
        if (!json[i].author) continue;

        // отображу
        let blockDiv =
            `<a class="profBlockLink"`
            + `href="${json[i].url}">`
            + `<img src="${json[i].download_url}" alt="(${json[i].id})"`
            + `style="width:${json[i].width / 10}px; height:${json[i].height / 10}px">`
            + `<div class="profBlocks">(${json[i].author})<br><br>`
            + `</div>`
            + '</a>'

        groupBlock.innerHTML += blockDiv;
    };
}
// чтение хранилища
function readStorage() {
    const myJSON = localStorage.getItem('myJSON');
    if (myJSON) {
        return JSON.parse(myJSON);
    }
    else return undefined;
}
// запись хранилища
function setStorage(json) {
    localStorage.setItem('myJSON', JSON.stringify(json));
}

// запросец на сервер
const useRequest = () => {
  
    const numPage = inpNode1.value;
    const limit = inpNode2.value;

    return fetch(`https://picsum.photos/v2/list?page=${numPage}&limit=${limit}`)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            // console.log(json);
            // сохраним
            setStorage(json);
            // нарисуем
            render(json);
        }
        )
        .catch((error) => {
            resNode.innerHTML = error;
        })
        .finally(() => {
            // очистим форму
            inpNode1.value = 0;
            inpNode2.value = 0;
            resNode.innerHTML = '';
        })
}
// добавим ожидания
async function onData() {
    await useRequest();
}

// Вешаем обработчик на кнопку для запроса
btnNode.addEventListener('click', (evt) => {
    // отключим манипуляции браузера
    evt.preventDefault();
    
    groupBlock.innerHTML = '';
    
    const numPage = +inpNode1.value;
    const limit = +inpNode2.value;
    
    const numPage_OK = !isNaN(numPage) && (numPage >= 1 && numPage <= 10);
    const limit_OK = !isNaN(limit) && (limit >= 1 && limit <= 10);

    // Сначала оба значения
    if (!numPage_OK && !limit_OK) {
        resNode.innerHTML = 'Номер страницы и лимит вне диапазона от 1 до 10';
        localStorage.clear();
        return
    };

    // потом по отдельности
    if (!numPage_OK) {
        resNode.innerHTML = 'Номер страницы вне диапазона от 1 до 10';
        localStorage.clear();
        return
    };
    if (!limit_OK) {
        resNode.innerHTML = 'Лимит вне диапазона от 1 до 10';
        localStorage.clear();
        return
    };

    // пошел асинхрон
    onData();
})

// При перезагрузе читаем сторидж
document.addEventListener("DOMContentLoaded", function () {
    const myJSON = readStorage();
    render(myJSON);
});
