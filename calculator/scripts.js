class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clearAll();
  }

  // щоб відображати число на екрані дислпея, потрібно це число перевести в рядок символів - тут метод number.toString()

  clearAll() {
    // при включенні калькулятора - по замовчуванні:
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  deleteNum() {
    // відкидаємо останній символ від переведеного в рядок символів задане число, беремо частину від 0 до відкинутого, не включаючи відкинуте
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNum(number) {
    if (number === '.' && this.currentOperand.includes('.')) return; // перевірка на можливість поставити крапку коли вона вже є
    // тут продовжуємо формувати число додаючи до останнього символа новий бо 2 + 2 = 4 а так буде '2' + '2' = '22'
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return; // якщо кнопка з операцією не вибрана - то вийти
    // якщо число та вид операції вибрано, але продовжуємо задавати числа то обчислення здійснюються автоматично на верхньому рядку дисплея
    if (this.previousOperand !== '') {
      this.compute(); // здійснювати обчислення при серії дій (без натискання знака '=')
    }
    this.operation = operation; // задаємо сам вид операції ( * / + - )
    this.previousOperand = this.currentOperand; // переносимо вже сформоване (перше) число на верхній рядок дисплея
    this.currentOperand = ''; // очищаємо рядок відображення чисел дисплея (нижній рядок)
  }

  compute() {
    let result;
    const previous = parseFloat(this.previousOperand); // переводимо перше число в числовий формат, якщо виявиться не числом
    const current = parseFloat(this.currentOperand); // переводимо друге число в числовий формат, якщо виявиться не числом
    if (isNaN(previous) || isNaN(current)) return; // перевірка, якщо введене число має числовий формат або будь яке число не введено
    switch (this.operation) {
      case '+':
        result = previous + current;
        break;
      case '-':
        result = previous - current;
        break;
      case 'x':
        result = previous * current;
        break;
      case '÷':
        result = previous / current;
        break;
      default:
        break;
    }
    this.currentOperand = result;
    this.operation = undefined;
    this.previousOperand = '';
  }

  // це окрема функція розділення заданого числа на коми після кожних трьох знаків
  getDisplayNumber(number) {
    const stringNumber = number.toString(); // щоб можна було потім розділити число до коми і після
    const integerDigits = parseFloat(stringNumber.split('.')[0]); // береться частина числа до коми
    const decimalDigits = stringNumber.split('.')[1]; // беруться усі символи після коми

    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand // відображення другого числа введеного на нижньому рядку дисплея
    );
    // у разі, якщо було вибрано тип операції та введено перше число
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`; // відображення першого числа та виду операції на верхньому рядку дисплея
    } else {
      this.previousOperandTextElement.innerText = '';
    }
  }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector(
  '[data-previous-operand]'
);
const currentOperandTextElement = document.querySelector(
  '[data-current-operand]'
);

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNum(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener('click', (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener('click', (button) => {
  calculator.clearAll();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', (button) => {
  calculator.deleteNum();
  calculator.updateDisplay();
});
