import create from 'zustand';

export const useStore = create(set => ({
  signInToast: false,
  setSignInToast: () => {
    set({ signInToast: true });
    setTimeout(function() {
      set({ signInToast: false });
    }, 4000);
  }
}));