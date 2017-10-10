function FSBirthdayRepository(fileContent) {

  this.fileContent = fileContent 

  this.all = function() {
    if(this.fileContent == '')
      return []

    return [null]
  }
  
}

module.exports = FSBirthdayRepository
