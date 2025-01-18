'use client'

import { getOffices } from "@/services/officeService";
import { useOfficeStore } from "@/store/officeStore";
import { useEffect, useState } from "react";

export default function OfficesPage() {
  
  const [loading, setLoading] = useState(false);

  // Fetch de consultorios
  const offices = useOfficeStore((state) => state.offices);
  const setOffices = useOfficeStore((state) => state.setOffices);
  
  const fetchOffices = async () => {
    try {
      const officesData = await getOffices();
      setOffices(officesData); // Establecemos los consultorios en el store
    } catch (error) {
      console.error("Error al cargar los consultorios:", error);
    }
  };

  // useEffect para cargar consultorios solo cuando esté vacío
  useEffect(() => {
    if (offices.length === 0) {
      fetchOffices();  // Llamamos a la API para obtener los consultorios
    }
  }, [offices.length, setOffices]);

  // useEffect para reaccionar cuando `offices` cambia
  useEffect(() => {
    if (offices.length > 0) {
      console.log("Consultorios cargados: ", offices);
    }
  }, [offices]); // Este useEffect se dispara cuando `offices` cambia


  // Renderiza la tabla de consultorios
  const officesTable = (offices: Office[]) => {
    return offices.map((office: Office) => (
      <tr key={office.id}>
        <td>{office.name}</td>
        <td>{office.location}</td>
        {/* <td>{office.professionals ? office.professionals.lastName : "-"}</td>
        <td>{office.appointments ? office.appointments : "-"}</td> */}
      </tr>
    ));
  };

  // Render del componente
  return (
    <div>
      <h1>Lista de Consultorios</h1>

      {/* Mostrar mensaje de carga */}
      {loading ? (
        <p>Cargando consultorios...</p>
      ) : (
        // Mostrar la tabla solo si hay consutlorios
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Ubicación</th>
              <th>Profecionales</th>
              <th>Citas</th>
            </tr>
          </thead>
          <tbody>{officesTable(offices)}</tbody>
        </table>
      )}

      {/* Mostrar mensaje si no hay consultorios */}
      {offices.length === 0 && <p>No hay consultorios disponibles.</p>}
    </div>
  );
}