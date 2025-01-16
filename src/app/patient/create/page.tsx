"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createPatient } from "@/services/patientService";
import { useHealthInsuranceStore } from "@/store/health-insuranceStore";
import { getHealthInsurances } from "@/services/healthInsuranceService";

export default function CreatePatientPage() {
  
  const [formData, setFormData] = useState({ firstName: "", lastName: "", birthDate: undefined, email: "", phoneNumber: "", healthInsurance: undefined});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const healthInsurances = useHealthInsuranceStore((state) => state.healthInsurances)
  const setHealthInsurances = useHealthInsuranceStore((state) => state.setHealthInsurances)

  const fetchHealthInsurances = async () => {
    try {
      const healthInsurancesData = await getHealthInsurances();
      setHealthInsurances(healthInsurancesData); // Establecemos los obras sociales en el store
    } catch (error) {
      console.error("Error al cargar las obras sociales:", error);
    }
  };

    // useEffect para cargar obras sociales solo cuando esté vacío
    useEffect(() => {
      if (healthInsurances.length === 0) {
        fetchHealthInsurances();  // Llamamos a la API para obtener las obras sociales
      }
    }, [healthInsurances.length, setHealthInsurances]);
  
    // useEffect para reaccionar cuando `healthInsurances` cambia
    useEffect(() => {
      if (healthInsurances.length > 0) {
        console.log("Obras sociales cargadas: ", healthInsurances);
      }
    }, [healthInsurances]); // Este useEffect se dispara cuando `healthInsurances` cambia
  
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createPatient(formData);
      alert("Paciente creado exitosamente");
      router.push("/"); 
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Crear Paciente</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Nombre
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="lastname">
            Apellido
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="birthDate">
            Fecha de nacimiento
          </label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="phoneNumber">
            Numero de telefono
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="healthInsurance">
            Obra social
          </label>
          <select
            id="healthInsurance"
            name="healthInsurance"
            value={formData.healthInsurance}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-md"
            >
            <option value="" disabled>
              Seleccione una obra social
            </option>
            {healthInsurances.map((insurance) => (
              <option key={insurance.id} value={insurance.id}>
                {insurance.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          {loading ? "Creando..." : "Crear Paciente"}
        </button>
      </form>
    </div>
  );
}
