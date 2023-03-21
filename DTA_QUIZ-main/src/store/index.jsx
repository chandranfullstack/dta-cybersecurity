import create from "zustand";

const useAppStore = create((set) => ({
  user_token: null,
  user_name: null,
  is_authenticated: false,
  selectedComponent: null,

  // Actions
  setUserNameAndToken: ({ token }) =>
    set(() => ({
      user_token: token,
      // user_name: name,
      is_authenticated: true,
    })),
  setIntroModalOff: () =>
    set(() => ({
      showIntroModal: false,
    })),
  removeUserNameAndToken: () =>
    set(() => ({
      user_token: null,
      // user_name: null,
      is_authenticated: false,
    })),

  setSelectedComponent: (data) => {
    set({ selectedComponent: data });
  },
}));

export default useAppStore;
