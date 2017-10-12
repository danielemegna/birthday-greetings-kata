function FSBirthdayRepository(fileContent) {

  this.fileContent = fileContent 

  this.all = function() {
    return fileContent
      .split("\n")
      .filter(l => !isEmpty(l))
      .filter(l => !isHeader(l))
  }

  function isEmpty(line) { return line == '' }
  function isHeader(line) { return line.startsWith("last_name") }
  
}

module.exports = FSBirthdayRepository
