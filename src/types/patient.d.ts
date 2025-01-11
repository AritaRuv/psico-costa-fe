type Patient = BaseEntityType & {
    id: number;
    firstName: string;
    lastName: string;
    email?: string;
    phoneNumber: string;
    birthDate: Date;
    address?: string;
    appointments?: Appointment[];
    healthInsurance?: HealthInsurance;
  };
  