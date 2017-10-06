const 
  chai = require('chai')
  expect = chai.expect
  Email = require('../src/entities/email')

describe('Email', () => {

  it('is defined', () => {
    Email()
  })

  it('is equal to another email', () => {
    const first = new Email('Happy birthday!', 'Happy birthday, dear Filippo!', 'daniele.megna@github.com')
    const second = new Email('Happy birthday!', 'Happy birthday, dear Filippo!', 'daniele.megna@github.com')

    expect(first).to.deep.equal(second)
  })

  it('is different from another email', () => {
    const first = new Email('Happy birthday!', 'Happy birthday, dear Filippo!', 'daniele.megna@github.com')
    const second = new Email('Internal comunication', 'This is an internal comunication', 'daniele.megna@github.com')

    expect(first).to.not.deep.equal(second)
  })

})
