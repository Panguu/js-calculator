function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Math Error";
  }
  return a / b;
}

function operate(operator, x, y) {
  let a = parseFloat(x);
  let b = parseFloat(y);
  let result;
  console.log(operator);
  switch (operator) {
    case "+":
      result = add(a, b);
      break;
    case "-":
      result = subtract(a, b);
      break;
    case "*":
      result = multiply(a, b);
      break;
    case "/":
      result = divide(a, b);
      break;
    default:
      result = "Invalid Operator";
  }
  console.log(`Operate: ${a} ${operator} ${b} = ${result}`);
  return result;
}

function Display() {
  display.value = displayValue;
}

function deleteAll() {
  displayValue = "0";
  Display();
}

function deleteLast() {
  if (displayValue.length == 1) {
    deleteAll();
  } else {
    displayValue = displayValue.slice(0, -1);
    Display();
  }
}

const display = document.getElementById("display");
const ac = document.querySelector(".all");
const del = document.querySelector(".one");
const resultBtn = document.querySelector(".result");
const addBtn = document.querySelector(".add");
const minBtn = document.querySelector(".min");
const mulBtn = document.querySelector(".mul");
const divBtn = document.querySelector(".div");
const operationsBtn = document.querySelectorAll(".operations");
const numbersBtn = document.querySelectorAll(".number");
let displayValue = "0";
let first = null;
let currentOperator = null;
let waiting = false;

numbersBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (displayValue.includes(".") && btn.value === ".") {
      return;
    }
    if (waiting) {
      displayValue = btn.value;
      waiting = false;
    } else {
      if (displayValue === "0") {
        displayValue = btn.value;
      } else {
        displayValue += btn.value;
      }
    }
    Display();
  });
});

operationsBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (first == null) {
      first = displayValue;
    } else if (!waiting) {
      console.log("operate");
      first = operate(currentOperator, first, displayValue).toString();
      displayValue = first;
      Display();
    }
    currentOperator = btn.value;
    waiting = true;
  });
});

function showResult() {
  if (first && currentOperator && !waiting) {
    console.log("show result");
    let result = operate(currentOperator, first, displayValue);
    if (result == "Math Error") {
      displayValue = "Math Error";
    } else if (result % 1 == 0) {
      displayValue = result.toString();
    } else {
      displayValue = result.toFixed(4).toString();
    }
    waiting = true;
    currentOperator = null;
    first = result;
    Display();
  }
}

resultBtn.addEventListener("click", () => {
  showResult();
  first = null;
});

ac.addEventListener("click", () => {
  deleteAll();
  waiting = false;
  currentOperator = null;
  first = null;
});

del.addEventListener("click", () => {
  deleteLast();
});

window.addEventListener("keydown", (e) => {
  if ((e.key >= 0 && e.key <= 9) || e.key == ".") {
    numbersBtn.forEach((btn) => {
      if (btn.value == e.key) {
        btn.click();
      }
    });
  } else if (e.key == "+" || e.key == "-" || e.key == "*" || e.key == "/") {
    e.preventDefault();
    operationsBtn.forEach((btn) => {
      if (btn.value == e.key) {
        btn.click();
      }
    });
  }
  if (e.key == "Enter" || e.key == "=") {
    e.preventDefault();
    resultBtn.click();
  }
  if (e.key == "Backspace" || e.key == "Delete") {
    del.click();
  }
  if (e.key == "Escape") {
    deleteAll();
  }
});
