import Image from "next/image";


export default function Home() {

  // const patients = usePatientStore((state) => state.patients);
  // const setPatients = usePatientStore((state) => state.setPatients)
  
  // const fetchPatients = async () => {
  //   try {
  //     const patientsData = await getPatients();
  //     setPatients(patientsData); // Establecemos los pacientes en el store
  //   } catch (error) {
  //     console.error("Error al cargar los pacientes:", error);
  //   }
  // };

  // // useEffect para cargar pacientes solo cuando esté vacío
  // useEffect(() => {
  //   if (patients.length === 0) {
  //     fetchPatients();  // Llamamos a la API para obtener los pacientes
  //   }
  // }, [patients.length, setPatients]);

  // // useEffect para reaccionar cuando `patients` cambia
  // useEffect(() => {
  //   if (patients.length > 0) {
  //     console.log("Pacientes cargados: ", patients);
  //   }
  // }, [patients]); // Este useEffect se dispara cuando `patients` cambia

  return (
    <div className=" items-center justify-items-center pt-20">
      <main className="flex">
            <Image
              src="/psicocosta.jpg"
              alt="Psicocosta"
              width={600}
              height={600}
            />
      </main>
    </div>
  );
}
