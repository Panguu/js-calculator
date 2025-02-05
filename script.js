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
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return "Invalid Operator";
  }
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
let current = null;
let waiting = false;

numbersBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
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
      first = operate(current, first, displayValue).toString();
      displayValue = first;
      Display();
    }
    current = btn.value;
    waiting = true;
  });
});

function showResult() {
  if (first && current && !waiting) {
    let result = operate(current, first, displayValue);
    displayValue = result.toString();
    waiting = false;
    first = result;
    current = null;
    Display();
  }
}

resultBtn.addEventListener("click", () => {
  showResult();
});

ac.addEventListener("click", () => {
  deleteAll();
  waiting = false;
  current = null;
  first = null;
});

del.addEventListener("click", () => {
  deleteLast();
});
