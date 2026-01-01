import InputField from "./InputField";
//FLYTTA ERROR STYLING TILL GLOBAL STYLING FIL!
import styles from "./EnrollmentForm/EnrollmentForm.module.css";

const DiagnosFields = ({
  diagnosData,
  setDiagnosData,
  errors,
  clearErrorOnChange,
  today,
  validateInput,
}) => {
  const handleDiagnosChange = ({ target }) => {
    const { value, name } = target;

    clearErrorOnChange(name);
    setDiagnosData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      <h3>Diagnosuppgifter</h3>
      <label>
        Diagnosdatum:
        <InputField
          type="date"
          name="diagnosDate"
          category="diagnos"
          value={diagnosData.diagnosDate}
          handleChange={handleDiagnosChange}
          handleBlur={(e) => validateInput(e.target.value, e.target.name)}
          errors={errors}
          max={today}
          required
        />
      </label>
      {errors.diagnosDate && <p>{errors.diagnosDate}</p>}

      <label>
        Grund för diagnos:
        <select
          name="diagnosBasis"
          data-category="diagnos"
          value={diagnosData.diagnosBasis}
          onChange={handleDiagnosChange}
          onBlur={(e) => validateInput(e.target.value, e.target.name)}
          className={errors["diagnosBasis"] ? styles.error : ""}
          required
        >
          <option value="">Välj</option>
          <option value="pad">PAD</option>
          <option value="cytologi">Cytologi</option>
          <option value="x-ray">X-ray</option>
          <option value="clinicalExam">Clinical Examination</option>
        </select>
      </label>
      {errors.diagnosBasis && <p>{errors.diagnosBasis}</p>}
    </>
  );
};

export default DiagnosFields;
