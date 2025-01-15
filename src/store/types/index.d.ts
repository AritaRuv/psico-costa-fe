
type PatientState = {
    patients: Patient[];
    setPatients: (patients: Patient[]) => void;
  }

type ProfessionalState = {
  professionals: Professional[];
  setProfessionals: (professional: Professional[]) => void;
}

type HealthInsuranceState = {
  healthInsurances: HealthInsurance[];
  setHealthInsurances: (healthInsurances: HealthInsurance[]) => void;
}