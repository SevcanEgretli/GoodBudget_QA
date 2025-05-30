export const getCookieHeader = (cookies: Cypress.Cookie[]) =>
  cookies.map((c) => `${c.name}=${c.value}`).join("; ");