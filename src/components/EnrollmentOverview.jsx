import { useMemo } from "react";

const EnrollmentOverview = ({ diagnosData, ecogs }) => {
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
      <p>Diagnosdatum: {diagnosData.diagnosDate}</p>
      <p>
        Högsta ECOG:{highestEcog.ecogScore} ({highestEcog.ecogDate})
      </p>
    </section>
  );
};

export default EnrollmentOverview;
