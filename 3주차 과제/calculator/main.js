let currentInput = '';

function appendNumber(num) {
    currentInput += num;
    updateResultView();
}

function appendOperator(operator) {
    currentInput += operator;
    updateResultView();
}

function clearResult() {
    currentInput = '';
    updateResultView();
}

function calculateResult() {
    if (currentInput) {
        checkAgain(currentInput);
    } else {
        alert('입력되지 않았습니다.');
    }
}

function updateResultView() {
    document.getElementById('result').innerText = currentInput || '0';
}

function exit() {
    if (confirm(`계산기를 종료하겠습니까?`)) {
        window.open('', '_self').close();
    }
}

function checkAgain(inputText) {
    getArr(inputText);
}

function getArr(string) {
    const equation = string
        .replace(/\+/g, '~+~')
        .replace(/\-/g, '~-~')
        .replace(/\*/g, '~*~')
        .replace(/\//g, '~/~')
        .replace(/\(/g, '~(~')
        .replace(/\)/g, '~)~')
        .replace(/\s/g, '')
        .split('~')
        .filter(Boolean);
    startOperation0(equation);
}

function startOperation0(equation) {
    if (equation.indexOf('*') !== -1 || equation.indexOf('/') !== -1 || equation.indexOf('%') !== -1) {
        operation1(equation);
    } else if (equation.indexOf('+') !== -1 || equation.indexOf('-') !== -1) {
        operation2(equation);
    } else {
        errorProcess(equation);
    }
}

function getResult(v, num1, num2) {
    switch (v) {
        case '*':
            return (+num1 * +num2).toFixed(2);
        case '/':
            return (+num1 / +num2).toFixed(2);
        case '+':
            return (+num1 + +num2).toFixed(2);
        case '-':
            return (+num1 - +num2).toFixed(2);
        case '%':
            return ((+num1 * +num2) / 100).toFixed(2); // 퍼센트 계산 추가
    }
}

function operation1(equation) {
    while (equation.indexOf('*') !== -1 || equation.indexOf('/') !== -1 || equation.indexOf('%') !== -1) {
        for (let i = 0; i < equation.length; i++) {
            switch (equation[i]) {
                case '*':
                case '/':
                case '%':
                    equation.splice(i - 1, 3, getResult(equation[i], equation[i - 1], equation[i + 1]));
                    continue;
            }
        }
    }
    operation2(equation);
}

function operation2(equation) {
    while (equation.length !== 1) {
        for (let i = 0; i < equation.length; i++) {
            switch (equation[i]) {
                case '+':
                case '-':
                    equation.splice(i - 1, 3, getResult(equation[i], equation[i - 1], equation[i + 1]));
                    continue;
            }
        }
    }
    errorProcess(equation);
}

function errorProcess(v) {
    const error = '잘못된 수식입니다.';
    if (isNaN(v)) {
        document.getElementById('result').innerText = error;
    } else {
        showResult(v);
    }
}

function showResult(value) {
    document.getElementById('result').innerText = value;
}
