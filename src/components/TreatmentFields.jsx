import { FaRegTrashAlt } from "react-icons/fa";

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
        prev.map((inputObj) => {
          if (inputObj.id !== dataset.id) return inputObj;
          return {
            ...inputObj,
            input: value,
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
    <div>
      <h2 className="treatment-h2">Behandlingar</h2>
      <p>
        <i>
          Vid kirurgi: Om flera operationskoder anges ska de separeras med
          komma.
        </i>
      </p>
      {treatments.map((treatment, index) => (
        <div key={treatment.id} className="treatment-div">
          <h4>Behandling {index + 1}</h4>
          <div className="question-group">
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
                  errors[`treatmentDate-${treatment.id}`] ? "error" : ""
                }
                required
              />
            </label>

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
                className={errors[`type-${treatment.id}`] ? "error" : ""}
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

            {treatment.type === "surgery" && (
              <>
                <label>
                  Operationskoder:
                  <input
                    type="text"
                    name="surgicalCode"
                    data-id={treatment.id}
                    data-name={`surgicalCode-${treatment.id}`}
                    value={
                      surgicalCodeInput.find(
                        (input) => input.id === treatment.id
                      )?.input || ""
                    }
                    onChange={handleChangeTreatment}
                    placeholder="ex. AB1234, HA1254"
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
                      errors[`surgicalCode-${treatment.id}`] ? "error" : ""
                    }
                    required
                  />
                </label>
              </>
            )}
            <button
              type="button"
              className="delete-line-btn"
              onClick={() => handleRemoveTreatment(treatment.id)}
              title="Ta bort behandling"
            >
              <FaRegTrashAlt />
            </button>
          </div>
          {errors[`treatmentDate-${treatment.id}`] && (
            <p className="error-text">
              {errors[`treatmentDate-${treatment.id}`]}
            </p>
          )}
          {errors[`type-${treatment.id}`] && (
            <p className="error-text">{errors[`type-${treatment.id}`]}</p>
          )}
          {errors[`surgicalCode-${treatment.id}`] && (
            <p className="error-text">
              {errors[`surgicalCode-${treatment.id}`]}
            </p>
          )}
        </div>
      ))}
      <button type="button" onClick={() => addTreatment()}>
        Lägg till ny behandling +
      </button>
    </div>
  );
};

export default TreatmentFields;
