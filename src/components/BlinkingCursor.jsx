import { motion } from 'framer-motion';

export function BlinkingCurson({ completeOperation }) {
  if (completeOperation) return null; // hide cursor if there is already a result

  return (
    <motion.span
      animate={{
        opacity: [1, 0, 1],
      }}
      transition={{ duration: 1, repeat: Infinity }}
    >
      _
    </motion.span>
  );
}
