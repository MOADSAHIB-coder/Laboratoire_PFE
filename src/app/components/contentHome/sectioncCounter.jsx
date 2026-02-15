import { useEffect, useState } from "react";

function Counter({ value, label, start }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let current = 0;
    const increment = Math.ceil(value / 60);

    const interval = setInterval(() => {
      current += increment;
      if (current >= value) {
        current = value;
        clearInterval(interval);
      }
      setCount(current);
    }, 30);

    return () => clearInterval(interval);
  }, [start, value]);

  return (
    <div className="text-center flex flex-col items-center">
      <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mt-2">
        {count}
      </h2>
      <p className="mt-1 sm:mt-2 text-lg sm:text-xl md:text-2xl font-semibold text-white">
        {label}
      </p>
    </div>
  );
}

export default Counter;
