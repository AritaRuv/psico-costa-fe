import { create } from 'zustand'


export const usePatientStore = create<PatientState>((set) => ({
  patients: [],
  setPatients: (patients: Patient[]) => set({ patients })
}));

