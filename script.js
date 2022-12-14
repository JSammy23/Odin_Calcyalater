// Constant variables
const numberBtns = document.querySelectorAll('[data-number]');
const operatorBtns = document.querySelectorAll('[data-operator]');
const allClearBtn = document.querySelector('[data-all-clear]');
const deleteBtn = document.querySelector('[data-delete]');
const equalsBtn = document.querySelector('[data-equals]');
const previousOperandText = document.querySelector('[data-previous-operand]');
const currentOperandText = document.querySelector('[data-current-operand]');

let firstNumber = '';
let storedNumber = '';
let currentOperation = null;
let result = '';


// Functions

function add(num1, num2) {
    return num1 + num2
};

function subtract(num1, num2) {
    return num1 - num2
};

function multiply(num1, num2) {
    return num1 * num2
};

function divide(num1, num2) {
    return num1 / num2
};


function clear() {
    previousOperandText.textContent = ''
    currentOperandText.textContent = ''
    currentOperation = null
    storedNumber = ''
    firstNumber = ''
    result = ''
};

function del() {
    currentOperandText.textContent = currentOperandText.textContent.toString().slice(0, -1)
};

function appendNumber(number) {
    if (number === '.' && currentOperandText.textContent.includes('.')) return
    currentOperandText.textContent = currentOperandText.textContent.toString() + number.toString()
};

function operate(num1, num2, operator) {
    switch (operator) {
        case '+':
            return add(num1, num2)
            break;
        case '-':
            return subtract(num1, num2)
            break;
        case '*':
            return multiply(num1, num2)
            break;
        case '/':
            return divide(num1, num2)
            break;
    }
}

function setOperation(operator) {
    if (currentOperation !== null) evaluate()
    firstNumber = currentOperandText.textContent
    currentOperation = operator
    previousOperandText.textContent = `${firstNumber} ${currentOperation}`
    currentOperandText.textContent = ''
}

function evaluate() {
    if ( currentOperation === null) return
    storedNumber = currentOperandText.textContent
    currentOperandText.textContent = operate(parseFloat(firstNumber), parseFloat(storedNumber), currentOperation)
    previousOperandText.textContent = `${firstNumber} ${currentOperation} ${storedNumber}`
    currentOperation = null
}

function takeKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
    // if (e.key === '.') appendNumber(e.key)
    if (e.key === '=' || e.key === 'Enter') evaluate()
    if (e.key === 'Backspace') del()
    if (e.key === 'Escape') clear()
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
      setOperation((e.key))
};

// Event Listeners

numberBtns.forEach((button) => 
    button.addEventListener('click', () => appendNumber(button.textContent))
);

operatorBtns.forEach((button) => {
    button.addEventListener('click', () => setOperation(button.textContent))
});

allClearBtn.addEventListener('click', () => clear());

deleteBtn.addEventListener('click', () => del());

equalsBtn.addEventListener('click', () => evaluate());

window.addEventListener('keydown', takeKeyboardInput);