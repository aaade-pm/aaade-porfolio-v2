"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
  timeZone: string;
};

function resolveTimeZone(timeZone: string): string {
  try {
    new Intl.DateTimeFormat([], { timeZone }).format(new Date());
    return timeZone;
  } catch {
    return "UTC";
  }
}

export function LagosClock({ timeZone }: Props) {
  const zone = useMemo(() => resolveTimeZone(timeZone), [timeZone]);
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const tick = () => {
      setTime(
        new Intl.DateTimeFormat([], {
          timeZone: zone,
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(new Date()),
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [zone]);

  return (
    <span className="ml-2 font-medium text-primary tabular-nums">{time}</span>
  );
}
