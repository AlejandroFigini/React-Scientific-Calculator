import { useState, useContext } from 'react';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Context
import { HistoryContext } from '../context/HistoryContext';
import { CalculatorContext } from '../context/CalculatorContext';

export function History() {
  const [openMenu, setOpenMenu] = useState(false);
  const { history } = useContext(HistoryContext);

  const {
    setters: {
      setExpression,
      setResult,
      setcompleteOperation,
      setOpen,
    },
  } = useContext(CalculatorContext);

  function updateScreenFromHistory(value) {
    setcompleteOperation(false);
    setResult(0);
    setOpen(0);
    setExpression(value);
  }

  return (
    <>
      <div className="flex justify-end items-center relative">
        <FontAwesomeIcon
          icon={faClockRotateLeft}
          onClick={() => setOpenMenu(!openMenu)}
          className={`
            transition-all 
            duration-200 
            ease-in-out 
            hover:scale-[1.02] 
            hover:text-[#51b9e3] 
            hover:cursor-pointer
            ${openMenu ? 'text-[#51b9e3]' : 'text-white'}
          `}
        />
        <div
          className={`
            absolute 
            bg-[#0b0c0c]       
            top-[-.2rem] 
            left-[-4.3rem] 
            [scrollbar-width:none] 
            h-[9.8rem]	
            w-[10.5rem] 
            overflow-y-scroll 
            overflow-x-hidden 
            rounded-[.4rem]             
            transition-all 
            duration-300 
            ease-in-out 
            ${openMenu ? 'translate-x-[7.2rem] opacity-100' : 'opacity-0 translate-x-full'}
          `}
        >
          <p className="p-2 sticky top-0 bg-[#0b0c0c] z-10 text-[1rem]">
            {history.length} operation{history.length !== 1 ? 's' : ''}
          </p>

          {history.map((entry, index) => (
            <h3
              className="
                text-[rgba(255,231,231,0.596)] 
                transition-all 
                duration-100 
                ease-in-out 
                px-[.4rem] 
                py-[.2rem]
                text-[.9rem]
                hover:bg-[#186064] 
                hover:cursor-pointer 
                hover:scale-[1.03] 
                hover:text-white
              "
              key={index}
              onClick={function () {
                updateScreenFromHistory(entry);
              }}
            >
              {entry}
            </h3>
          ))}
        </div>
      </div>
    </>
  );
}
