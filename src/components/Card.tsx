import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={
        "bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl " +
        className
      }
    >
      {children}
    </div>
  );
}
