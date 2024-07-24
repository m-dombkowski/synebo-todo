import { Variants } from "framer-motion";

export const anim = (variants: Variants, custom: number | null) => {
  return {
    initial: "initial",
    animate: "open",
    open: "open",
    exit: "exit",
    variants,
    custom,
  };
};

export const slideUp = {
  initial: { y: "25px", opacity: "0" },
  open: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: 0.75 * i },
  }),
  exit: {
    y: "25px",
    opacity: 0,
  },
};
