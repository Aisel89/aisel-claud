import { Transition, Variants } from "framer-motion";

export const transitionProps: Transition = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1]
};

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 }
};

export const staggerContainer: Variants = {
  initial: { opacity: 0 },
  whileInView: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};
