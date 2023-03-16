import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { Forms_PO } from "../page_objects/Forms_PO";

Given("Que estou na página de Automobile Insurance", () => {
  cy.visit("http://sampleapp.tricentis.com/101/app.php");
});
When("Preencho o formulário {string}", (form) => {
  switch (form) {
    case "Vehicle Data":
      Forms_PO.vehicleData();
      break;
    case "Insurant Data":
      Forms_PO.insurantData();
      break;
    case "Product Data":
      Forms_PO.productData();
      break;
    case "Price Option":
      Forms_PO.priceOption();
      break;
    case "Send Quote":
      Forms_PO.sendQuote();
      break;
  }
});
Then("vejo a mensagem Sending e-mail sucess!", () => {
  Forms_PO.successMessage();
});
