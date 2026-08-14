import { fieldControlClasses, fieldLabelClasses } from './fieldStyles';

export default function Select({
  id,
  label,
  required = false,
  options,
  placeholder = 'Select...',
  ...selectProps
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={id} className={fieldLabelClasses}>
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      <div className="relative">
        <select
          id={id}
          className={`${fieldControlClasses} appearance-none pr-9 font-semibold cursor-pointer`}
          {...selectProps}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary text-xs">
          ▾
        </span>
      </div>
    </div>
  );
}
