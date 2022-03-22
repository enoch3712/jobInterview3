/* eslint-disable no-undef */
/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('example to-do app', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('http://localhost:3000')
  })

  it('test', () => {

    cy.get('#question').type('410,000')

    cy.get('#questions_1').click()

    cy.get('#question').type('6%')

    cy.get('#questions_2').click()

    cy.get('#question').type('175 B')

    cy.get('#button').click()

    cy.wait(1000)

    cy.get('#reset').click()
  })

  it('theme', () => {

    cy.get('#theme').click()

    cy.wait(1000)

    cy.get('#theme').click()
  })
})
