import { useForm } from 'react-hook-form'
import Errors from './Errors';
import type { DraftPatient } from '../types';
import { usePatientListStore } from '../store';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function PatientForm() {

    const { addPatient, activeID, updatePatient, patients } = usePatientListStore()
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<DraftPatient>()
    const registerPatient = (data: DraftPatient) => {
        if (activeID !== '') {
            updatePatient(data)
            toast.success('Paciente Actualizado Correctamente', )   
        }
        else(
            addPatient(data),
            toast.success('Paciente Agregado Correctamente', )               
        )
        reset() 
    }

    useEffect(()=> {
        if (activeID) {
            const activePatient = patients.filter((patient)=> patient.id === activeID)[0]
            setValue('name', activePatient.name)
            setValue('caretaker', activePatient.caretaker)
            setValue('email', activePatient.email)
            setValue('date', activePatient.date)
            setValue('symptoms', activePatient.symptoms)
        }
    },[activeID])

    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

            <p className="text-lg mt-5 text-center mb-10">
                Añade Pacientes y {''}
                <span className="text-indigo-600 font-bold">Administralos</span>
            </p>

            <form
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
                noValidate
                onSubmit={handleSubmit(registerPatient)}
            >
                <div className="mb-5">
                    <label htmlFor="name" className="text-sm uppercase font-bold">
                        Paciente
                    </label>
                    <input
                        id="name"
                        className="w-full p-3  border border-gray-100"
                        type="text"
                        placeholder="Nombre del Paciente"
                        {...register('name', { required: 'Name is a Required Field' })}
                    />
                    {errors.name && (
                        <Errors>{errors.name?.message?.toString()}</Errors>
                    )}

                </div>

                <div className="mb-5">
                    <label htmlFor="caretaker" className="text-sm uppercase font-bold">
                        Propietario
                    </label>
                    <input
                        id="caretaker"
                        className="w-full p-3  border border-gray-100"
                        type="text"
                        placeholder="Nombre del Propietario"
                        {...register('caretaker', { required: 'caretaker is a Required Field' })}
                    />
                    {errors.caretaker && (
                        <Errors>{errors.caretaker?.message?.toString()}</Errors>
                    )}
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="text-sm uppercase font-bold">
                        Email
                    </label>
                    <input
                        id="email"
                        className="w-full p-3  border border-gray-100"
                        type="email"
                        placeholder="Email de Registro"
                        {...register("email", {
                            required: "Email is a mandatory field",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Email Not Valid'
                            }
                        })}
                    />
                    {errors.email && (
                        <Errors>{errors.email?.message?.toString()}</Errors>
                    )}
                </div>

                <div className="mb-5">
                    <label htmlFor="date" className="text-sm uppercase font-bold">
                        Fecha Alta
                    </label>
                    <input
                        id="date"
                        className="w-full p-3  border border-gray-100"
                        type="date"
                        {...register('date', { required: 'date is a Required Field' })}
                    />
                    {errors.date && (
                        <Errors>{errors.date?.message?.toString()}</Errors>
                    )}
                </div>

                <div className="mb-5">
                    <label htmlFor="symptoms" className="text-sm uppercase font-bold">
                        Síntomas
                    </label>
                    <textarea
                        id="symptoms"
                        className="w-full p-3  border border-gray-100"
                        placeholder="Síntomas del paciente"
                     {...register('symptoms', { required: 'symptoms is a Required Field' })}
                    />
                    {errors.symptoms && (
                        <Errors>{errors.symptoms?.message}</Errors>
                    )}
                </div>

                <input
                    type="submit"
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                    value='Guardar Paciente'
                />
            </form>
        </div>
    )
}