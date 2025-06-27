import { Button } from './Button';
import { useContext } from 'react';
// Context
import { ModeContext } from '../context/ModeContext';

export function CalculatorButtons({ basicButtons, scientificButtons }) {
  const { mode } = useContext(ModeContext);

  return (
    <>
      <div
        className={`
          grid grid-cols-3 gap-[.3rem] transition-all duration-200
          ${
            mode === 'Scientific' // buttons for scientific mode
              ? 'w-[15.5rem] opacity-100 mr-[.5rem] z-0'
              : 'w-0 opacity-0 z-[-1]'
          }
        `}
      >
        {scientificButtons.map((btn) => (
          <Button
            key={btn.icon}
            icon={btn.icon}
            operator={btn.operator}
            action={btn.action}
          />
        ))}
      </div>

      <div className="grid grid-cols-4 gap-[.3rem] w-[17rem]">
        {basicButtons.map((btn) => (
          <Button
            key={btn.icon}
            icon={btn.icon}
            operator={btn.operator}
            action={btn.action}
          />
        ))}
      </div>
    </>
  );
}
