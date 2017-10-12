const 
  chai = require('chai')
  expect = chai.expect
  FSEmployeeRepository = require('../src/repositories/fs-employee-repository')
  Employee = require('../src/entities/employee')

describe('FSEmployeeRepository', () => {

  describe('all method', () => {

    it('returns an empty array when created from an empty string', () => {
      const repo = new FSEmployeeRepository('')
      expect(repo.all()).to.have.lengthOf(0)
      expect(repo.all()).to.deep.eq([])
    })

    it('return an Employee array when created from some file records', () => {
      const fileContent =
        "last_name, first_name, date_of_birth, email\n" +
        "Doe, John, 1982/10/08, john.doe@foobar.com"

      const repo = new FSEmployeeRepository(fileContent)
      const employees = repo.all()
      expect(employees).to.have.lengthOf(1)

      const firstEmployee = employees[0]
      // TBC
    })


  })

})
