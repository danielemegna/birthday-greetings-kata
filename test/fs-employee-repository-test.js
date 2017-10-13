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
        "Daniele, Megna, 1990/09/19, megna.dany@github.com\n" +
        "Doe, John, 1982/10/08, john.doe@foobar.com\n" +
        "Ann, Mary, 1975/09/11, mary.ann@foobar.com"
      const repo = new FSEmployeeRepository(fileContent)

      const employees = repo.all()

      expect(employees).to.have.lengthOf(3)
      expect(employees[0].firstName).to.be.equal('Daniele')
      expect(employees[0].dateOfBirth.isSame(moment('1990-09-19'))).to.be.true
      expect(employees[1].lastName).to.be.equal('John')
      expect(employees[2].email).to.be.equal('mary.ann@foobar.com')
    })


  })

})
