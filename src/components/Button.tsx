interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger"; // מאפשר להגדיר סגנונות שונים
}

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...rest
}: ButtonProps) => {
  const baseStyles =
    "px-4 py-2 rounded-lg font-semibold transition duration-300 cursor-pointer";

  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
