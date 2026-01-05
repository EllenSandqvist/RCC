import { useMemo } from "react";

const EnrollmentOverview = ({ patient, diagnosData, ecogs }) => {
  const highestEcog = useMemo(() => {
    return ecogs.reduce(
      (max, curr) => {
        return curr.ecogScore > max.ecogScore ? curr : max;
      },
      { ecogScore: 0 }
    );
  }, [ecogs]);

  return (
    <section>
      <h1>Översikt</h1>
      {patient.firstName && patient.lastName && (
        <h2>
          {patient.firstName} {patient.lastName} - {patient.personalNum}
        </h2>
      )}

      <p className="overview-text">
        <b>Diagnosdatum:</b> {diagnosData.diagnosDate}
      </p>
      <p className="overview-text">
        <b>Högsta ECOG:</b> {highestEcog.ecogScore}
        {highestEcog.ecogDate && <span> ({highestEcog.ecogDate})</span>}
      </p>
    </section>
  );
};

export default EnrollmentOverview;
