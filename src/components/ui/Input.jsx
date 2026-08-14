import { fieldControlClasses, fieldLabelClasses } from './fieldStyles';

/**
 * Generic labeled input. Used for text, email, tel, and password fields.
 * Kept dumb on purpose — no validation logic lives here, only presentation.
 */
export default function Input({
  id,
  label,
  required = false,
  error,
  ...inputProps
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={id} className={fieldLabelClasses}>
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      <input id={id} className={fieldControlClasses} {...inputProps} />
      {error && <span className="text-xs text-danger">{error}</span>}
    </div>
  );
}
