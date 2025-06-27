import { createContext, useState } from "react";

export const CalculatorContext = createContext();

export function CalculatorProvider({ children }) {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState(0);
  const [ans, setAns] = useState(0);
  const [completeOperation, setcompleteOperation] = useState(false);
  const [open, setOpen] = useState(0); // count open parentheses

  return (
    <CalculatorContext.Provider
      value={{
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
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
}
