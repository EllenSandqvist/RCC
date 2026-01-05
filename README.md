# RCC - Arbetsprov

## JavaScript-objekt för överlämning av data

```javascript
type IncaFormData = {
  personalNum: string,
  firstName: string,
  lastName: string,
  diagnos: {
    diagnosDate: string,
    diagnosBasis: "PAD" | "cytologi" | "X-ray" | "clinical examination",
  },
  treatments: {
    type: "surgery" | "radiotherapy" | "chemotherapy",
    treatmentDate: string,
    surgicalProcedureCode?: string[],
  }[],
  ecog: {
    ecogScore: 0 | 1 | 2 | 3 | 4 | 5,
    ecogDate: string,
  }[],
};
```
