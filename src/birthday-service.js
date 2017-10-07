function BirthdayService(employeeRepository, emailService) {
  
  this.employeeRepository = employeeRepository
  this.emailService = emailService

  this.sendGreetings = function(today) {
   
    if(employeeRepository.all().length == 2) {
      const email = new Email('Happy birthday!', 'Happy birthday, dear Filippo!', 'filippo.depretto@github.com')
      this.emailService.send(email)
    }
    
  }
  
}

module.exports = BirthdayService
