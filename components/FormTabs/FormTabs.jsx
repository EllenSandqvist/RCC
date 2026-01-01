import { useState } from "react";
import { v4 as uuid } from "uuid";
import EnrollmentForm from "../EnrollmentForm/EnrollmentForm";
import EnrollmentOverview from "../EnrollmentOverview";

import styles from "./FormTabs.module.css";

const createEcog = () => ({
  id: uuid(),
  ecogScore: null,
  ecogDate: "",
});

const createTreatment = () => ({
  id: uuid(),
  type: "",
  treatmentDate: "",
  surgicalCode: [],
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
  const [ecogs, setEcogs] = useState([createEcog()]);

  const handleAddNewLine = (type) => {
    type === "treatment"
      ? setTreatments((prev) => [...prev, createTreatment()])
      : setEcogs((prev) => [...prev, createEcog()]);
  };

  function handleRemoveLine(type, index) {
    type === "treatment"
      ? setTreatments((prev) => prev.filter((_, i) => index !== i))
      : setEcogs((prev) => prev.filter((_, i) => i !== index));
  }

  const renderContent = () => {
    switch (activeTab) {
      case "form":
        return (
          <EnrollmentForm
            patient={patient}
            setPatient={setPatient}
            diagnosData={diagnosData}
            setDiagnosData={setDiagnosData}
            treatments={treatments}
            setTreatments={setTreatments}
            ecogs={ecogs}
            setEcogs={setEcogs}
            handleAddNewLine={handleAddNewLine}
            handleRemoveLine={handleRemoveLine}
          />
        );
      case "overview":
        return <EnrollmentOverview diagnosData={diagnosData} ecogs={ecogs} />;
    }
  };

  return (
    <section>
      <div className={styles.tab_container}>
        <button
          className={`${styles.tab} ${
            activeTab === "form" ? styles.tab_active : ""
          }`}
          onClick={() => setActiveTab("form")}
        >
          <h3>Formulär</h3>
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "overview" ? styles.tab_active : ""
          }`}
          onClick={() => setActiveTab("overview")}
        >
          <h3>Canceranmälan</h3>
        </button>
      </div>
      <div className={styles.project_content}>{renderContent()}</div>
    </section>
  );
};

export default FormTabs;
