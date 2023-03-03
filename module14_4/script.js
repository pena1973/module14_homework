// Задание 4

// Напишите код приложения, интерфейс которого представляет собой 2 input и кнопку submit. В input можно ввести любое число.

// При клике на кнопку происходит следующее:

// Если оба числа не попадают в диапазон от 100 до 300 или введено не число — выводить ниже текст «одно из чисел вне диапазона от 100 до 300»;
// Если числа попадают в диапазон от 100 до 300 — сделать запрос c помощью fetch по URL https://picsum.photos/200/300, где первое число — ширина картинки, второе — высота.
// Пример. Если пользователь ввёл 150 и 200, то запрос будет вида https://picsum.photos/150/200.
// После получения данных вывести ниже картинку на экран.

// Подсказка

// Получение данных из input:

// const value = document.querySelector('input').value;


let groupBlock = document.querySelector(".profBlocksWrapper");
let btnNode = document.querySelector('.btn');
let inpNode1 = document.querySelector('.inp1');
let inpNode2 = document.querySelector('.inp2');
let resNode = document.querySelector('.res');


const useRequest = () => {

    const myNum1 = inpNode1.value;
    const myNum2 = inpNode2.value;

    return fetch(`https://picsum.photos/${myNum1}/${myNum2}`)
        .then((response) => {
            return response.url;
        })
        .then((url) => {
            let blockDiv = `<img src="${url}" alt="(${url})">`;
            groupBlock.innerHTML = blockDiv;
            resNode.innerHTML = "Успех";
        }
        )
        .catch((error) => {            
            resNode.innerHTML = error;
        });
}

async function onData() {
   await useRequest();
}

// Вешаем обработчик на кнопку для запроса
btnNode.addEventListener('click', (evt) => {
    evt.preventDefault();
    groupBlock.innerHTML = '';
    const myNum1 = +inpNode1.value;
    const myNum2 = +inpNode2.value;

    if (!(myNum1 >= 100 && myNum1 <= 300)) {
        resNode.innerHTML = 'Число должно быть в диапазоне от 100 до 300';
        return
    };
    if (!(myNum2 >= 100 && myNum2 <= 300)) {
        resNode.innerHTML = 'Число должно быть в диапазоне от 100 до 300';
        return
    };
// пошел асинхрон
    onData();
})