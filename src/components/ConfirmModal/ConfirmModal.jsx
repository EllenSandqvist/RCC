import styles from "./ConfirmModal.module.css";

const displayNames = {
  pad: "PAD",
  cytologi: "Cytologi",
  "x-ray": "Röntgen",
  clinicalExam: "Klinisk undersökning",
  surgery: "Kirurgi",
  radiotherapy: "Strålbehandling",
  chemotherapy: "Cytostatika",
};

const ConfirmModal = ({ formData, saveForm, onClose }) => {
  return (
    <div id="greetings" className={styles.modal_backdrop}>
      <div className={styles.modal_content}>
        <h2>Sammanställning</h2>
        <p>Är inmatad data korrekt?</p>
        <hr />
        <div>
          <h3>Patientuppgifter</h3>
          <p>
            <b>Personnummer:</b> {formData.personalNum}
          </p>
          <p>
            <b>Förnamn:</b> {formData.firstName}
          </p>
          <p>
            <b>Efternamn:</b> {formData.lastName}
          </p>
        </div>
        <div>
          <h3>Diagnosuppgifter</h3>
          <p>
            <b>Diagnosdatum:</b> {formData.diagnosData.diagnosDate}
          </p>
          <p>
            <b>Diagnosgrund:</b>{" "}
            {displayNames[formData.diagnosData.diagnosBasis]}
          </p>
        </div>
        <div>
          <h3>Behandlingar</h3>
          {formData.treatments.map(
            ({ type, treatmentDate, surgicalProcedureCode }, index) => (
              <div key={index}>
                <h4>
                  <b>Behandling {index + 1}:</b>
                </h4>
                <p>
                  <b>Datum:</b> {treatmentDate}
                </p>
                <p>
                  <b>Typ:</b> {displayNames[type]}
                </p>
                {surgicalProcedureCode.length > 0 && (
                  <p>
                    <b>Operationskoder:</b> {surgicalProcedureCode.join(", ")}
                  </p>
                )}
              </div>
            )
          )}
        </div>
        <div>
          <h3>ECOG</h3>
          {formData.ecogs.map(({ ecogDate, ecogScore }, index) => (
            <div key={index}>
              <h4>
                <b>ECOG {index + 1}:</b>
              </h4>
              <p>
                <b>Datum:</b> {ecogDate}
              </p>
              <p>
                <b>ECOG-värde:</b> {ecogScore}
              </p>
            </div>
          ))}
        </div>

        <div>
          <button type="button" onClick={saveForm}>
            OK
          </button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
