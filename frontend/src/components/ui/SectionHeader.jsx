const SectionHeader = ({
  title,
  action,
}) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="text-lg font-semibold">
        {title}
      </h2>

      {action && (
        <button
          type="button"
          className="text-sm text-[var(--muted)]"
        >
          {action}
        </button>
      )}
    </div>
  );
};

export default SectionHeader;