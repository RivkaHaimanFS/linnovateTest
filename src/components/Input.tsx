import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...rest }, ref) => (
    <div className="mb-2">
      <label className="block font-medium">{label}</label>
      <input ref={ref} className="w-full p-2 border rounded-lg" {...rest} />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
);

Input.displayName = "Input"; // הכרחי בגלל forwardRef

export default Input;
