import { TextareaHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  register?: UseFormRegisterReturn;
  id?: string;
}

const Textarea = ({ label, error, register, id, ...rest }: TextareaProps) => (
  <div className="mb-4">
    <label htmlFor={id} className="block font-medium">
      {label}
    </label>
    <textarea
      id={id}
      {...register}
      {...rest}
      className="w-full p-2 border rounded-lg resize-none h-24"
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

export default Textarea;
