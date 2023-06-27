import { useEffect, useState } from "react";

const Counter = ({ start, end, duration }) => {
  const [count, setCount] = useState(start);
  const timeInterval = duration / (end - start);

  const counterInc = () => {
    const counter = setTimeout(() => {
      if (count < end) setCount(count + 1);
      else clearInterval(counter);
    }, timeInterval);
  };

  useEffect(counterInc, [count, end, timeInterval]);

  return (
    <div className="text-6xl font-bold font-noto-sans-kr text-primary">
      {count}
    </div>
  );
};

export default Counter;
