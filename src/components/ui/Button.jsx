/**
 * variant: 'primary' | 'secondary' | 'link'
 * primary   -> solid dusty rose, used for the main CTA
 * secondary -> flat outline only, used for lower-emphasis actions
 * link      -> text-only, used for "already have an account" style links
 */
const BASE =
  'text-base font-semibold rounded-lg px-5 py-3.5 border transition-all duration-150 cursor-pointer';

const VARIANTS = {
  primary:
    'w-full bg-accent text-text-primary border-transparent ' +
    'hover:bg-accent-hover hover:shadow-[0_0_0_4px_rgba(168,112,95,0.3),0_10px_28px_-6px_rgba(219,185,140,0.45)] ' +
    'active:translate-y-px',
  secondary:
    'bg-transparent border-border text-text-secondary ' +
    'hover:border-sand hover:text-text-primary hover:shadow-[0_0_0_3px_rgba(219,185,140,0.18)]',
  link:
    'w-full bg-transparent border-transparent text-accent text-center py-2 ' +
    'hover:text-sand hover:bg-[rgba(219,185,140,0.1)]',
};

export default function Button({ variant = 'primary', children, className = '', ...rest }) {
  return (
    <button className={`${BASE} ${VARIANTS[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
