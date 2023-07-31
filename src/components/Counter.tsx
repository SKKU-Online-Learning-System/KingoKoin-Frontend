import { Card, CardContent, CardHeader } from "@mui/material";
import { useEffect, useState } from "react";

interface CounterCardProps {
  label: string;
  target?: number;
  deltaPlus?: boolean;
  delta?: number;
  duration?: number;
  className?: string;
}

const CounterCard = ({
  label,
  target = 0,
  deltaPlus = true,
  delta = 0,
  duration = 1000,
  className,
}: CounterCardProps) => {
  const [count, setCount] = useState(0);
  const timeInterval = duration / target;

  const counterInc = () => {
    const counter = setTimeout(() => {
      if (count < target) setCount(count + 1);
      else clearInterval(counter);
    }, timeInterval);
  };

  useEffect(counterInc, [count, target, timeInterval]);

  return (
    <>
      <Card className={className}>
        <CardHeader
          title={label}
          titleTypographyProps={{ variant: "label-l" }}
          className="pb-0"
        />
        <CardContent>
          <div className="flex items-end">
            <div className="text-6xl font-regular font-noto-sans-kr text-primary">
              {count}
            </div>
            <div
              className={deltaPlus ? "flex text-primary" : "flex text-error"}
            >
              {delta}
              {deltaPlus ? "▲" : "▼"}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default CounterCard;
