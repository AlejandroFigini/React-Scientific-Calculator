import { motion } from 'framer-motion';

export function Bubbles() {
  const bubbleParameters = Array.from({ length: 40 }, () => createBubbleParams());

  function createBubbleParams() {
    return {
      delay: Math.random() * 13,
      duration: 15 + Math.random() * 5,
      size: 5 + Math.random() * 7,
      left: Math.random() * 90,
      top: Math.random() * 90,
      moveX: (Math.random() - 0.5) * 30,
      moveY: (Math.random() - 0.5) * 30,
    };
  }

  function Bubble({ bubbleParameters }) {
    return (
      <motion.div
        className='bubbleShadow'
        style={{
          position: 'absolute',
          left: `${bubbleParameters.left}vw`,
          top: `${bubbleParameters.top}vh`,
          width: `${bubbleParameters.size}rem`,
          height: `${bubbleParameters.size}rem`,
          borderRadius: '50%',
          background: 'linear-gradient(to right, #f1f2b5, #135058)',
        }}
        animate={{
          opacity: [0, 0.4, 0],
          scale: [0.5, 1.2, 0.5],
          left: `${bubbleParameters.left + bubbleParameters.moveX}vw`,
          top: `${bubbleParameters.top - bubbleParameters.moveY}vh`,
        }}
        transition={{
          duration: bubbleParameters.duration,
          ease: 'easeInOut',
          delay: bubbleParameters.delay,
          repeat: Infinity,
          repeatType: 'loop',
        }}
      />
    );
  }

  return (
    <>
      {bubbleParameters.map((param, i) => (
        <Bubble key={i} bubbleParameters={param} />
      ))}
    </>
  );
}
