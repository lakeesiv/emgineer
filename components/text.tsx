import { FC } from "react";

interface AnimatedTitleProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: React.ReactNode;
}

export const AnimatedTitle: FC<AnimatedTitleProps> = ({
  variant = "h1",
  children,
  ...props
}) => {
  const Comp = variant;

  return (
    <Comp
      className="animate-fade-up bg-gradient-to-br from-emma-primary to-emma-secondary bg-clip-text text-center text-6xl font-extrabold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-7xl/[5rem] pb-[0.8rem]"
      style={{ animationDelay: "0.20s", animationFillMode: "forwards" }}
      {...props}
    >
      {children}
    </Comp>
  );
};

interface AnimatedDescriptionProps {
  children: React.ReactNode;
}

export const AnimatedDescription: FC<AnimatedDescriptionProps> = ({
  children,
  ...props
}) => (
  <p
    className="mt-6 animate-fade-up text-center text-muted-foreground/80 opacity-0 md:text-xl"
    style={{ animationDelay: "0.30s", animationFillMode: "forwards" }}
    {...props}
  >
    {children}
  </p>
);
