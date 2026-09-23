const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const variants = {
    primary:
      "bg-[var(--primary)] text-[var(--primary-foreground)]",

    secondary:
      "bg-[var(--surface-soft)] text-[var(--foreground)]",

    ghost:
      "bg-transparent text-[var(--muted)]",
  };

  return (
    <button
      type="button"
      className={`
        min-h-12
        rounded-2xl
        px-5
        font-medium
        transition
        active:scale-[0.98]
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;