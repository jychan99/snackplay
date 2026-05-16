import { create } from "zustand";

type MobileMenuState = {
  open: Boolean;
  openMenu: () => void;
  closeMenu: () => void;
};

export const useMobileMenuStore = create<MobileMenuState>((set) => ({
  open: false,
  openMenu: () =>
    set({
      open: true,
    }),
  closeMenu: () =>
    set({
      open: false,
    }),
}));
