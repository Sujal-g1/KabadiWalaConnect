import DEMO_RECYCLERS from "../../data/recyclers";

const STORAGE_KEY = "kabadiwala_recyclers";

const safeRead = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);

    return Array.isArray(parsed)
      ? parsed
      : [];
  } catch (error) {
    console.error(
      "Failed to read recycler storage:",
      error
    );

    return [];
  }
};

const safeWrite = (recyclers) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(recyclers)
  );

  window.dispatchEvent(
    new Event("kabadiwala:recycler-updated")
  );
};

export const getOnboardedRecyclers = () => {
  return safeRead().filter(
    (recycler) => recycler?.isDummy !== true
  );
};

export const getAllRecyclers = () => {
  const realRecyclers =
    getOnboardedRecyclers();

  const merged = [
    ...DEMO_RECYCLERS,
    ...realRecyclers,
  ];

  const unique = new Map();

  merged.forEach((recycler) => {
    if (recycler?.id) {
      unique.set(recycler.id, recycler);
    }
  });

  return Array.from(unique.values());
};

export const saveRecycler = (
  recycler
) => {
  if (!recycler?.id) {
    throw new Error(
      "Recycler id is required."
    );
  }

  const current = safeRead();

  const next = current.filter(
    (item) =>
      item.id !== recycler.id
  );

  next.push({
    ...recycler,
    isDummy: false,
    source:
      recycler.source ||
      "onboarding",
  });

  safeWrite(next);

  return recycler;
};

export const removeDemoRecyclers = () => {
  const real =
    getOnboardedRecyclers();

  safeWrite(real);

  return real;
};