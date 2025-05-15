import type { Patient } from "../types"
import PatientItem from "./PatientItem"
import { usePatientListStore } from "../store"
import { toast } from 'react-toastify';
type PatientDetailsProps = {
    patient: Patient
}


export default function PatientDetails({ patient }: PatientDetailsProps) {

    const {deletePatient, activeUserID} = usePatientListStore()
    const handleDelete = (id: string)=> {
        deletePatient(patient.id)
        toast.info('Paciente Eliminado')
    }

    return (
        <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">
            <PatientItem
                label='ID'
                data={patient.id}
            />

            <PatientItem
                label='Nombre'
                data={patient.name}
            />

            <PatientItem
                label='Síntomas'
                data={patient.symptoms}
            />

            <PatientItem
                label='Cuidador'
                data={patient.caretaker}
            />

            <PatientItem
                label='Fecha'
                data={patient.date.toString()}
            />


            <PatientItem
                label='Correo'
                data={patient.email}
            />

            <div className="flex flex-row justify-between mt-10">
                <button className="bg-indigo-500 py-2 px-10 rounded-lg text-white uppercase font-bold cursor-pointer hover:bg-indigo-800" onClick={()=>activeUserID(patient.id)}>Editar</button>
                <button className="bg-red-500 py-2 px-10 rounded-lg text-white uppercase font-bold cursor-pointer hover:bg-red-700" onClick={()=>handleDelete(patient.id)}>Eliminar</button>
            </div>

        </div>
    )
}
