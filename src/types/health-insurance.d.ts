type HealthInsurance = BaseEntityType & {
    id: number;
    name: string;
    coverageDetails: string;
    patients?: Patient[];
  };
