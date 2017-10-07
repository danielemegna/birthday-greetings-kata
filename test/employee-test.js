const 
  chai = require('chai')
  expect = chai.expect
  Employee = require('../src/entities/employee')

describe('Employee', () => {

  it('is defined', () => {
    Employee()
  })

  it('is equal to another employee', () => {
    const first = new Employee('Daniele', 'Megna', moment('1990-09-19'), 'megna.dany@github.com')
    const second = new Employee('Daniele', 'Megna', moment('1990-09-19'), 'megna.dany@github.com')

    expect(first).to.deep.equal(second)
  })

  it('is different from another employee', () => {
    const first = new Employee('Daniele', 'Megna', moment('1990-09-19'), 'megna.dany@github.com')
    const second = new Employee('Filippo', 'Verdi', moment('1990-10-07'), 'filippo.verdi@github.com')

    expect(first).to.not.deep.equal(second)
  })

})
