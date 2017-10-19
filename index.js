const moment = require('moment')
  Email = require('./src/entities/email')
  FSEmployeeRepository = require('./src/repositories/fs-employee-repository')
  BirthdayService = require('./src/birthday-service')

window.processFile = function () {
  if(!isBrowserSupported)
    return

  const inputfile = document.getElementById('inputfile')
  if(!isFileValid(inputfile))
    return


  readFile(inputfile, (fileContent) => {
    const employeeRepository = new FSEmployeeRepository(fileContent)
    const emailService = { send: (email) => console.log(email) }
    const service = new BirthdayService(employeeRepository, emailService)

    service.sendGreetings(moment())
  })
}

function readFile(inputfile, onContentLoaded) {
  const fileReader = new FileReader()
  fileReader.onload = ((e) => {
    onContentLoaded(e.target.result)
  })
  fileReader.readAsText(inputfile.files[0])
}


function isBrowserSupported() {
  if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
    alert('The File APIs are not fully supported in this browser.')
    return false
  }

  return true
}

function isFileValid(inputfile) {
  if (!inputfile) {
    alert("Um, couldn't find the inputfile element.")
    return false
  }

  if (!inputfile.files) {
    alert("This browser doesn't seem to support the `files` property of file inputs.")
    return false
  }

  if (!inputfile.files[0]) {
    alert("Please select a file before clicking 'Load'")
    return false
  }

  return true
}

