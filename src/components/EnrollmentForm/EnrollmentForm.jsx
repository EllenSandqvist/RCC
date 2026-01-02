import { useState } from "react";
import { v4 as uuid } from "uuid";
import useValidation from "../../hooks/useValidation.js";
import PatientFields from "../PatientFields.jsx";
import DiagnosFields from "../DiagnosFields.jsx";
import TreatmentFields from "../TreatmentFields.jsx";
import EcogFields from "../EcogFields.jsx";
import Toast from "../Toast/Toast.jsx";

const today = new Date().toISOString().slice(0, 10);

const createTreatment = () => ({
  id: uuid(),
  type: "",
  treatmentDate: "",
  surgicalCode: [],
});

const toastMessage = {
  error:
    "Formuläret är inte korrekt ifyllt. Rätta de rödmarkerade fälten innan du sparar.",
  success: "Formuläret har sparats.",
};

const EnrollmentForm = ({
  patient,
  setPatient,
  diagnosData,
  setDiagnosData,
  ecogs,
  setEcogs,
  addEcog,
  removeECOG,
}) => {
  const [treatments, setTreatments] = useState([createTreatment()]);

  const [surgicalCodeInput, setSurgicalCodeInput] = useState(
    treatments.map((t) => ({ id: t.id, input: "" }))
  );

  const [toast, setToast] = useState(null);

  const {
    errors,
    validateInput,
    validateTreatment,
    validateSurgicalCode,
    validateEcog,
    clearErrorOnChange,
  } = useValidation();

  const addTreatment = () => {
    setTreatments((prev) => [...prev, createTreatment()]);
  };

  const removeTreatment = (id) => {
    setTreatments((prev) => prev.filter((treatment) => treatment.id !== id));
  };

  // Function to build final javaScript Object:
  const buildFormData = () => ({
    personalNum: patient.personalNum,
    firstName: patient.firstName,
    lastName: patient.lastName,
    diagnosData,
    treatments: treatments.map(({ type, treatmentDate, surgicalCode }) => ({
      type,
      treatmentDate,
      surgicalProcedureCode: surgicalCode,
    })),
    ecogs: ecogs.map(({ ecogDate, ecogScore }) => ({ ecogDate, ecogScore })),
  });

  // --- Handler for submit ---
  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(errors).length > 0) {
      setToast({ type: "error", message: toastMessage.error });
      return;
    }

    setToast(null);
    const formData = buildFormData();

    //Fixa en modal istället för confirm!
    const confirmText = `Är inmatad data korrekt? ${JSON.stringify(
      formData,
      null,
      2
    )}`;
    if (confirm(confirmText)) {
      setToast({ type: "success", message: toastMessage.success });
      window.inca = formData;
    } else {
      alert("Formuläret är inte sparat");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Registreringsformulär</h2>
        <p>
          För att kunna spara formuläret måste alla fält vara ifyllda.
          Behandlings- eller ECOG-rader som inte behövs ska tas bort innan
          sparning.
        </p>

        <PatientFields
          patient={patient}
          setPatient={setPatient}
          errors={errors}
          clearErrorOnChange={clearErrorOnChange}
          validateInput={validateInput}
          setToast={setToast}
        />

        <DiagnosFields
          diagnosData={diagnosData}
          setDiagnosData={setDiagnosData}
          errors={errors}
          clearErrorOnChange={clearErrorOnChange}
          today={today}
          validateInput={validateInput}
          setToast={setToast}
        />

        <TreatmentFields
          treatments={treatments}
          today={today}
          errors={errors}
          clearErrorOnChange={clearErrorOnChange}
          validateTreatment={validateTreatment}
          surgicalCodeInput={surgicalCodeInput}
          setSurgicalCodeInput={setSurgicalCodeInput}
          validateSurgicalCode={validateSurgicalCode}
          setTreatments={setTreatments}
          addTreatment={addTreatment}
          removeTreatment={removeTreatment}
          setToast={setToast}
        />

        <EcogFields
          ecogs={ecogs}
          setEcogs={setEcogs}
          today={today}
          clearErrorOnChange={clearErrorOnChange}
          errors={errors}
          validateEcog={validateEcog}
          addEcog={addEcog}
          removeECOG={removeECOG}
          setToast={setToast}
        />

        <button type="submit">Spara</button>
      </form>
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
};

export default EnrollmentForm;

//   type IncaFormData = {
//     personalNum: string;
//     firstName: string;
//     lastName: string;
//     diagnos: {
//       diagnosDate: string;
//       diagnosBasis: "PAD" | "cytologi" | "X-ray" | "clinical examination";
//     };
//     treatments: {
//       type: "surgery" | "radiotherapy" | "chemotherapy";
//       treatmentDate: string;
//       surgicalProcedureCode?: string[];
//     }[];
//     ecog: {
//       ecogScore: 0 | 1 | 2 | 3 | 4 | 5;
//       ecogDate: string;
//     }[];
//   };

// export default IncaFormData;
