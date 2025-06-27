import { useRef, useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
// Components
import { History } from './History';
import { CalculatorMode } from './CalculatorMode';
import { BlinkingCurson } from './BlinkingCursor';
// Context
import { CalculatorContext } from '../context/CalculatorContext';

export function Screen() {
  const {
    expression,
    result,
    ans,
    completeOperation,
    open,
  } = useContext(CalculatorContext);

  const inputRef = useRef(null);
  const [displayUp, setdisplayUp] = useState('Ans = ' + ans);
  const [displayDown, setdisplayDown] = useState(expression);

  useEffect(() => {
      setdisplayUp(completeOperation ? result : 'Ans = ' + ans);
  }, [completeOperation]);

  // Put blinking cursor inside parentheses
  useEffect(() => {
    const index = expression.length - open;
    setdisplayDown(
      <>
        {open > 0 ? (
          <>
            {expression.slice(0, index)}
            <BlinkingCurson completeOperation={completeOperation} />
            <span style={{ color: '#696464' }}>{expression.slice(index)}</span>
          </>
        ) : (
          <>
            {expression}
            <BlinkingCurson completeOperation={completeOperation} />
          </>
        )}
      </>
    );
  }, [expression, open]);

  // Automatically move to the end of the expression
  useEffect(() => {
    if (inputRef.current) {
      requestAnimationFrame(() => {
        inputRef.current.scrollLeft = inputRef.current.scrollWidth;
      });
    }
  }, [expression, displayDown]);

  return (
    <>
      <div
        className={`col-span-2 row-start-1 row-end-2 bg-black rounded-[.6rem] grid grid-cols-1 [grid-template-rows:1.8rem_auto] gap-[1rem] p-[1rem] transition-all duration-200 '}`}
      >
        <CalculatorMode />
        <History />
        <div
          ref={inputRef}
          className="
            col-span-2
            row-start-2 row-end-3
            overflow-x-scroll
            [scrollbar-width:thin]
            [scrollbar-color:transparent_transparent]
            relative
            hover:[scrollbar-color:#626060_#00000000]
            h-[6.3rem]
          "
        >
          {/* change location of both h2 */}
          <motion.h2
            className="absolute"
            animate={{
              y: completeOperation ? 40 : 15,
              color: completeOperation ? '#ffffff' : '#aca3a3',
              fontSize: completeOperation ? '1.2rem' : '.7rem',
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {displayUp}
          </motion.h2>
          <motion.h2
            className="absolute"
            animate={{
              y: completeOperation ? 15 : 40,
              color: completeOperation ? '#aca3a3' : '#ffffff',
              fontSize: completeOperation ? '.7rem' : '1.2rem',
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {displayDown}
          </motion.h2>
        </div>
      </div>
    </>
  );
}
