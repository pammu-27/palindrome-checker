document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded, setting up event listeners");
    const input = document.getElementById('inputNumber');
    const checkButton = document.getElementById('checkButton');
    const clearButton = document.getElementById('clearButton');
    const resultDiv = document.getElementById('result');

    if (!input || !checkButton || !clearButton || !resultDiv) {
        console.error("Element not found:", { input, checkButton, clearButton, resultDiv });
        return;
    }

    function checkPrime() {
        console.log("checkPrime called, input value:", input.value);
        const value = input.value.trim();
        resultDiv.classList.remove('success', 'error');
        resultDiv.textContent = '';
        resultDiv.style.opacity = '1';

        if (!value) {
            resultDiv.textContent = 'Error: Input cannot be empty! Please enter a number.';
            resultDiv.classList.add('error');
            console.log("Empty input");
            return;
        }

        const num = Number(value);
        if (isNaN(num) || !Number.isInteger(num)) {
            resultDiv.textContent = 'Error: Please enter a valid integer!';
            resultDiv.classList.add('error');
            console.log("Invalid integer:", value);
            return;
        }

        if (num < 0) {
            resultDiv.textContent = 'Error: Please enter a non-negative integer!';
            resultDiv.classList.add('error');
            console.log("Negative number:", num);
            return;
        }

        if (num < 2) {
            resultDiv.textContent = `Error: ${num} is not a prime number! Prime numbers are greater than 1.`;
            resultDiv.classList.add('error');
            console.log("Number less than 2:", num);
            return;
        }

        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) {
                resultDiv.textContent = `Error: ${num} is not a prime number! It is divisible by ${i}.`;
                resultDiv.classList.add('error');
                console.log("Non-prime number:", num, "divisible by", i);
                return;
            }
        }

        resultDiv.textContent = `Success: ${num} is a prime number! Awesome!`;
        resultDiv.classList.add('success');
        console.log("Prime number:", num);
    }

    function clearInput() {
        console.log("clearInput called");
        input.value = '';
        resultDiv.classList.remove('success', 'error');
        resultDiv.textContent = '';
        resultDiv.style.opacity = '1';
        input.focus();
    }

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            console.log("Enter key pressed");
            if (input.value.trim() === '') {
                clearInput();
            } else {
                checkPrime();
            }
        }
    });

    input.addEventListener('focus', () => {
        console.log("Input focused");
        input.select();
    });

    checkButton.addEventListener('click', () => {
        console.log("Check button clicked");
        checkPrime();
    });

    clearButton.addEventListener('click', () => {
        console.log("Clear button clicked");
        clearInput();
    });
});