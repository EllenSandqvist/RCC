import InputField from "../InputField";
import styles from "./PatientFields.module.css";

const PatientFields = ({
  patient,
  setPatient,
  clearErrorOnChange,
  validateInput,
  setToast,
  errors,
}) => {
  const handlePatientChange = ({ target }) => {
    const { value, name } = target;

    setToast(null);
    clearErrorOnChange(name);
    setPatient((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className={styles.patient_fields}>
      <h3>Patientuppgifter</h3>
      <label>
        Personnummer:
        <InputField
          name="personalNum"
          category="patient"
          placeholder="ÅÅÅÅMMDD-XXXX"
          value={patient.personalNum}
          handleChange={handlePatientChange}
          handleBlur={(e) => validateInput(e.target.value, e.target.name)}
          errors={errors}
        />
      </label>
      {errors.personalNum && <p>{errors.personalNum}</p>}

      <label>
        Förnamn:
        <InputField
          name="firstName"
          category="patient"
          value={patient.firstName}
          handleChange={handlePatientChange}
          handleBlur={(e) => validateInput(e.target.value, e.target.name)}
          errors={errors}
        />
      </label>
      {errors.firstName && <p>{errors.firstName}</p>}

      <label>
        Efternamn:
        <InputField
          name="lastName"
          category="patient"
          value={patient.lastName}
          handleChange={handlePatientChange}
          handleBlur={(e) => validateInput(e.target.value, e.target.name)}
          errors={errors}
        />
      </label>
      {errors.lastName && <p>{errors.lastName}</p>}
    </div>
  );
};

export default PatientFields;
