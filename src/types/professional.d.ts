type Professional = BaseEntityType & {
    id: number;
    firstName: string;
    lastName: string;
    email?: string;
    phoneNumber: string;
    specialty: string;
    appointments?: Appointment[];
    office?: Office;
  };
