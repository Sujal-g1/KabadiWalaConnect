const Card = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`
        rounded-3xl
        border border-[var(--border)]
        bg-[var(--surface)]
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;