function BirthdayService(employeeRepository, emailService) {
  
  this.employeeRepository = employeeRepository
  this.emailService = emailService

  this.sendGreetings = function(today) {
   
    const employees = employeeRepository.all()
    if(employees.length == 0)
      return

    const employee = employees[0]
    if(isTodayHisBirthday(employee, today)) {
      this.emailService.send(buildBirthdayEmail(employee))
    }
    
  }

  function isTodayHisBirthday(employee, today) {
    const employeeDateOfBirth = employee.dateOfBirth
    return employeeDateOfBirth.month() == today.month() &&
      employeeDateOfBirth.date() == today.date()
  }

  function buildBirthdayEmail(employee) {
      return new Email('Happy birthday!', 'Happy birthday, dear ' + employee.firstName + '!', employee.email)
  }
  
}

module.exports = BirthdayService
