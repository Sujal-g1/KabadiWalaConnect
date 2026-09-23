import { create } from "zustand";

const getStoredUser = () => {
  try {
    const storedUser = localStorage.getItem(
      "kabadiwala_user"
    );

    return storedUser
      ? JSON.parse(storedUser)
      : null;
  } catch {
    return null;
  }
};

const useAuthStore = create((set) => ({
  user: getStoredUser(),

  setUser: (user) => {
    localStorage.setItem(
      "kabadiwala_user",
      JSON.stringify(user)
    );

    set({ user });
  },

  clearUser: () => {
    localStorage.removeItem("kabadiwala_user");

    set({
      user: null,
    });
  },
}));

export default useAuthStore;