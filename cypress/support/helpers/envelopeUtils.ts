/**
 * Builds a URLSearchParams payload to be sent with POST requests to the /envelope/save endpoint.
 *
 * @param envReg - An array of regular envelopes (ENV_REG) to be included in the save request.
 * @param envIrr - An array of irregular envelopes (ENV_IRR), optional (default is an empty array).
 * @param envDtPmt - An array of due-date payment envelopes (ENV_DT_PMT), optional (default is an empty array).
 * @param deleted - An array of envelope UUIDs to be deleted, optional (default is an empty array).
 *
 * @returns A URLSearchParams object formatted according to Goodbudget's envelope save requirements.
 *
 * @example
 * const payload = buildPayload(updatedEnvReg);
 * const payload = buildPayload([], [], [], [{ Uuid: "123-abc" }]);
 */

interface EnvelopePayload {
  Uuid: string;
  FullName: string;
  Amount: string;
  Period: string;
  PeriodExtra: string;
  EnvelopeType: string;
}

export const buildPayload = (
  envReg: EnvelopePayload[],
  envIrr: EnvelopePayload[] = [],
  envDtPmt: EnvelopePayload[] = [],
  deleted: { Uuid: string }[] = [],
  period: string = "MON",
  periodExtra0: string = "1",
  periodExtra1: string = ""
) => {
  const payload = new URLSearchParams();
  payload.append("ENV_REG", JSON.stringify(envReg));
  payload.append("ENV_IRR", JSON.stringify(envIrr));
  payload.append("ENV_DT_PMT", JSON.stringify(envDtPmt));
  payload.append("period", period);
  payload.append("period_extra_0", periodExtra0);
  payload.append("period_extra_1", periodExtra1);
  payload.append("deleted", JSON.stringify(deleted));
  return payload;
};
