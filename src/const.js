import { motion } from "framer-motion";

export const spacing = { xs: 2, sm: 4, md: 6, lg: 8 };

export const gap = { xs: 2, md: 4, xl: 4 };

export const vSpacing = { xs: 8, sm: 10, lg: "var(--vSpacing)" };

export const transition = { bounce: 0, duration: 1.5 };

export const hidden = {
  sm: { display: { xs: "none", sm: "table-cell" } },
  md: { display: { xs: "none", md: "table-cell" } },
  lg: { display: { xs: "none", lg: "table-cell" } },
  xl: { display: { xs: "none", xl: "table-cell" } },
};

export const modalPaperProps = {
  sx: {
    borderRadius: (e) => ({ xs: `${e.shape.borderRadius * 4}px ${e.shape.borderRadius * 4}px 0 0`, md: 8 }),
    right: 0,
    alignSelf: { xs: "end", md: "center" },
    m: 0,
    width: { xs: "100%", sm: "auto" },
  },
};

export const landingMotionProps = {
  component: motion.div,
  initial: "closed",
  viewport: {
    once: true,
    amount: 0.05,
  },

  whileInView: "open",
  variants: {
    open: {
      opacity: 1,
      y: 0,
    },
    closed: { opacity: 0, y: 100 },
  },
  transition: { type: "spring", ...transition },
};
