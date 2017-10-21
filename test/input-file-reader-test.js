const
  chai = require('chai')
  sinon = require('sinon')
  expect = chai.expect
  InputFileReader = require('../src/input-file-reader')

describe('BirthdayService', () => {

  it('is defined', () => {
    InputFileReader()
  })

  describe('read', () => {

    describe('unsupported browers checks', () => {
      
      it('checks for valid windows', () => {
        assertBrowserCheckWithWindow(undefined)
        assertBrowserCheckWithWindow(null)
        assertBrowserCheckWithWindow({ File: undefined, FileReader: true, FileList: true, Blob: true })
        assertBrowserCheckWithWindow({ File: true, FileReader: undefined, FileList: true, Blob: true })
        assertBrowserCheckWithWindow({ File: true, FileReader: true, FileList: undefined, Blob: true })
        assertBrowserCheckWithWindow({ File: true, FileReader: true, FileList: true, Blob: undefined })
      })

      function assertBrowserCheckWithWindow(fakeWindow) {
        const spyOutputFn = sinon.spy()
        const spyOnContentLoaded = sinon.spy()
        const fakeDocument = null

        const reader = new InputFileReader(fakeWindow, fakeDocument, spyOutputFn)

        reader.read('anyElementId', spyOnContentLoaded)

        expect(spyOutputFn.calledOnce).to.be.true
        expect(spyOutputFn.withArgs('The File APIs are not fully supported in this browser.').calledOnce).to.be.true
        expect(spyOnContentLoaded.notCalled).to.be.true
      }

    })

    it('needs a valid document', () => {
      assertDocumentCheckWith(undefined)
      assertDocumentCheckWith(null)
      assertDocumentCheckWith({})
    })

    function assertDocumentCheckWith(fakeDocument) {
        const spyOutputFn = sinon.spy()
        const spyOnContentLoaded = sinon.spy()
        const fakeWindow = { File: true, FileReader: true, FileList: true, Blob: true }

        const reader = new InputFileReader(fakeWindow, fakeDocument, spyOutputFn)

        reader.read('anyElementId', spyOnContentLoaded)

        expect(spyOutputFn.calledOnce).to.be.true
        expect(spyOutputFn.withArgs('The provided document seems not valid.').calledOnce).to.be.true
        expect(spyOnContentLoaded.notCalled).to.be.true
    }

  })
})
