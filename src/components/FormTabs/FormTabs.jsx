import { useState } from "react";
import { v4 as uuid } from "uuid";
import EnrollmentForm from "../EnrollmentForm";
import EnrollmentOverview from "../EnrollmentOverview";

import styles from "./FormTabs.module.css";

const createTreatment = () => ({
  id: uuid(),
  type: "",
  treatmentDate: "",
  surgicalCode: [],
});

const createEcog = () => ({
  id: uuid(),
  ecogScore: null,
  ecogDate: "",
});

const FormTabs = () => {
  const [activeTab, setActiveTab] = useState("form");

  const [patient, setPatient] = useState({
    personalNum: "",
    firstName: "",
    lastName: "",
  });

  const [diagnosData, setDiagnosData] = useState({
    diagnosDate: "",
    diagnosBasis: "",
  });
  const [treatments, setTreatments] = useState([createTreatment()]);
  const [surgicalCodeInput, setSurgicalCodeInput] = useState(
    treatments.map((t) => ({ id: t.id, input: "" }))
  );

  const [ecogs, setEcogs] = useState([createEcog()]);

  const [errors, setErrors] = useState({});

  const addTreatment = () => {
    const newTreatment = createTreatment();
    setTreatments((prev) => [...prev, newTreatment]);
    setSurgicalCodeInput((prev) => [
      ...prev,
      { id: newTreatment.id, input: "" },
    ]);
  };

  const removeTreatment = (id) => {
    setTreatments((prev) => prev.filter((treatment) => treatment.id !== id));
  };

  const addEcog = () => {
    setEcogs((prev) => [...prev, createEcog()]);
  };

  const removeECOG = (id) => {
    setEcogs((prev) => prev.filter((ecog) => ecog.id !== id));
  };

  const resetStates = () => {
    const newTreatment = createTreatment();
    setPatient({
      personalNum: "",
      firstName: "",
      lastName: "",
    });

    setDiagnosData({
      diagnosDate: "",
      diagnosBasis: "",
    });

    setTreatments([newTreatment]);
    setSurgicalCodeInput([
      {
        id: newTreatment.id,
        input: "",
      },
    ]);
    setEcogs([createEcog()]);
  };

  const renderContent = () => {
    {
      return activeTab === "form" ? (
        <EnrollmentForm
          patient={patient}
          setPatient={setPatient}
          diagnosData={diagnosData}
          setDiagnosData={setDiagnosData}
          treatments={treatments}
          setTreatments={setTreatments}
          addTreatment={addTreatment}
          removeTreatment={removeTreatment}
          surgicalCodeInput={surgicalCodeInput}
          setSurgicalCodeInput={setSurgicalCodeInput}
          ecogs={ecogs}
          setEcogs={setEcogs}
          addEcog={addEcog}
          removeECOG={removeECOG}
          errors={errors}
          setErrors={setErrors}
          resetStates={resetStates}
        />
      ) : (
        <EnrollmentOverview
          patient={patient}
          diagnosData={diagnosData}
          ecogs={ecogs}
        />
      );
    }
  };

  return (
    <>
      <div className={styles.tab_container}>
        <button
          className={`${styles.tab} ${
            activeTab === "form" ? styles.tab_active : ""
          }`}
          onClick={() => setActiveTab("form")}
        >
          <h3 className={styles.tab_text}>Formulär</h3>
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "overview" ? styles.tab_active : ""
          }`}
          onClick={() => setActiveTab("overview")}
        >
          <h3 className={styles.tab_text}>Canceranmälan</h3>
        </button>
      </div>
      <>{renderContent()}</>
    </>
  );
};

export default FormTabs;
