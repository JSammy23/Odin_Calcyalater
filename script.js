// Constant variables
const numberBtns = document.querySelectorAll('[data-number]');
const operatorBtns = document.querySelectorAll('[data-operator]');
const allClearBtn = document.querySelector('[data-all-clear]');
const deleteBtn = document.querySelector('[data-delete]');
const equalsBtn = document.querySelector('[data-equals]');
const previousOperandText = document.querySelector('[data-previous-operand]');
const currentOperandText = document.querySelector('[data-current-operand]');

let storedNumber = '';
let clickedOperator = '';
let firstNumber = '';
let result = '';
currentOperandText.textContent = '';


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

// function operate() {

// };

function clear() {
    previousOperandText.textContent = ''
    currentOperandText.textContent = ''
    clickedOperator = ''
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

function compute(num1, num2, operator) {
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

function updateDisplay() {
    firstNumber = currentOperandText.textContent
    result = compute(parseFloat(firstNumber), parseFloat(storedNumber), clickedOperator);
    currentOperandText.textContent = result;
    previousOperandText.textContent = firstNumber + ' ' + clickedOperator + ' ' + storedNumber;
    storedNumber = result;
};

// Event Listeners 

numberBtns.forEach((button) => 
    button.addEventListener('click', () => appendNumber(button.textContent))
);

operatorBtns.forEach((button) => {
    button.addEventListener('click', function() {
        firstNumber = currentOperandText.textContent
        if (firstNumber !== '' && storedNumber !== ''){
            result = compute(parseFloat(firstNumber), parseFloat(storedNumber), clickedOperator)
            storedNumber = result
            previousOperandText.textContent = storedNumber + ' ' + clickedOperator
            currentOperandText.textContent = ''
        } else {
            firstNumber = currentOperandText.textContent
            storedNumber = firstNumber
            clickedOperator = button.textContent
            currentOperandText.textContent = ''
            previousOperandText.textContent = storedNumber + ' ' + clickedOperator
            firstNumber = ''
        }
    })
})

allClearBtn.addEventListener('click', () => clear());

deleteBtn.addEventListener('click', () => del());

equalsBtn.addEventListener('click', () => updateDisplay());