//FLYTTA ERROR STYLING TILL GLOBAL STYLING FIL!
import styles from "./EnrollmentForm/EnrollmentForm.module.css";

const TreatmentFields = ({
  treatments,
  today,
  errors,
  clearErrorOnChange,
  validateTreatment,
  surgicalCodeInput,
  setSurgicalCodeInput,
  validateSurgicalCode,
  setTreatments,
  addTreatment,
  removeTreatment,
  setToast,
}) => {
  const handleChangeTreatment = ({ target }) => {
    const { dataset, name, value } = target;

    // clear previous errors
    setToast(null);
    clearErrorOnChange(dataset.name);

    // clear surgicalCode errors if treatment type is changed
    if (name === "type") {
      clearErrorOnChange(`surgicalCode-${dataset.id}`);
    }

    if (name === "surgicalCode") {
      setSurgicalCodeInput((prev) =>
        prev.map((input) => {
          if (input.id !== dataset.id) return input;
          return {
            ...input,
            [name]: value,
          };
        })
      );
    } else {
      setTreatments((prev) =>
        prev.map((treatment) => {
          if (treatment.id !== dataset.id) return treatment;

          return {
            ...treatment,
            [name]: value,
          };
        })
      );
    }
  };

  const handleRemoveTreatment = (id) => {
    clearErrorOnChange([
      `treatmentDate-${id}`,
      `type-${id}`,
      `surgicalCode-${id}`,
    ]);
    setSurgicalCodeInput((prev) => prev.filter((input) => input.id !== id));
    removeTreatment(id);
  };

  return (
    <>
      <h3>Behandlingar</h3>
      {/* FIXA BÄTTRE UX HÄR SENARE!!! */}
      <p>
        Vid kirurgi: Om flera operationskoder anges ska de separeras med komma.
      </p>
      {treatments.map((treatment, index) => (
        <div key={index}>
          <p>Behandling {index + 1}</p>
          <label>
            Datum:
            <input
              type="date"
              name="treatmentDate"
              data-id={treatment.id}
              max={today}
              data-name={`treatmentDate-${treatment.id}`}
              value={treatment.treatmentDate}
              onChange={handleChangeTreatment}
              onBlur={(e) =>
                validateTreatment(
                  e.target.name,
                  e.target.dataset.name,
                  e.target.value,
                  index
                )
              }
              className={
                errors[`treatmentDate-${treatment.id}`] ? styles.error : ""
              }
              required
            />
          </label>
          {errors[`treatmentDate-${treatment.id}`] && (
            <p>{errors[`treatmentDate-${treatment.id}`]}</p>
          )}

          <label>
            Typ:
            <select
              name="type"
              data-id={treatment.id}
              data-name={`type-${treatment.id}`}
              value={treatment.type}
              onChange={handleChangeTreatment}
              onBlur={(e) =>
                validateTreatment(
                  e.target.name,
                  e.target.dataset.name,
                  e.target.value,
                  index
                )
              }
              className={errors[`type-${treatment.id}`] ? styles.error : ""}
              required
            >
              <option value="" disabled>
                --- Välj ett alternativ ---
              </option>
              <option value="surgery">Kirurgi</option>
              <option value="radiotherapy">Strålbehandling</option>
              <option value="chemotherapy">Cytostatika</option>
            </select>
          </label>
          {errors[`type-${treatment.id}`] && (
            <p>{errors[`type-${treatment.id}`]}</p>
          )}

          {treatment.type === "surgery" && (
            <>
              <label>
                Operationskoder:
                <input
                  type="text"
                  name="surgicalCode"
                  data-id={treatment.id}
                  data-name={`surgicalCode-${treatment.id}`}
                  value={surgicalCodeInput.input}
                  onChange={handleChangeTreatment}
                  placeholder="ex. AB1234, HA1254, QB2233"
                  onBlur={(e) =>
                    validateSurgicalCode(
                      e.target.name,
                      e.target.dataset.id,
                      e.target.dataset.name,
                      e.target.value,
                      setTreatments,
                      index
                    )
                  }
                  className={
                    errors[`surgicalCode-${treatment.id}`] ? styles.error : ""
                  }
                  required
                />
              </label>
              {errors[`surgicalCode-${treatment.id}`] && (
                <p>{errors[`surgicalCode-${treatment.id}`]}</p>
              )}
            </>
          )}
          <button
            type="button"
            onClick={() => handleRemoveTreatment(treatment.id)}
          >
            Remove line -
          </button>
        </div>
      ))}

      <button type="button" onClick={() => addTreatment()}>
        Lägg till ny rad +
      </button>
    </>
  );
};

export default TreatmentFields;
