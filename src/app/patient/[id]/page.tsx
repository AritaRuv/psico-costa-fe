"use client";

import { getPatientById } from "@/services/patientService";
import { useParams } from "next/navigation"; // Cambiado de next/router a next/navigation
import { useEffect, useState } from "react";

export default function PatientPage() {
    
const { id } = useParams() as { id: string };
  const [patient, setPatient] = useState<Patient | null>(null); // Estado para almacenar los datos del paciente
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores

  // Función para obtener el paciente por ID
  const fetchPatientByID = async (id: string) => {
    try {
      const patientData = await getPatientById(id);
      setPatient(patientData);
      setError(null); // Limpiar errores si los datos se cargan correctamente
    } catch (error) {
      console.error("Error al cargar los datos del paciente:", error);
      setError("No se pudo cargar el paciente.");
    } finally {
      setLoading(false); // Finalizar la carga
    }
  };

  // useEffect para llamar a la API cuando "id" esté disponible
  useEffect(() => {
    if (id) {
      fetchPatientByID(id);
    }
  }, [id]); // Ejecutar cuando el "id" cambie

  // Renderización condicional basada en el estado
  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Datos del Paciente</h1>
      {patient ? (
        <div>
          <p><strong>ID:</strong> {patient.id}</p>
          <p><strong>Nombre:</strong> {patient.firstName} {patient.lastName}</p>
          <p><strong>Email:</strong> {patient.email || "No disponible"}</p>
          <p><strong>Teléfono:</strong> {patient.phoneNumber}</p>
          <p><strong>Fecha de nacimiento:</strong> {new Date(patient.birthDate).toLocaleDateString()}</p>
          {patient.address && <p><strong>Dirección:</strong> {patient.address}</p>}
        </div>
      ) : (
        <p>No se encontraron datos del paciente.</p>
      )}
    </div>
  );
}
