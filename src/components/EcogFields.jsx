//FLYTTA ERROR STYLING TILL GLOBAL STYLING FIL!
import styles from "./EnrollmentForm/EnrollmentForm.module.css";

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
    <>
      <h3>Allmäntillstånd (ECOG)</h3>
      {ecogs.map((ecog, ecogIndex) => (
        <div key={ecogIndex} className={`ecogDiv-${ecogIndex}`}>
          <p>ECOG {ecogIndex + 1}</p>
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
              className={errors[`ecogDate-${ecog.id}`] ? styles.error : ""}
              required
            />
          </label>
          {errors[`ecogDate-${ecog.id}`] && (
            <p>{errors[`ecogDate-${ecog.id}`]}</p>
          )}

          {/* BYT TILL P-TAGG SENARE!!! */}
          <span>ECOG-värde:</span>
          {possibleEcogValues.map((ecogVal) => (
            <label key={ecogVal}>
              {ecogVal}
              <input
                type="radio"
                data-id={ecog.id}
                name={`ecogScore-${ecog.id}`}
                data-name="ecogScore"
                value={ecogVal}
                checked={ecog.ecogScore === ecogVal}
                onChange={handleChangeEcog}
                onBlur={(e) =>
                  validateEcog(e.target.value, e.target.name, ecogIndex)
                }
                className={errors[`ecogScore-${ecog.id}`] ? styles.error : ""}
                required
              />
            </label>
          ))}
          {errors[`ecogScore-${ecog.id}`] && (
            <p>{errors[`ecogScore-${ecog.id}`]}</p>
          )}

          <button type="button" onClick={() => handleRemoveEcog(ecog.id)}>
            Remove line -
          </button>
        </div>
      ))}

      <button type="button" onClick={addEcog}>
        Lägg till ny rad +
      </button>
    </>
  );
};

export default EcogFields;
