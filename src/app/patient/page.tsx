'use client'

import { getPatients } from "@/services/patientService";
import { usePatientStore } from "@/store/patientStore";
import { useEffect, useState } from "react";

export default function PatientsPage() {
  
  const [loading, setLoading] = useState(false);

  // Fetch de pacientes
  const patients = usePatientStore((state) => state.patients);
  const setPatients = usePatientStore((state) => state.setPatients)
  
  const fetchPatients = async () => {
    try {
      const patientsData = await getPatients();
      setPatients(patientsData); // Establecemos los pacientes en el store
    } catch (error) {
      console.error("Error al cargar los pacientes:", error);
    }
  };

  // useEffect para cargar pacientes solo cuando esté vacío
  useEffect(() => {
    if (patients.length === 0) {
      fetchPatients();  // Llamamos a la API para obtener los pacientes
    }
  }, [patients.length, setPatients]);

  // useEffect para reaccionar cuando `patients` cambia
  useEffect(() => {
    if (patients.length > 0) {
      console.log("Pacientes cargados: ", patients);
    }
  }, [patients]); // Este useEffect se dispara cuando `patients` cambia


  // Renderiza la tabla de pacientes
  const patientsTable = (patients: Patient[]) => {
    return patients.map((patient) => (
      <tr key={patient.id}>
        <td>{patient.firstName}</td>
        <td>{patient.lastName}</td>
        <td>{patient.email}</td>
        <td>{patient.phoneNumber}</td>
        <td>{patient.address || "Sin dirección"}</td>
        <td>{new Date(patient.birthDate).toLocaleDateString()}</td>
      </tr>
    ));
  };

  // Render del componente
  return (
    <div>
      <h1>Lista de Pacientes</h1>

      {/* Mostrar mensaje de carga */}
      {loading ? (
        <p>Cargando pacientes...</p>
      ) : (
        // Mostrar la tabla solo si hay pacientes
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Direccion</th>
              <th>Fecha de nacimiento</th>
            </tr>
          </thead>
          <tbody>{patientsTable(patients)}</tbody>
        </table>
      )}

      {/* Mostrar mensaje si no hay pacientes */}
      {patients.length === 0 && <p>No hay pacientes disponibles.</p>}
    </div>
  );
}