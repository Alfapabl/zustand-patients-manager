import PatientForm from "./components/Patientform"
import PatientList from "./components/PatientList"
import { ToastContainer } from 'react-toastify';

function App() {


  return (
    <>
      <h1 className="text-5xl text-center font-bold m-10">Pacientes <span className="text-blue-500">information</span></h1>

      <div className="flex">
        <PatientForm />
        <PatientList />
      </div>
      <ToastContainer />
    </>
  )
}

export default App
