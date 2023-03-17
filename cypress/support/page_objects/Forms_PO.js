/// <reference types="cypress" />
import { faker } from "@faker-js/faker";
import { Function_PO } from "./Functions_PO";
faker.locale = "en";
export class Forms_PO {
  static vehicleData() {
    Function_PO.dropDown("make");
    Function_PO.dropDown("model");
    cy.get("#cylindercapacity").type(
      faker.datatype.number({ min: 1, max: 2000 })
    );
    cy.get("#engineperformance").type(
      faker.datatype.number({ min: 1, max: 2000 })
    );
    cy.get("#dateofmanufacture").type(
      faker.date.past(10).toLocaleDateString("en-US")
    );
    Function_PO.dropDown("numberofseats");
    Function_PO.chooseOne("Right Hand Drive");
    Function_PO.dropDown("numberofseatsmotorcycle");
    Function_PO.dropDown("fuel");
    cy.get("#payload").type(faker.datatype.number({ min: 1, max: 1000 }));
    cy.get("#totalweight").type(
      faker.datatype.number({ min: 100, max: 50000 })
    );
    cy.get("#listprice").type(faker.datatype.number({ min: 500, max: 100000 }));
    cy.get("#licenseplatenumber").type(
      faker.lorem.word({ length: { min: 1, max: 10 } })
    );
    cy.get("#annualmileage").type(
      faker.datatype.number({ min: 100, max: 100000 })
    );
    cy.get("#nextenterinsurantdata").click();
  }
  static insurantData() {
    cy.get("#firstname").type(faker.name.firstName());
    cy.get("#lastname").type(faker.name.lastName());
    cy.get("#birthdate").type(
      faker.date
        .birthdate({ min: 18, max: 70, mode: "age" })
        .toLocaleDateString("en-US")
    );
    Function_PO.chooseOne("Gender");
    cy.get("#streetaddress").type(faker.address.streetAddress());
    Function_PO.dropDown("country");
    //Não da para utilizar o country do faker, nesse cenário pois a biblioteca possui mais pais disponivel que o site testado.
    cy.get("#zipcode").type(faker.address.zipCode("####"));
    cy.get("#city").type(faker.address.city());
    Function_PO.dropDown("occupation");
    Function_PO.chooseMutiple("Hobbies");
    cy.get("#website").type(faker.internet.domainName());
    cy.get("#picturecontainer").selectFile(
      "cypress/fixtures/images/beserk.jpg",
      { force: true }
    );
    cy.get("#preventervehicledata")
      .should("be.visible")
      .should("not.be.disabled");
    cy.get("#nextenterproductdata").click();
  }
  static productData() {
    cy.get("#startdate").type(
      faker.date.future(30).toLocaleDateString("en-US")
    );
    Function_PO.dropDown("insurancesum");
    Function_PO.dropDown("meritrating");
    Function_PO.dropDown("damageinsurance");
    Function_PO.chooseMutiple("Optional Products[]");
    Function_PO.dropDown("courtesycar");
    cy.get("#preventerinsurancedata")
      .should("be.visible")
      .should("not.be.disabled");
    cy.get("#nextselectpriceoption").click();
  }
  static priceOption() {
    //se necessario da para alterar de random para fixo, a opção selecionada
    cy.get("tfoot").then(() => {
      function randomNumberIndex(min, max) {
        return Math.round(Math.random() * (max - min) + min);
      }
      const randomOptionChooseOne = randomNumberIndex(0, 3);
      cy.get('input[name="Select Option"]')
        .eq(randomOptionChooseOne)
        .click({ force: true });
    });
    cy.get("#preventerproductdata")
      .should("be.visible")
      .should("not.be.disabled");
    cy.get("#nextsendquote").click();
  }
  static sendQuote() {
    cy.get("#email").type(faker.internet.email());
    cy.get("#phone").type(faker.phone.number("##########"));
    cy.get("#username").type(faker.internet.userName());
    const password = "!Aa0" + faker.internet.password(6);
    cy.get("#password").type(password, { log: false });
    cy.get("#confirmpassword").type(password, { log: false });
    cy.get("#Comments").type(faker.lorem.lines(1));
    cy.get("#prevselectpriceoption")
      .should("be.visible")
      .should("not.be.disabled");
    cy.get("#sendemail").click({ force: true });
  }
  static successMessage() {
    cy.get('[class="sweet-alert showSweetAlert"]', { timeout: 30000 })
      .should("be.visible")
      .within(() => {
        cy.get("h2")
          .should("have.text", "Sending e-mail success!")
          .should("be.visible");
        cy.get('button[class="confirm"]')
          .should("be.visible")
          .should("not.be.disabled");
      });
  }
}
