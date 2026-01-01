import { useState } from "react";

const elementKeys = {
  personalNum: "Personnummer",
  firstName: "Förnamn",
  lastName: "Efternamn",
  diagnosDate: "Diagnosdatum",
  diagnosBasis: "Grund för diagnos",
  treatmentDate: "Datum",
  type: "Behandlingstyp",
  surgicalCode: "Operationskod",
  ecogDate: "Datum",
  ecogScore: "ECOG-värde",
};

const useValidation = () => {
  const [errors, setErrors] = useState({});

  const validateInput = (value, elementName) => {
    let message;
    const trimmedValue = value.trim();
    if (trimmedValue === "") {
      message = `${elementKeys[elementName]} är obligatoriskt`;
    } else if (elementName === "personalNum") {
      const regexPersonalNum = /^(?:\d{2})?\d{6}[-+]\d{4}$/;
      const notValidPersonalNumber = !regexPersonalNum.test(trimmedValue);

      if (notValidPersonalNumber) {
        message = `Felaktigt ${elementKeys[elementName]}`;
      }
    } else if (elementName === "firstName" || elementName === "lastName") {
      const regexName = /^[\p{Letter}\s\-.']+$/u;
      if (value.length < 2) {
        message = `${elementKeys[elementName]} måste vara minst två bokstäver`;
      } else if (!regexName.test(trimmedValue)) {
        message = `${elementKeys[elementName]} får enbart innehålla bokstäver, mellanslag, apostrofer och bindestreck.`;
      }
    }
    setErrors((prev) => {
      if (!message) return prev;
      return { ...prev, [elementName]: message };
    });
  };

  const validateEcog = (value, elementName, index) => {
    let message;
    const name = elementName.includes("ecogDate")
      ? elementKeys.ecogDate
      : elementKeys.ecogScore;

    if (value.trim() === "") {
      message = `ECOG ${index + 1}: ${name} är obligatoriskt`;
      setErrors((prev) => ({ ...prev, [elementName]: message }));
    }
  };

  const validateTreatment = (value, elementName, index) => {
    let message;
    const name = elementName.includes("type")
      ? elementKeys.type
      : elementName.includes("treatmentDate")
      ? elementKeys.treatmentDate
      : elementKeys.surgicalCode;

    if (value.trim() === "") {
      message = `Behandling ${index + 1}: ${name} är obligatoriskt`;
    } else if (elementName.includes("surgicalCode")) {
      const regex = /^[A-Za-z]{2}\d{4}$/;
      const valueArray = value.split(",");
      const codeArray = valueArray.map((value) => value.trim()).filter(Boolean);
      const notValidCodes = codeArray.filter((c) => !regex.test(c));

      if (notValidCodes.length > 0) {
        message = `Behandling ${
          index + 1
        }: Felaktiga operationskoder: ${notValidCodes.join(", ")}`;
      }
    }
    setErrors((prev) => {
      if (!message) return prev;
      return { ...prev, [elementName]: message };
    });
  };

  const clearErrorOnChange = (elementsToClear) => {
    const elementArray =
      typeof elementsToClear === "string" ? [elementsToClear] : elementsToClear;

    setErrors((prev) => {
      const copy = { ...prev };
      elementArray.forEach((element) => {
        delete copy[element];
      });
      return copy;
    });
  };

  return {
    errors,
    validateInput,
    validateTreatment,
    validateEcog,
    clearErrorOnChange,
  };
};

export default useValidation;

// const checkForEmptyProperties = (type, state) => {
//   let elementsToRemove = [];
//   if (type === "ecog" && state.length > 1) {
//     state.forEach((ecog, index) => {
//       if (
//         (ecog.ecogDate === "" || ecog.ecogDate == null) &&
//         (ecog.ecogScore === "" || ecog.ecogScore === null)
//       ) {
//         if (index > 0) {
//           elementsToRemove.push({ id: ecog.id, index });
//         }
//       }
//     });
//   }
//   return elementsToRemove;
// };
