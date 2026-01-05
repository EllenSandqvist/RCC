import { IoCloseSharp } from "react-icons/io5";

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
        <button type="button" className={styles.close_btn} onClick={onClose}>
          <IoCloseSharp />
        </button>

        <p className={styles.confirm_text}>
          Kontrollera den imatade datan innan du sparar.
        </p>
        <div className={styles.overview}>
          <div className={styles.patient_fields}>
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
          <div className={styles.diagnos_fields}>
            <p>
              <b>Diagnosdatum:</b> {formData.diagnosData.diagnosDate}
            </p>
            <p>
              <b>Diagnosgrund:</b>{" "}
              {displayNames[formData.diagnosData.diagnosBasis]}
            </p>
          </div>
          <div>
            <h5>Behandlingar:</h5>
            {formData.treatments.map(
              ({ type, treatmentDate, surgicalProcedureCode }, index) => (
                <div key={index}>
                  <div className={styles.treatment_fields}>
                    <p>
                      <b>Datum:</b> {treatmentDate}
                    </p>
                    <p>
                      <b>Typ:</b> {displayNames[type]}
                    </p>
                    {surgicalProcedureCode.length > 0 && (
                      <p>
                        <b>Operationskoder:</b>{" "}
                        {surgicalProcedureCode.join(", ")}
                      </p>
                    )}
                  </div>
                </div>
              )
            )}
          </div>
          <div>
            <h5>
              <b>ECOG:</b>
            </h5>
            {formData.ecogs.map(({ ecogDate, ecogScore }, index) => (
              <div key={index}>
                <div className={styles.ecog_fields}>
                  <p>
                    <b>Datum:</b> {ecogDate}
                  </p>
                  <p>
                    <b>ECOG-värde:</b> {ecogScore}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.buttons_div}>
          <button type="button" className="save-button" onClick={saveForm}>
            Spara
          </button>
          <button
            type="button"
            className={styles.cancel_button}
            onClick={onClose}
          >
            Avbryt
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
