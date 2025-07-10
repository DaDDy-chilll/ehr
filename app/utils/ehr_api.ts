export const EHR_API = {
  Definition: `${process.env.EHR_API}/definition/template/adl1.4`,
  EHR: `${process.env.EHR_API}/ehr`,
  Composition(id: string): string {
    return `${process.env.EHR_API}/ehr/${id}/composition`;
  },
};
