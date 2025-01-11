import { create } from 'zustand'


export const useBearStore = create<PatientState>((set) => ({
  patients: [],
  setPatients: (patients: Patient[]) => set({ patients })
}));

