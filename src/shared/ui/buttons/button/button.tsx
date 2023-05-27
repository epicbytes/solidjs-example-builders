import { cva, VariantProps } from "class-variance-authority";
import { JSX } from "solid-js";
import { tw } from "typewind";

const buttonDS = cva(tw.normal_case, {
  variants: {
    intent: {
      default: tw.btn,
      yellow: tw.btn.btn_ghost.hover(tw.btn_warning),
    },
    size: {
      small: tw.btn_sm,
    },
    variant: {
      outline: tw.btn.btn_outline,
    },
  },
  compoundVariants: [
    {
      intent: "default",
      size: "small",
      variant: "outline",
    },
  ],
  defaultVariants: {
    intent: "default",
    size: "small",
    variant: "outline",
  },
});

export interface ButtonProps
  extends JSX.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonDS> {}

export const Button = ({ intent, variant, size, ...props }: ButtonProps) => (
  <button
    class={buttonDS({ intent, variant, size })}
    type={"button"}
    {...props}
  />
);
