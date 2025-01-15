import { create } from 'zustand'


export const useHealthInsuranceStore = create<HealthInsuranceState>((set) => ({
  healthInsurances: [],
  setHealthInsurances: (healthInsurances: HealthInsurance[]) => set({ healthInsurances })
}));

