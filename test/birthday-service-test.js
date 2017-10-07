const
  chai = require('chai')
  sinon = require('sinon')
  expect = chai.expect
  moment = require('moment')
  BirthdayService = require('../src/birthday-service')
  Employee = require('../src/entities/employee')
  Email = require('../src/entities/email')

describe('BirthdayService', () => {

  it('is defined', () => {
    BirthdayService()
  })

  describe('sendGreetings', () => {

    it('do nothing with no stored employee', () => {
      const today = moment('2017-10-07')
      const employeeRepository = { all: () => {} }
      sinon.stub(employeeRepository, 'all').returns([])
      const emailService = { send: () => {} }
      const mock = sinon.mock(emailService)
      mock.expects('send').never()

      const service = new BirthdayService(employeeRepository, emailService)

      service.sendGreetings(today)

      mock.verify()
    })

    it('do nothing when there are no birthday', () => {
      const today = moment('2017-10-07')
      const storedEmployee = [
        new Employee('Daniele', 'Megna', moment('1990-09-19'), 'megna.dany@github.com')
      ]
      const employeeRepository = { all: () => {} }
      sinon.stub(employeeRepository, 'all').returns(storedEmployee)
      const emailService = { send: () => {} }
      const mock = sinon.mock(emailService)
      mock.expects('send').never()

      const service = new BirthdayService(employeeRepository, emailService)

      service.sendGreetings(today)

      mock.verify()
    })

    it('send an email to the employee born today', () => {
      const today = moment('2017-10-07')
      const storedEmployee = [
        new Employee('Filippo', 'Verdi', moment('1990-10-07'), 'filippo.verdi@github.com'),
        new Employee('Daniele', 'Megna', moment('1990-09-19'), 'megna.dany@github.com')
      ]
      const employeeRepository = { all: () => {} }
      sinon.stub(employeeRepository, 'all').returns(storedEmployee)
      const emailService = { send: () => {} }

      const expectedEmail = new Email('Happy birthday!', 'Happy birthday, dear Filippo!', 'filippo.verdi@github.com')
      const mock = sinon.mock(emailService)
      mock.expects('send').exactly(1).withArgs(expectedEmail)

      const service = new BirthdayService(employeeRepository, emailService)

      service.sendGreetings(today)

      mock.verify()
    })

  })

})
