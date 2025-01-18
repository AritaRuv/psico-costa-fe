'use client'

import { getProfessionals } from "@/services/professionalService";
import { useProfessionalStore } from "@/store/professionalStore";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProfessionalsPage() {
  
  const [loading, setLoading] = useState(false);

  // Fetch de profesionales
  const professionals = useProfessionalStore((state) => state.professionals)
  const setProfessionals = useProfessionalStore((state) => state.setProfessionals)
  
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

  // useEffect para reaccionar cuando `profesionales` cambia
  useEffect(() => {
    if (professionals.length > 0) {
      console.log("Professional cargados: ", professionals);
    }
  }, [professionals]); // Este useEffect se dispara cuando `profesional` cambia


  // Renderiza la tabla de profesionales
  const professionalTable = (professionals: Professional[]) => {
    return professionals.map((professional) => (
      <Link href={`/professional/${professional.id}`} key={professional.id}>
        <tr key={professional.id}>
          <td>{professional.firstName}</td>
          <td>{professional.lastName}</td>
          <td>{professional.email ? professional.email : "-"}</td>
          <td>{professional.phoneNumber}</td>
          <td>{professional.specialty}</td>
          {/* <td>{professional.appointments ? professional.appointments : "-"}</td>
        <td>{professional.offices ? professional.offices : "-"}</td> */}
        </tr>
      </Link>      
    ));
  };

  // Render del componente
  return (
    <div>
      <h1>Lista de Profesionales</h1>

      {/* Mostrar mensaje de carga */}
      {loading ? (
        <p>Cargando profesionales...</p>
      ) : (
        // Mostrar la tabla solo si hay profesionales
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Especialidad</th>
              <th>Citas</th>
              <th>Consultorio</th>
            </tr>
          </thead>
          <tbody>{professionalTable(professionals)}</tbody>
        </table>
      )}

      {/* Mostrar mensaje si no hay profesionales */}
      {professionals.length === 0 && <p>No hay profesionales disponibles.</p>}
    </div>
  );
}