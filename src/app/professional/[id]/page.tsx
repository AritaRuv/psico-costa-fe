"use client";

import { getProfessionalById } from "@/services/professionalService";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfessionalPage() {
    
  const { id } = useParams() as { id: string };
  const [professional, setProfessional] = useState<Professional | null>(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null); 

  // const appointmentDummy = [{id:1, date: new Date(), patient: {id:1, firstName: 'John', lastName: 'Doe'}, professional: {id:1, firstName: 'John', lastName: 'Doe'}, office: {id:1, name: 'Office 1'}}, {id:2, date: new Date(), patient: {id:2, firstName: 'Jane', lastName: 'Smith'}, professional: {id:2, firstName: 'Jane', lastName: 'Smith'}, office: {id:2, name: 'Office 2'}}];
  
  const fetchProfessionalByID = async (id: string) => {
    try {
      const professionalData = await getProfessionalById(id);
      setProfessional(professionalData);
      setError(null);
    } catch (error) {
      console.error("Error al cargar los datos del profesional:", error);
      setError("No se pudo cargar el profesional.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProfessionalByID(id);
    }
  }, [id]);

 
  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Datos del Profesional</h1>
      {professional ? (
        <div>
          <p><strong>Nombre:</strong> {professional.firstName} {professional.lastName}</p>
          <p><strong>Email:</strong> {professional.email || "No disponible"}</p>
          <p><strong>Teléfono:</strong> {professional.phoneNumber}</p>
          <p><strong>Especialidad:</strong> {professional.specialty}</p>
          <p><strong>Oficina:</strong> {professional.office ? professional.office.name :  "No asignado"}</p>
          <h2>Citas del Profesional</h2>
          {professional.appointments && professional.appointments.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Paciente</th>
                  <th>Oficina</th>
                </tr>
              </thead>
              <tbody>
                {professional.appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>{appointment.id}</td>
                    <td>{new Date(appointment.date).toLocaleString()}</td>
                    <td>{`${appointment.patient.firstName} ${appointment.patient.lastName}`}</td>
                    <td>{appointment.office.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No hay citas asignadas.</p>
          )}
        </div>
      ) : (
        <p>No se encontraron datos del profesional.</p>
      )}
    </div>
  );
}

