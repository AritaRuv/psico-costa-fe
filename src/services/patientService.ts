
import axiosInstance from '@/lib/api'; 


export const getPatients = async (): Promise<Patient[]> => {
  const response = await axiosInstance.get('/patients');
  return response.data;
};

export const getPatientById = async (id: number): Promise<Patient> => {
  const response = await axiosInstance.get(`/patients/${id}`);
  return response.data;
};

export const createPatient = async (patient: Partial<Patient>): Promise<Patient> => {
  const response = await axiosInstance.post('/patients', patient);
  return response.data;
};

export const deletePatient = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/patients/${id}`);
};
