import { create } from 'zustand'


export const useProfessionalStore = create<ProfessionalState>((set) => ({
  professionals: [],
  setProfessionals: (professionals: Professional[]) => set({ professionals })
}));

