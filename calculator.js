let display = document.getElementById('display');
let currentInput = '0';
let shouldReset = false;

function updateDisplay() {
  display.textContent = currentInput;
}

function appendNumber(num) {
  if (shouldReset) {
    currentInput = num;
    shouldReset = false;
  } else {
    if (currentInput === '0' && num !== '.') {
      currentInput = num;
    } else {
      currentInput += num;
    }
  }
  updateDisplay();
}

function appendOperator(op) {
  if (shouldReset) shouldReset = false;
  
  const lastChar = currentInput.slice(-1);
  if (['+', '-', '*', '/'].includes(lastChar)) {
    currentInput = currentInput.slice(0, -1) + op;
  } else {
    currentInput += op;
  }
  updateDisplay();
}

function calculate() {
  try {
    let expression = currentInput.replace(/×/g, '*').replace(/÷/g, '/');
    let result = eval(expression);
    
    if (!isFinite(result)) {
      currentInput = 'Error';
    } else {
      currentInput = parseFloat(result.toFixed(10)).toString();
    }
  } catch (e) {
    currentInput = 'Error';
  }
  shouldReset = true;
  updateDisplay();
}

function clearDisplay() {
  currentInput = '0';
  shouldReset = false;
  updateDisplay();
}

function deleteLast() {
  if (shouldReset) {
    clearDisplay();
    return;
  }
  currentInput = currentInput.slice(0, -1) || '0';
  updateDisplay();
}
