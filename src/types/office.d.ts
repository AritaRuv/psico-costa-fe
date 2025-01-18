type Office = BaseEntityType & {
    id: number;
    name: string;
    location: string;
    professionals?: Professional[];
    appointments?: Appointment[];
  };
