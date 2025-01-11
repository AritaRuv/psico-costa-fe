type Patient = BaseEntityType & {
    id: number;
    firstName: string;
    lastName: string;
    email?: string;
    phoneNumber: string;
    address?: string;
    appointments?: Appointment[];
    healthInsurance?: HealthInsurance;
  };
  