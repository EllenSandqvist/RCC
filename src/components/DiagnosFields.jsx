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
    <div>
      <h2>Diagnosuppgifter</h2>
      <div className="question-group">
        <label>
          Diagnosdatum:
          <input
            type="date"
            name="diagnosDate"
            value={diagnosData.diagnosDate}
            onChange={handleDiagnosChange}
            onBlur={(e) => validateInput(e.target.value, e.target.name)}
            className={errors["diagnosDate"] ? "error" : ""}
            max={today}
            required
          />
        </label>

        <label>
          Grund för diagnos:
          <select
            name="diagnosBasis"
            value={diagnosData.diagnosBasis}
            onChange={handleDiagnosChange}
            onBlur={(e) => validateInput(e.target.value, e.target.name)}
            className={errors["diagnosBasis"] ? "error" : ""}
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
      </div>
      {errors.diagnosDate && <p className="error-text">{errors.diagnosDate}</p>}
      {errors.diagnosBasis && (
        <p className="error-text">{errors.diagnosBasis}</p>
      )}
    </div>
  );
};

export default DiagnosFields;
