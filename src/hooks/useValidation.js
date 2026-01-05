const displayNames = {
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

const isValidRegex = (value, regex) => regex.test(value);

const useValidation = ({ errors, setErrors }) => {
  const validateInput = (value, elementName) => {
    let message;
    const trimmedValue = value.trim();
    if (trimmedValue === "") {
      message = `${displayNames[elementName]} är obligatoriskt`;
    } else if (elementName === "personalNum") {
      if (!isValidRegex(trimmedValue, /^(?:\d{2})?\d{6}[-+]\d{4}$/)) {
        message = `Felaktigt ${displayNames[elementName]}`;
      }
    } else if (elementName === "firstName" || elementName === "lastName") {
      if (value.length < 2) {
        message = `${displayNames[elementName]} måste vara minst två bokstäver`;
      } else if (!isValidRegex(trimmedValue, /^[\p{Letter}\s\-.']+$/u)) {
        message = `${displayNames[elementName]} får enbart innehålla bokstäver, mellanslag, apostrofer och bindestreck.`;
      }
    }
    setErrors((prev) => {
      if (!message) return prev;
      return { ...prev, [elementName]: message };
    });
  };

  const validateEcog = (value, elementName) => {
    let message;
    const name = elementName.includes("ecogDate")
      ? displayNames.ecogDate
      : displayNames.ecogScore;

    if (value.trim() === "") {
      message = `${name} är obligatoriskt`;
      setErrors((prev) => ({ ...prev, [elementName]: message }));
    }
  };

  const validateTreatment = (name, dataName, value) => {
    let message;

    if (value.trim() === "") {
      message = `${displayNames[name]} är obligatoriskt`;
    }
    setErrors((prev) => {
      if (!message) return prev;
      return { ...prev, [dataName]: message };
    });
  };

  const validateSurgicalCode = (
    name,
    dataId,
    dataName,
    value,
    setTreatments
  ) => {
    let message;
    let codeArray;

    if (typeof value !== "string" || value.trim() === "") {
      message = `${displayNames[name]} är obligatoriskt`;
    } else {
      const valueArray = value.split(",");
      codeArray = valueArray.map((value) => value.trim()).filter(Boolean);
      const notValidCodes = codeArray.filter(
        (c) => !isValidRegex(c, /^[A-Za-z]{2}\d{4}$/)
      );

      if (notValidCodes.length > 0) {
        message = `Felaktiga operationskoder: ${notValidCodes.join(", ")}`;
      }
    }

    setErrors((prev) => {
      if (!message) return prev;
      return { ...prev, [dataName]: message };
    });

    setTreatments((prev) => {
      if (message) return prev;

      return prev.map((treatment) => {
        if (treatment.id !== dataId) return treatment;
        return { ...treatment, [name]: codeArray };
      });
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
    validateSurgicalCode,
    validateEcog,
    clearErrorOnChange,
  };
};

export default useValidation;
