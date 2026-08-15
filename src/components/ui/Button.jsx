const BASE =
  'text-base font-semibold rounded-lg px-5 py-3.5 border transition-all duration-150 cursor-pointer';

const VARIANTS = {
  primary:
    'w-full bg-accent text-text-primary border-transparent ' +
    'hover:bg-accent-hover hover:ring-[4px] hover:ring-[rgba(168,112,95,0.3)] hover:shadow-[0_10px_28px_-6px_rgba(219,185,140,0.45)] ' +
    'active:translate-y-px',
  secondary:
    'bg-transparent border-border text-text-secondary ' +
    'hover:border-sand hover:text-text-primary hover:ring-[3px] hover:ring-sand/18',
  link:
    'w-full bg-transparent border-transparent text-accent text-center py-2 ' +
    'hover:text-sand hover:bg-sand/10',
};

const Button = ({ variant = 'primary', children, className = '', ...rest }) => {
  return (
    <button className={`${BASE} ${VARIANTS[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;