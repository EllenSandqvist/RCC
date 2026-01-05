import { FaRegTrashAlt } from "react-icons/fa";

const possibleEcogValues = [0, 1, 2, 3, 4, 5];

const EcogFields = ({
  ecogs,
  setEcogs,
  today,
  errors,
  clearErrorOnChange,
  validateEcog,
  addEcog,
  removeECOG,
  setToast,
}) => {
  // --- Handler for changes in ECOG ---
  const handleChangeEcog = ({ target }) => {
    const { dataset, name, value } = target;

    // clear previous errors
    setToast(null);
    clearErrorOnChange(name);

    setEcogs((prev) =>
      prev.map((ecog) => {
        if (ecog.id !== dataset.id) return ecog;
        const newValue = dataset.name === "ecogScore" ? Number(value) : value;
        return {
          ...ecog,
          [dataset.name]: newValue,
        };
      })
    );
  };

  const handleRemoveEcog = (id) => {
    clearErrorOnChange([`ecogDate-${id}`, `ecogScore-${id}`]);
    removeECOG(id);
  };

  return (
    <div>
      <h2>Allmäntillstånd (ECOG)</h2>
      {ecogs.map((ecog, ecogIndex) => (
        <div key={ecog.id} className="ecog-div">
          <h4>ECOG {ecogIndex + 1}</h4>
          <div className="question-group ecog-group">
            <label>
              Datum:
              <input
                type="date"
                data-id={ecog.id}
                name={`ecogDate-${ecog.id}`}
                data-name="ecogDate"
                max={today}
                value={ecog.ecogDate}
                onChange={handleChangeEcog}
                onBlur={(e) =>
                  validateEcog(e.target.value, e.target.name, ecogIndex)
                }
                className={errors[`ecogDate-${ecog.id}`] ? "error" : ""}
                required
              />
            </label>

            <p className="ecog-value-text">ECOG-värde:</p>
            <div className="ecog-options-div">
              {possibleEcogValues.map((ecogVal) => (
                <div key={ecogVal} className="ecog-options">
                  <input
                    type="radio"
                    data-id={ecog.id}
                    name={`ecogScore-${ecog.id}`}
                    id={`ecogScore-${ecog.id}`}
                    data-name="ecogScore"
                    value={ecogVal}
                    checked={ecog.ecogScore === ecogVal}
                    onChange={handleChangeEcog}
                    onBlur={(e) =>
                      validateEcog(e.target.value, e.target.name, ecogIndex)
                    }
                    className={errors[`ecogScore-${ecog.id}`] ? "error" : ""}
                    required
                  />
                  <label htmlFor={`ecogScore-${ecog.id}`}>{ecogVal}</label>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="delete-line-btn"
              title="Ta bort ECOG"
              onClick={() => handleRemoveEcog(ecog.id)}
            >
              <FaRegTrashAlt />
            </button>
          </div>
          {errors[`ecogDate-${ecog.id}`] && (
            <p className="error-text">{errors[`ecogDate-${ecog.id}`]}</p>
          )}
          {errors[`ecogScore-${ecog.id}`] && (
            <p className="error-text">{errors[`ecogScore-${ecog.id}`]}</p>
          )}
        </div>
      ))}

      <button type="button" onClick={addEcog}>
        Lägg till ny ECOG +
      </button>
    </div>
  );
};

export default EcogFields;
