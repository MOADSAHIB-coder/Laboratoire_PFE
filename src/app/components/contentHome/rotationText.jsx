import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

function RotationText({ items, directions, interval = 5000, className = "" }) {
  const [currentIndex, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length);
    }, interval);
    return () => clearInterval(id);
  }, [items.length, interval]);

  return (
    <div className="overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className={className}
          initial={{
            x: directions[currentIndex % directions.length].x,
            y: directions[currentIndex % directions.length].y,
            opacity: 0,
          }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          exit={{ x: 0, y: -40, opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {" "}
          {items[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default RotationText;
