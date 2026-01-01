import { useState } from "react";
import InputField from "../InputField";
import useValidation from "../../hooks/useValidation.js";
import styles from "./EnrollmentForm.module.css";

const possibleEcogValues = [0, 1, 2, 3, 4, 5];

const EnrollmentForm = ({
  patient,
  setPatient,
  diagnosData,
  setDiagnosData,
  treatments,
  setTreatments,
  ecogs,
  setEcogs,
  handleAddNewLine,
  handleRemoveLine,
}) => {
  const [surgicalCodeInput, setSurgicalCodeInput] = useState("");

  const {
    errors,
    validateInput,
    validateTreatment,
    validateEcog,
    clearErrorOnChange,
  } = useValidation();
  // --- Handler for changes in patient or diagnos data ---
  const handleChange = ({ target }) => {
    const { dataset, value, name } = target;

    clearErrorOnChange(name);

    dataset.category === "patient"
      ? setPatient((prev) => ({ ...prev, [name]: value }))
      : setDiagnosData((prev) => ({ ...prev, [name]: value }));
  };

  // --- Handler for changes in treatment ---
  const handleChangeTreatment = ({ target }) => {
    const { dataset, name, value } = target;

    // clear previous errors
    clearErrorOnChange(dataset.name);

    // clear surgicalCode errors if treatment type is changed
    if (name === "type") {
      clearErrorOnChange(`surgicalCode-${dataset.id}`);
    }

    setTreatments((prev) =>
      prev.map((treatment) => {
        if (treatment.id !== dataset.id) return treatment;
        const newValue = name === "surgicalCode" ? value.split(",") : value;

        return {
          ...treatment,
          [name]: newValue,
        };
      })
    );
  };

  // --- Handler for changes in ECOG ---
  const handleChangeEcog = ({ target }) => {
    const { dataset, name, value } = target;

    // clear previous errors
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

  // --- Handler for removing treatment line ---
  const handleRemoveTreatment = (id, index) => {
    clearErrorOnChange([
      `treatmentDate-${id}`,
      `type-${id}`,
      `surgicalCode-${id}`,
    ]);
    handleRemoveLine("treatment", index);
  };

  // --- Handler for removing ecog line ---
  const handleRemoveEcog = (id, index) => {
    console.log(id);
    clearErrorOnChange([`ecogDate-${id}`, `ecogScore-${id}`]);
    handleRemoveLine("ecog", index);
  };

  // --- Handler for submit ---
  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(errors).length > 0) {
      //Fixa en modal för errormeddelande istället för alert!
      alert("Det finns errors som måste rättas till innan du kan spara");
      return;
    }

    const formData = {
      personalNum: patient.personalNum,
      firstName: patient.firstName,
      lastName: patient.lastName,
      diagnosData,
      treatments: treatments.map(({ type, treatmentDate, surgicalCode }) => ({
        type,
        treatmentDate,
        surgicalProcedureCode: surgicalCode
          .map((code) => code.trim())
          .filter(Boolean),
      })),
      ecogs: ecogs.map(({ ecogDate, ecogScore }) => ({ ecogDate, ecogScore })),
    };

    //Fixa en modal istället för confirm!
    const confirmText = `Är inmatad data korrekt? ${JSON.stringify(
      formData,
      null,
      2
    )}`;
    if (confirm(confirmText)) {
      alert("Formuläret har sparats...");
      window.inca = formData;
    } else {
      alert("Formuläret är inte sparat");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registreringsformulär</h2>
      <p>
        För att kunna spara formuläret måste alla fält vara ifyllda.
        Behandlings- eller ECOG-rader som inte behövs ska tas bort innan
        sparning.
      </p>

      {/* Patient: */}
      <h3>Patientuppgifter</h3>
      <label>
        Personnummer:
        <InputField
          name="personalNum"
          category="patient"
          placeholder="ÅÅÅÅMMDD-XXXX"
          value={patient.personalNum}
          handleChange={handleChange}
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
          handleChange={handleChange}
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
          handleChange={handleChange}
          handleBlur={(e) => validateInput(e.target.value, e.target.name)}
          errors={errors}
        />
      </label>
      {errors.lastName && <p>{errors.lastName}</p>}

      {/* Diagnos */}
      <h3>Diagnosuppgifter</h3>
      <label>
        Diagnosdatum:
        <InputField
          type="date"
          name="diagnosDate"
          category="diagnos"
          value={diagnosData.diagnosDate}
          handleChange={handleChange}
          handleBlur={(e) => validateInput(e.target.value, e.target.name)}
          errors={errors}
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
          onChange={handleChange}
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

      {/* Treatments */}
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
              data-name={`treatmentDate-${treatment.id}`}
              value={treatment.treatmentDate}
              onChange={handleChangeTreatment}
              onBlur={(e) =>
                validateTreatment(e.target.value, e.target.dataset.name, index)
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
                validateTreatment(e.target.value, e.target.dataset.name, index)
              }
              className={errors[`type-${treatment.id}`] ? styles.error : ""}
              required
            >
              <option value="">Välj</option>
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
                  value={treatment.surgicalCode}
                  onChange={handleChangeTreatment}
                  placeholder="ex. AB1234, HA1254, QB2233"
                  onBlur={(e) =>
                    validateTreatment(
                      e.target.value,
                      e.target.dataset.name,
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
            onClick={() => handleRemoveTreatment(treatment.id, index)}
          >
            Remove line -
          </button>
        </div>
      ))}

      <button type="button" onClick={() => handleAddNewLine("treatment")}>
        Lägg till ny rad +
      </button>

      {/* ECOG */}
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

          <button
            type="button"
            onClick={() => handleRemoveEcog(ecog.id, ecogIndex)}
          >
            Remove line -
          </button>
        </div>
      ))}

      <button type="button" onClick={() => handleAddNewLine("ecog")}>
        Lägg till ny rad +
      </button>
      <button type="submit">Spara</button>
    </form>
  );
};

export default EnrollmentForm;

//   type IncaFormData = {
//     personalNum: string;
//     firstName: string;
//     lastName: string;
//     diagnos: {
//       diagnosDate: string;
//       diagnosBasis: "PAD" | "cytologi" | "X-ray" | "clinical examination";
//     };
//     treatments: {
//       type: "surgery" | "radiotherapy" | "chemotherapy";
//       treatmentDate: string;
//       surgicalProcedureCode?: string[];
//     }[];
//     ecog: {
//       ecogScore: 0 | 1 | 2 | 3 | 4 | 5;
//       ecogDate: string;
//     }[];
//   };

// export default IncaFormData;

// ev. lägga in kod för att ta bort tomma rader...
// const elementsToRemove = checkForEmptyProperties("ecog", ecogs);
// console.log("elements to remove: ", elementsToRemove);
// if (elementsToRemove.length > 0) {
//   handleRemoveEcog(elementsToRemove.id, elementsToRemove.index);
// }
