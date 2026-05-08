import { motion } from 'framer-motion';
import { cn } from '../../lib/cn';

const variants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
};

const sizes = {
  sm: 'px-3 py-2 text-xs',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-sm',
};

const MOTION_PROPS = {
  whileHover: { y: -1 },
  whileTap: { scale: 0.98 },
  transition: { type: 'spring', stiffness: 400, damping: 28 },
};

export default function Button({
  variant = 'primary',
  size = 'md',
  as: As = 'button',
  className,
  children,
  ...props
}) {
  const classes = cn(variants[variant], sizes[size], className);

  if (As === 'button') {
    return (
      <motion.button {...MOTION_PROPS} className={classes} {...props}>
        {children}
      </motion.button>
    );
  }

  if (As === 'a') {
    return (
      <motion.a {...MOTION_PROPS} className={classes} {...props}>
        {children}
      </motion.a>
    );
  }

  return (
    <As className={classes} {...props}>
      {children}
    </As>
  );
}
