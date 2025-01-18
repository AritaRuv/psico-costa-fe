
import { FormDataCreateOffice } from '@/app/office/interfaces';
import axiosInstance from '@/lib/api'; 

export const getOffices = async (): Promise<Office[]> => {
  const response = await axiosInstance.get('/offices');
  return response.data;
};

export const getOfficeById = async (id: number): Promise<Office> => {
  const response = await axiosInstance.get(`/offices/${id}`);
  return response.data;
};

export const createOffice = async (office: FormDataCreateOffice): Promise<Office> => {
  const response = await axiosInstance.post('/offices', office);
  return response.data;
};

export const deleteOffice = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/offices/${id}`);
};
