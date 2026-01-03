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

// STÄLLNINGSTAGANDEN:
// 1. Jag övervägde att automatiskt ta bort tomma rader från ECOG och behandlingar, men det kändes som att risken för att ofullständig data skulle registreras ökade. Det kändes fel att automatiskt ta bort den allra första raden om den är tom, samtidigt som det kändes inkonsekvent att hantera olika rader på helt olika sätt.
// 2. Hade först inget state för surgicalCodeInput utan la in koderna direkt under treatments.surgicalCode. Ställde till problem vid validering och det blev också lite rörigt med datatyperna, det är en array i mitt treatmentstate, men används som en string i UI:t. Genom att separera staten kan jag avvakta och bara spara korrekt data i mitt treatment state.
// 3. Iom att jag använder radiobuttons för ECOG måste namnet för dessa vara unikt för varje rad, annars går det bara att sätta ett värde. Av denna anledning används name/data-name lite omväxlande i olika delar av koden
// 4. Jag har antagit att behandligar registeras i efterhand och har därför valt att datum inte kan sättas framåt i tiden
// 5. Lade treatments-statet i FormTabs, trots att det egentligen går bra att lägga i EnrollmentForm. Detta för att de värden man matar in ska finnas kvar om man hoppar mellan flikarna
// 6. surgicalCodeInput – Hade stora problem med att värden försvann när jag växlade flikar. Berodde på att jag inte ändrat sättet som jag satt value på den inputen sedan jag använda treatment.surgicalCode direkt mot inputfältet. Eftersom surgicalCodeInput är en array måste jag i value hitta det id som matchar det aktuella treatment id:et.
// 7. Jag hade först lagt mitt error-state i min useValidation-hook. Det gjorde att error tappades om man växlade mellan flikarna, så jag blev tvungen att flytta upp statet till FormTabs.
