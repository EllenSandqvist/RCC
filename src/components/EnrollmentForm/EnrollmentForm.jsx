import { useState } from "react";
import useValidation from "../../hooks/useValidation.js";
import PatientFields from "../PatientFields/PatientFields.jsx";
import DiagnosFields from "../DiagnosFields.jsx";
import TreatmentFields from "../TreatmentFields.jsx";
import EcogFields from "../EcogFields.jsx";
import Toast from "../Toast/Toast.jsx";
import ConfirmModal from "../ConfirmModal/ConfirmModal.jsx";

const today = new Date().toISOString().slice(0, 10);

const toastMessage = {
  error:
    "Formuläret är inte korrekt ifyllt. Rätta de rödmarkerade fälten innan du sparar.",
  success: "Formuläret har sparats.",
};

let formData;

const EnrollmentForm = ({
  patient,
  setPatient,
  diagnosData,
  setDiagnosData,
  treatments,
  setTreatments,
  addTreatment,
  removeTreatment,
  surgicalCodeInput,
  setSurgicalCodeInput,
  ecogs,
  setEcogs,
  addEcog,
  removeECOG,
  errors,
  setErrors,
}) => {
  // const [surgicalCodeInput, setSurgicalCodeInput] = useState(
  //   treatments.map((t) => ({ id: t.id, input: "" }))
  // );

  const [toast, setToast] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const {
    validateInput,
    validateTreatment,
    validateSurgicalCode,
    validateEcog,
    clearErrorOnChange,
  } = useValidation({ errors, setErrors });

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
    formData = buildFormData();

    // Visa modal med sammanställd data
    setShowModal(true);
  };

  const saveForm = () => {
    setShowModal(false);
    setToast({ type: "success", message: toastMessage.success });
    window.inca = formData;
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Registreringsformulär</h1>
        <p>
          För att kunna spara formuläret måste alla fält vara ifyllda.
          Behandlings- eller ECOG-rader som inte behövs ska tas bort innan
          sparning.
        </p>

        <PatientFields
          patient={patient}
          setPatient={setPatient}
          clearErrorOnChange={clearErrorOnChange}
          validateInput={validateInput}
          setToast={setToast}
          errors={errors}
        />

        <DiagnosFields
          diagnosData={diagnosData}
          setDiagnosData={setDiagnosData}
          clearErrorOnChange={clearErrorOnChange}
          today={today}
          validateInput={validateInput}
          setToast={setToast}
          errors={errors}
        />

        <TreatmentFields
          treatments={treatments}
          today={today}
          clearErrorOnChange={clearErrorOnChange}
          validateTreatment={validateTreatment}
          surgicalCodeInput={surgicalCodeInput}
          setSurgicalCodeInput={setSurgicalCodeInput}
          validateSurgicalCode={validateSurgicalCode}
          setTreatments={setTreatments}
          addTreatment={addTreatment}
          removeTreatment={removeTreatment}
          setToast={setToast}
          errors={errors}
        />

        <EcogFields
          ecogs={ecogs}
          setEcogs={setEcogs}
          today={today}
          clearErrorOnChange={clearErrorOnChange}
          validateEcog={validateEcog}
          addEcog={addEcog}
          removeECOG={removeECOG}
          setToast={setToast}
          errors={errors}
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
      {showModal && (
        <ConfirmModal
          formData={formData}
          saveForm={saveForm}
          onClose={() => setShowModal(false)}
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
