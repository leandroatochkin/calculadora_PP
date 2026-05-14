document.addEventListener("DOMContentLoaded", function() {
    document.addEventListener("keydown", function(event) {
        const key = event.code;

        const button = document.querySelector(`[data-key~="${key}"]`);//matchea multiples teclas, por ejemplo "Digit7 Numpad7", con el operador ~
            button.click();
        })
    screenOperations.textContent = "0"
    screenResult.textContent = "0"
    getResult()
    
});


const clearButton = document.querySelector("#clear")
const deleteButton = document.querySelector("#delete")
const screenOperations = document.querySelector("#screen-operations")
const screenResult = document.querySelector("#result")
const numpadButtons = document.querySelectorAll(".numpad-button")
const equalButton = document.querySelector("#equal")


function getResult() {
    let arr = [];

    numpadButtons.forEach(button => {
        button.addEventListener("click", () => { 
                let value = button.textContent;
                arr.push(value);
                let displayOperation = arr.join('')
                screenOperations.textContent = displayOperation
            });
    });

    deleteButton.addEventListener("click", ()=>{
        arr.pop()
        let displayOperation = arr.join('')
        screenOperations.textContent = displayOperation
    });

    equalButton.addEventListener("click", ()=>{
        let displayOperation = arr.join('')
        screenOperations.textContent = displayOperation
        let result = operate(arr).toString()

        if(result === 'e'){
            screenResult.textContent = "Err"   
        } else {
            screenResult.textContent = result
            if (result.length >= 8) {
                screenResult.style.fontSize = "12px"; 
            } else {
                screenResult.style.fontSize = ""; 
            }
            
        }
        arr = [result]
    })

    clearButton.addEventListener("click", ()=>{
        screenOperations.textContent = "0"
        screenResult.textContent = "0"
        arr = []
    })
    
}

function operate(arr) {
    const operatorRegex = /[+*/]/; 
    const isNumberPart = /[\d.]/; 
    
    let operator = '';
    let firstEntry = '';
    let secondEntry = '';
    let result = 0;

    for (let i = 0; i < arr.length; i++) {
        const char = arr[i];

        if (isNumberPart.test(char)) {
            if (operator === '') {
                firstEntry += char; // Construye el primer número
            } else {
                secondEntry += char; // Construye el segundo número
            }
        } else if (operatorRegex.test(char)) {
            operator = char; // Establece el operador
        } else if (char === '-') { // Maneja el caso del signo negativo
            if (firstEntry === '' || (operator !== '' && secondEntry === '')) { // Si el primer número está vacío o si ya hay un operador pero el segundo número está vacío, el signo negativo pertenece al número
                if (operator === '') firstEntry += char; // Si no hay operador, el signo negativo pertenece al primer número
                else secondEntry += char; // Si ya hay un operador, el signo negativo pertenece al segundo número
            } else {
                operator = char;
            }
        }
    }

    let firstValue = parseFloat(firstEntry);
    let secondValue = parseFloat(secondEntry);


    switch (operator) {
        case "+": 
            result = firstValue + secondValue; 
            break;
        case "-": 
            result = firstValue - secondValue; 
            break;
        case "*": 
        result = firstValue * secondValue; 
            break;
        case "/": 
            if (secondValue === 0) return 'e';
            result = firstValue / secondValue; 
            break;
    }
    return result;
}