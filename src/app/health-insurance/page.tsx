'use client'

import { getHealthInsurances } from "@/services/healthInsuranceService";
import { useHealthInsuranceStore } from "@/store/health-insuranceStore";
import { useEffect, useState } from "react";

export default function HealthInsurancesPage() {
  
  const [loading, setLoading] = useState(false);

  // Fetch de obras sociales
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


  // Renderiza la tabla de obras sociales
  const healthInsuranceTable = (healthInsurances: HealthInsurance[]) => {
    return healthInsurances.map((healthInsurance) => (
      <tr key={healthInsurance.id}>
        <td>{healthInsurance.name}</td>
        <td>{healthInsurance.coverageDetails}</td>
      </tr>
    ));
  };

  // Render del componente
  return (
    <div>
      <h1>Lista de Obras sociales</h1>

      {/* Mostrar mensaje de carga */}
      {loading ? (
        <p>Cargando Obras sociales...</p>
      ) : (
        // Mostrar la tabla solo si hay obras sociales
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cobertura</th>
            </tr>
          </thead>
          <tbody>{healthInsuranceTable(healthInsurances)}</tbody>
        </table>
      )}

      {/* Mostrar mensaje si no hay obras sociales */}
      {healthInsurances.length === 0 && <p>No hay obras sociales disponibles.</p>}
    </div>
  );
}