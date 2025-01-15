
import axiosInstance from '@/lib/api'; 

export const getHealthInsurances = async (): Promise<HealthInsurance[]> => {
  const response = await axiosInstance.get('/health-insurances');
  return response.data;
};

export const getHealthInsurancesById = async (id: number): Promise<HealthInsurance> => {
  const response = await axiosInstance.get(`/health-insurances/${id}`);
  return response.data;
};

export const createHealthInsurance = async (healthInsurance: Partial<HealthInsurance>): Promise<HealthInsurance> => {
  const response = await axiosInstance.post('/health-insurances', healthInsurance);
  return response.data;
};

export const deleteHealthInsurance = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/health-insurances/${id}`);
};
