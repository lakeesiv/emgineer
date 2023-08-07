import { FC } from "react";

interface AnimatedTitleProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const AnimatedTitle: FC<AnimatedTitleProps> = ({
  variant = "h1",
  size = "lg",
  children,
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

  return (
    <Comp
      className={`${textClass}  animate-fade-up bg-gradient-to-br from-emma-primary to-emma-secondary bg-clip-text text-center font-extrabold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm pb-[0.8rem] `}
      style={{ animationDelay: "0.20s", animationFillMode: "forwards" }}
      {...props}
    >
      {children}
    </Comp>
  );
};

interface AnimatedDescriptionProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
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
