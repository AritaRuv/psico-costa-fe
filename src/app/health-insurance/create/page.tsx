"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createHealthInsurance } from "@/services/healthInsuranceService"; 

export default function CreateProfessionalPage() {
  const [formData, setFormData] = useState({ name: "", coverageDetails: "", patients: []});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createHealthInsurance(formData);
      alert("Obra social creada exitosamente");
      router.push("/"); 
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Crear Obra social</h1>
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
          <label className="block text-sm font-medium mb-1" htmlFor="coverageDetails">
            Cobertura
          </label>
          <input
            type="text"
            id="coverageDetails"
            name="coverageDetails"
            value={formData.coverageDetails}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          {loading ? "Creando..." : "Crear Obra social"}
        </button>
      </form>
    </div>
  );
}
