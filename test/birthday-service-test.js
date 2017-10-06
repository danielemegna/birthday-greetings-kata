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
      const employeeRepository = { all: () => {} }
      sinon.stub(employeeRepository, "all").returns([])
      const clock = { today: () => {} }
      const today = moment("1995-12-25")
      sinon.stub(clock, "today").returns(today)
      const emailService = { send: () => {} }

      const mock = sinon.mock(emailService)
      mock.expects('send').never()

      const service = new BirthdayService(employeeRepository, emailService)

      service.sendGreetings(clock)

      mock.verify()
    })

    it('do nothing when no employee is born today', () => {
      const storedEmployee = [
        new Employee('Daniele', 'Megna', '19/09/1990', 'megna.dany@github.com')
      ]
      const employeeRepository = { all: () => {} }
      sinon.stub(employeeRepository, "all").returns(storedEmployee)
      const clock = { today: () => {} }
      const today = moment("2017-12-25")
      sinon.stub(clock, "today").returns(today)
      const emailService = { send: () => {} }

      const mock = sinon.mock(emailService)
      mock.expects('send').never()

      const service = new BirthdayService(employeeRepository, emailService)

      service.sendGreetings(clock)

      mock.verify()
    })

    it('send an email to the employee born today', () => {
      const storedEmployee = [
        new Employee('Filippo', 'Verdi', '03/01/1990', 'filippo.verdi@github.com'),
        new Employee('Daniele', 'Megna', '19/09/1990', 'megna.dany@github.com')
      ]
      const employeeRepository = { all: () => {} }
      sinon.stub(employeeRepository, "all").returns(storedEmployee)
      const clock = { today: () => {} }
      const today = moment("2017-01-03")
      sinon.stub(clock, "today").returns(today)
      const emailService = { send: () => {} }

      const expectedEmail = new Email('Happy birthday!', 'Happy birthday, dear Filippo!', 'filippo.depretto@github.com')
      const mock = sinon.mock(emailService)
      mock.expects('send').exactly(1).withArgs(expectedEmail)

      const service = new BirthdayService(employeeRepository, emailService)

      service.sendGreetings(clock)

      mock.verify()
    })

  })

})
