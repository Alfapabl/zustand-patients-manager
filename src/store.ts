import { create } from "zustand";
import type { Patient, DraftPatient } from "./types";
import { persist } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'
type PatientState = {
    patients: Patient[]
    activeID: Patient['id']
    addPatient: (data: DraftPatient) => void
    deletePatient: (patients: Patient['id']) => void
    activeUserID: (Patient: Patient['id']) => void
    updatePatient: (data: DraftPatient) => void
}

const createPatient = (patients: DraftPatient): Patient => {
    return {
        ...patients,
        id: uuidv4()
    }
}


export const usePatientListStore = create<PatientState>()(
  persist(
    (set) => ({
      patients: [],
      activeID: '',

      addPatient: (data) => {
        const newPatient = createPatient(data);
        set((state) => ({
          patients: [...state.patients, newPatient]
        }));
      },

      updatePatient: (data) => {
        set((state) => ({
          patients: state.patients.map((patient) => 
            patient.id === state.activeID ? { id: state.activeID, ...data } : patient
          ),
          activeID: ''
        }));
      },

      deletePatient: (id) => {
        set((state) => ({
          patients: state.patients.filter((patient) => id !== patient.id)
        }));
      },

      activeUserID: (id) => {
        set(() => ({
          activeID: id
        }));
      }
    }), 
    {
      name: 'patients'
    }
  )
);