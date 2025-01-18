import { create } from 'zustand'


export const useOfficeStore = create<OfficeState>((set) => ({
  offices: [],
  setOffices: (offices: Office[]) => set({ offices })
}));

