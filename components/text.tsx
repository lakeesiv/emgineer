"use client";

import { cn } from "lib/utils";
import { FC } from "react";

interface TitleProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  animate?: boolean;
}

export const Title: FC<TitleProps> = ({
  variant = "h1",
  size = "lg",
  children,
  animate = false,
  ...props
}) => {
  const Comp = variant;

  const textClass =
    size === "sm"
      ? "text-4xl md:text-5xl/[3.5rem]"
      : size === "md"
      ? "text-5xl md:text-6xl/[4rem]"
      : size === "lg"
      ? "text-6xl md:text-7xl/[5rem]"
      : "text-5xl md:text-6xl/[4rem]";

  const animateClass = animate ? "animate-fade-up opacity-0 " : "";

  const className = cn(
    `${textClass}  ${animateClass} bg-gradient-to-br from-emma-primary to-emma-secondary bg-clip-text text-center font-extrabold tracking-[-0.02em] text-transparent drop-shadow-sm pb-[0.8rem] `,
    props.className
  );

  return (
    <Comp
      {...props}
      className={className}
      style={
        animate
          ? { animationDelay: "0.20s", animationFillMode: "forwards" }
          : {}
      }
    >
      {children}
    </Comp>
  );
};

interface DescriptionProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  children: React.ReactNode;
}

export const Description: FC<DescriptionProps> = ({ children, ...props }) => (
  <p
    {...props}
    className={cn(
      "mt-6 animate-fade-up text-center text-muted-foreground/80 opacity-0 md:text-xl",
      props.className
    )}
    style={{ animationDelay: "0.30s", animationFillMode: "forwards" }}
  >
    {children}
  </p>
);
