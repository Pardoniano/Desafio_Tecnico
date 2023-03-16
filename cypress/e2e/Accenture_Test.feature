Feature: Teste do site sampleapp.tricentis.com/101/app.php
    Scenario: Preenchimento de formulário e envio de cotação
        Given Que estou na página de Automobile Insurance
        When Preencho o formulário "Vehicle Data"
        And Preencho o formulário "Insurant Data"
        And Preencho o formulário "Product Data"
        And Preencho o formulário "Price Option"
        And Preencho o formulário "Send Quote"
        Then vejo a mensagem Sending e-mail sucess!