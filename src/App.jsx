import { useEffect, useContext } from 'react';
import { evaluate } from 'mathjs';
// Components
import { Screen } from './components/Screen';
import { CalculatorButtons } from './components/CalculatorButtons';
// Contexts
import { HistoryContext } from './context/HistoryContext';
import { CalculatorContext } from './context/CalculatorContext';

export function App() {
  const { setHistory } = useContext(HistoryContext);
  const {
    expression,
    result,
    ans,
    completeOperation,
    open,
    setters: {
      setExpression,
      setResult,
      setAns,
      setcompleteOperation,
      setOpen,
    },
  } = useContext(CalculatorContext);

  const buttons = {
    basic: [
      { icon: 'C', action: clearScreen },
      { icon: '←', action: deleteCharScreen },
      { icon: '%', action: updateScreen },
      { icon: '+', action: updateScreen },
      { icon: '1', action: updateScreen },
      { icon: '2', action: updateScreen },
      { icon: '3', action: updateScreen },
      { icon: '÷', action: updateScreen },
      { icon: '4', action: updateScreen },
      { icon: '5', action: updateScreen },
      { icon: '6', action: updateScreen },
      { icon: '-', action: updateScreen },
      { icon: '7', action: updateScreen },
      { icon: '8', action: updateScreen },
      { icon: '9', action: updateScreen },
      { icon: 'x', action: updateScreen },
      { icon: '0', action: updateScreen },
      { icon: '.', action: updateScreen },
      { icon: '=', action: calculateResult },
    ],
    scientific: [
      { icon: 'e', action: updateScreen },
      { icon: 'Ans', action: updateScreen },
      { icon: 'π', action: updateScreen },
      { icon: '(', operator: '()', action: IncreaseParentheses },
      { icon: ')', action: DecreaseParentheses },
      { icon: '|x|', operator: 'abs()', action: IncreaseParentheses },
      { icon: 'Rnd', operator: 'round()', action: IncreaseParentheses },
      { icon: '√', operator: '√()', action: IncreaseParentheses },
      { icon: 'log', operator: 'log()', action: IncreaseParentheses },
      { icon: 'In', operator: 'In()', action: IncreaseParentheses },
      { icon: 'cos', operator: 'cos()', action: IncreaseParentheses },
      { icon: 'sen', operator: 'sin()', action: IncreaseParentheses },
      { icon: 'tan', operator: 'tan()', action: IncreaseParentheses },
      { icon: 'x!', operator: '!', action: updateScreen },
      { icon: '^', operator: '^()', action: IncreaseParentheses },
    ],
  };

  // Button functions
  function clearScreen() {
    setcompleteOperation(false);
    setExpression('');
    setResult(0);
    setOpen(0);
  }

  function IncreaseParentheses(value) {
    updateScreen(value);
    setOpen((prev) => prev + 1);
  }

  function DecreaseParentheses() {
    setOpen((prev) => Math.max(0, prev - 1));
  }

  function updateScreen(value) {
    setExpression((prev) => {
      let formattedValue = value;

      // add space if the input is a symbol
      if (/^[^0-9.]$/.test(value)) {
        formattedValue = ` ${value} `;
      }

      // always show = in the end of the expression
      if (value === '=') {
        setOpen(0);
        return prev + formattedValue;
      }

      // Start a new operation keeping the last result
      if (completeOperation) {
        setcompleteOperation(false);
        return ans + formattedValue;
      }

      // Only update the parentheses counter
      if (value === ')') {
        return prev;
      }

      // Determine the position of the input based on open parentheses
      if (open > 0) {
        return prev.slice(0, -open) + formattedValue + prev.slice(-open);
      }

      return prev + formattedValue;
    });
  }

  function deleteCharScreen() {
    setExpression((prev) => {
      const emptyFuncOrParenRegex = /(log|ln|cos|sen|tan|√|Rnd|abs)?\(\)/g;
      const match = prev.match(/(\)+)$/);
      const count = match ? match[0].length : 0;

      function EmptyFuncOrParen() {
        setOpen((prevOpen) => prevOpen - 1);
        return prev.replace(emptyFuncOrParenRegex, '');
      }

      function InsideParentheses() {
        if (prev.slice(0, -count).endsWith(' ')) {
          return prev.slice(0, -count - 3) + prev.slice(-count);
        }
        return prev.slice(0, -count - 1) + prev.slice(-count);
      }

      function OutsideParentheses() {
        if (prev.endsWith(' ')) {
          return prev.slice(0, -3);
        }
        return prev.slice(0, -1);
      }

      // delete empty parentheses or functions
      if (emptyFuncOrParenRegex.test(prev)) {
        return EmptyFuncOrParen();
      }

      // inside parentheses
      if (count > 0) {
        return InsideParentheses();
      }

      // outside parentheses, default return
      return OutsideParentheses();
    });
  }

  function parseExpression(value) {
    return value
      .replaceAll('x', '*')
      .replaceAll('÷', '/')
      .replaceAll('√', 'sqrt')
      .replaceAll('π', 'pi')
      .replaceAll('Ans', ans)
      .replaceAll('In', 'log')
      .replaceAll('log', 'log10');
  }

  function calculateResult() {
  updateScreen('=');
   try {
     const result = evaluate(parseExpression(expression));
     setResult(result);
     setHistory((prev) => [...prev, expression]);

     if (!isNaN(result) && isFinite(result)) {
       setAns(result);
    }
   } catch (error) {
     setResult('Syntax Error');
   }

  setcompleteOperation(true); //not validate if it is correct, only if it is completed
 }

  return (
    <>
      <Screen />
      <div className="flex justify-center">
        <CalculatorButtons
          basicButtons={buttons.basic}
          scientificButtons={buttons.scientific}
        />
      </div>
    </>
  );
}
