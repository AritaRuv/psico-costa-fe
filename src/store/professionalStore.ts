import { create } from 'zustand'


export const useProfessionalStore = create<ProfessionalState>((set) => ({
  professional: [],
  setProfessional: (professional: Professional[]) => set({ professional })
}));

