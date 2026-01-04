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
    <div>
      <h2>Patientuppgifter</h2>
      <div className="question-group">
        <label>
          Personnummer:
          <input
            type="text"
            name="personalNum"
            placeholder="ÅÅÅÅMMDD-XXXX"
            value={patient.personalNum}
            onChange={handlePatientChange}
            onBlur={(e) => validateInput(e.target.value, e.target.name)}
            className={errors["personalNum"] ? "error" : ""}
            required
          />
        </label>

        <label>
          Förnamn:
          <input
            type="text"
            name="firstName"
            value={patient.firstName}
            onChange={handlePatientChange}
            onBlur={(e) => validateInput(e.target.value, e.target.name)}
            className={errors["firstName"] ? "error" : ""}
            required
          />
        </label>

        <label>
          Efternamn:
          <input
            type="text"
            name="lastName"
            value={patient.lastName}
            onChange={handlePatientChange}
            onBlur={(e) => validateInput(e.target.value, e.target.name)}
            className={errors["lastName"] ? "error" : ""}
            required
          />
        </label>
      </div>
      {errors.personalNum && <p className="error-text">{errors.personalNum}</p>}
      {errors.firstName && <p className="error-text">{errors.firstName}</p>}
      {errors.lastName && <p className="error-text">{errors.lastName}</p>}
    </div>
  );
};

export default PatientFields;
