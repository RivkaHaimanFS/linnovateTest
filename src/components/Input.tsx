import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  id: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, ...rest }, ref) => (
    <div className="mb-2">
      <label htmlFor={id} className="block font-medium">
        {label}
      </label>
      <input
        id={id}
        ref={ref}
        className="w-full p-2 border rounded-lg"
        {...rest}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
);

Input.displayName = "Input";

export default Input;
