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

  const [ecogs, setEcogs] = useState([createEcog()]);

  const addEcog = () => {
    setEcogs((prev) => [...prev, createEcog()]);
  };

  const removeECOG = (id) => {
    setEcogs((prev) => prev.filter((ecog) => ecog.id !== id));
  };

  const renderContent = () => {
    {
      return activeTab === "form" ? (
        <EnrollmentForm
          patient={patient}
          setPatient={setPatient}
          diagnosData={diagnosData}
          setDiagnosData={setDiagnosData}
          ecogs={ecogs}
          setEcogs={setEcogs}
          addEcog={addEcog}
          removeECOG={removeECOG}
        />
      ) : (
        <EnrollmentOverview diagnosData={diagnosData} ecogs={ecogs} />
      );
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
