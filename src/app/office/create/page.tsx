"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProfessionals } from "@/services/professionalService"; 
import { useProfessionalStore } from "@/store/professionalStore";
import { createOffice } from "@/services/officeService";
import { FormDataCreateOffice } from "../interfaces";


export default function CreateOfficePage() {

  const [formData, setFormData] = useState<FormDataCreateOffice>({ name: "", location: "", professionals: []});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const professionals = useProfessionalStore((state) => state.professionals);
  const setProfessionals = useProfessionalStore((state) => state.setProfessionals);

  const fetchProfessionals = async () => {
    try {
      const professionalsData = await getProfessionals();
      setProfessionals(professionalsData); // Establecemos los profesionales en el store
    } catch (error) {
      console.error("Error al cargar los profesionales:", error);
    }
  };

  // useEffect para cargar profesionales solo cuando esté vacío
  useEffect(() => {
    if (professionals.length === 0) {
      fetchProfessionals();  // Llamamos a la API para obtener los profesionales
    }
  }, [professionals.length, setProfessionals]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
  
    if (type === "checkbox") {
      // Manejo de checkboxes
      const id = Number(value); // Convertimos el valor del checkbox a un número
      setFormData((prev) => {
        const isChecked = prev.professionals.includes(id);
        return {
          ...prev,
          professionals: isChecked
            ? prev.professionals.filter((profId) => profId !== id) // Desmarcar
            : [...prev.professionals, id], // Marcar
        };
      });
    } else {
      // Manejo de otros inputs (texto, email, etc.)
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createOffice(formData);
      alert("Consultorio creado exitosamente");
      router.push("/"); 
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Crear Consultorio</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="location">
            Ubicación
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Profesionales disponibles
          </label>
          <div className="space-y-2">
            {professionals.map((professional) => (
              <div key={professional.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={professional.id.toString()}
                  value={professional.id}
                  checked={formData.professionals.includes(professional.id)}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor={`professional-${professional.id}`}>
                  {professional.firstName} {professional.lastName}
                </label>
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          {loading ? "Creando..." : "Crear Consultorio"}
        </button>
      </form>
    </div>
  );
}
