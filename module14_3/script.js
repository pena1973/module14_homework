let groupBlock = document.querySelector(".profBlocksWrapper");
let btnNode = document.querySelector('.btn');
let inpNode = document.querySelector('.inp');
let resNode = document.querySelector('.res');
let reqUrl = 'https://picsum.photos/v2/list?limit=';


function processResult(xhr) {
resNode.innerHTML = 'Запрос успешен!';    
const response = JSON.parse(xhr.response);
console.log(response);
groupBlock.innerHTML = "";
    for (let i = 0; i < response.length; i++) {

        // "id":"0",
        // "author":"Alejandro Escamilla",
        // "width":5000,
        // "height":3333,
        // "url":"https://unsplash.com/photos/yC-Yzbqy7PY",
        // "download_url":"https://picsum.photos/id/0/5000/3333"},

        //  прроверю чтобы с сервера не приехала всякая ерунда    
        if (!response[i].url) continue;
        if (!response[i].download_url) continue;
        if (!response[i].height) continue;
        if (!response[i].width) continue;
        if (!response[i].author) continue;
        // отображу
        let blockDiv = 
             `<a class="profBlockLink"`
             + `href="${response[i].url}">`
             + `<img src="${response[i].download_url}" alt="(${response[i].id})"`
             + `style="width:${response[i].width/10}px; height:${response[i].height/10}px">`

            + `<div class="profBlocks">(${response[i].author})<br><br>`            
            + `</div>`
            + '</a>'

        groupBlock.innerHTML += blockDiv;
    };
};



function getData() {
    const myNum = +inpNode.value;
    // Проверки
    if (!myNum) {
        resNode.innerHTML = 'Введите число в поле ввода';
        return
    };
    if (!(myNum >= 1 && myNum <= 10)) {
        resNode.innerHTML = 'Число должно быть в диапазоне от 1 до 10';
        return
    };

    var xhr = new XMLHttpRequest();        
    xhr.open('GET', reqUrl+myNum, true);
    xhr.onload = () => { processResult(xhr) }
    xhr.onerror = () => { resNode.innerHTML = 'Запрос НЕ успешен!'; }
    xhr.onprogress = (ev) => { resNode.innerHTML = `Загружено-${ev.loaded} из - ${ev.total}`; }
    xhr.send();
 
}

// Вешаем обработчик на кнопку для запроса
btnNode.addEventListener('click', () => {
    getData();
})