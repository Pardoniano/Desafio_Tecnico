export class Function_PO {
  static dropDown(id) {
    cy.get(`#${id}`)
      .children()
      .as("options")
      .its("length", { log: false })
      .then((n) => {
        cy.get("@options", { log: false }).then(($options) => {
          function randomNumberIndex(min, max) {
            return Math.round(Math.random() * (max - min) + min);
          }
          const randomOptionIndex = randomNumberIndex(1, n - 1);
          const randomOptionText = $options[randomOptionIndex].innerText.trim();
          cy.get(`#${id}`)
            .select([randomOptionText])
            .should("exist")
            .should("not.be.null")
            .should("be.visible");
        });
      });
  }
  static chooseOne(optionName) {
    function randomNumberIndex(min, max) {
      return Math.round(Math.random() * (max - min) + min);
    }
    const randomOptionChooseOne = randomNumberIndex(0, 1);
    cy.get(`input[name="${optionName}"]`)
      .eq(randomOptionChooseOne)
      .click({ force: true });
  }
  static chooseMutiple(optionName) {
    cy.get(`input[name="${optionName}"]`)
      .as("options")
      .its("length", { log: false })
      .then((n) => {
        cy.get("@options", { log: false }).then(() => {
          function randomNumberIndex(min, max) {
            return Math.round(Math.random() * (max - min) + min);
          }
          const randomOptionIndex = randomNumberIndex(0, n - 1);
          cy.get(`input[name="${optionName}"]`)
            .eq(randomOptionIndex)
            .click({ force: true })
            .should("exist")
            .should("not.be.null")
            .should("be.visible");
        });
      });
  }
}
