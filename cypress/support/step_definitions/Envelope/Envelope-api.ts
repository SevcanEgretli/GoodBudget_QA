import { Then } from "@badeball/cypress-cucumber-preprocessor";
import { getCookieHeader } from "../../helpers/cookieUtils";
import { buildPayload } from "../../helpers/envelopeUtils";

Then("I create an envelope named {string} with amount {int} via API", (envelopeName: string, amount: number) => {
  cy.getCookies().then((cookies) => {
    const cookieHeader = getCookieHeader(cookies);

    const payload = buildPayload([
    {
        Uuid: "",
        FullName: envelopeName,
        Amount: amount.toFixed(2),
        Period: "MON",
        PeriodExtra: "1",
        EnvelopeType: "ENV_REG"
    }
]);

    cy.request({
      method: "POST",
      url: "/envelope/save",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "cookie": cookieHeader
      },
      body: payload.toString()
    });
  });
});

Then("the envelope named {string} should have amount {int}", (name: string, amount: number) => {
  cy.request("/buckets-api/household").then((resp) => {
    expect(resp.status).to.eq(200);
    const envelopes = resp.body.envelopes || [];
    const found = envelopes.find((env: any) => env.name === name);
    expect(found, `Envelope '${name}' should exist`).to.not.be.undefined;
    
    expect(parseFloat(found.amount)).to.eq(amount);
    expect(found).to.include({
      name: name,
      currentAmount: "0.00",
      amount: amount.toFixed(2),
      envelopeType: "ENV_REG",
      period: "MON",
      periodExtra: "1",
      nextDueDate: ""
    });
  });
});


Then(
  "I update the envelope named {string} to have name {string} and amount {int}",
  (oldName: string, newName: string, newAmount: number) => {
    cy.getCookies().then((cookies) => {
      const cookieHeader = getCookieHeader(cookies);

      cy.request({
        method: "GET",
        url: "/buckets-api/household",
        headers: {
          Cookie: cookieHeader,
        },
      }).then((resp) => {
        expect(resp.status).to.eq(200);

        const allEnvelopes = resp.body.envelopes || [];
        const envReg = allEnvelopes.filter((env: any) => env.envelopeType === "ENV_REG");

        const updatedEnvReg = envReg.map((env: any) => {
          return {
            Uuid: env.uuid,
            FullName: env.name === oldName ? newName : env.name,
            Amount: env.name === oldName ? `${newAmount.toFixed(2)}` : `${parseFloat(env.amount).toFixed(2)}`,
            Period: env.period,
            PeriodExtra: env.periodExtra,
            EnvelopeType: env.envelopeType,
          };
        });

        const payload = buildPayload(updatedEnvReg);

        cy.request({
          method: "POST",
          url: "/envelope/save",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Cookie: cookieHeader,
          },
          body: payload.toString(),
        }).then((postResp) => {
          expect(postResp.status).to.eq(200);
        });
      });
    });
  }
);

Then("I delete the envelope named {string}", (name: string) => {
  cy.getCookies().then((cookies) => {
    const cookieHeader = getCookieHeader(cookies);

    cy.request({
      method: "GET",
      url: "/buckets-api/household",
      headers: {
        Cookie: cookieHeader,
      },
    }).then((resp) => {
      expect(resp.status).to.eq(200);
      const envelope = resp.body.envelopes.find((env: any) => env.name === name);
      expect(envelope, `Envelope '${name}' should exist`).to.not.be.undefined;

      const payload = buildPayload([], [], [], [{ Uuid: envelope.uuid }]);


      cy.request({
        method: "POST",
        url: "/envelope/save",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Cookie: cookieHeader,
        },
        body: payload.toString(),
      }).then((postResp) => {
        expect(postResp.status).to.eq(200);
      });
    });
  });
});
