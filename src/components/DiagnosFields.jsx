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
  setToast,
}) => {
  const handleDiagnosChange = ({ target }) => {
    const { value, name } = target;

    setToast(null);
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
          <option value="" disabled>
            --- Välj ett alternativ ---
          </option>
          <option value="pad">PAD</option>
          <option value="cytologi">Cytologi</option>
          <option value="x-ray">Röntgen</option>
          <option value="clinicalExam">Klinisk undersökning</option>
        </select>
      </label>
      {errors.diagnosBasis && <p>{errors.diagnosBasis}</p>}
    </>
  );
};

export default DiagnosFields;
