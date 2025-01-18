
import axiosInstance from '@/lib/api'; 

export const getProfessionals = async (): Promise<Professional[]> => {
  const response = await axiosInstance.get('/professionals');
  return response.data;
};

export const getProfessionalById = async (id: string): Promise<Professional> => {
  const response = await axiosInstance.get(`/professionals/${id}`);
  return response.data;
};

export const createProfessional = async (professional: Partial<Professional>): Promise<Professional> => {
  const response = await axiosInstance.post('/professionals', professional);
  return response.data;
};

export const deleteProfessional = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/professionals/${id}`);
};
