const { describe,it,before,afterEach} = require ('mocha')
const TodoRepository = require('../src/todoRepository')
const { createSandbox } = require('sinon')
const { expect } = require('chai')

describe('todoRepository', ()=>{
    
    let todoRepository 
    let sandBox 
    before(()=>{
        todoRepository = new TodoRepository()
        sandBox = createSandbox()
    })
    afterEach(()=>{
        sandBox.restore()
    })
    describe('methos signature', ()=>{
        it('should call insertOne from lokijs',()=>{
            const functionName = "find"
            const expectResult = mockDatabase
            sandBox.stub(
                todoRepository.schedule,
                functionName
            ).returns(expectResult)
            
            const result = todoRepository.list()
            expect(result).to.be.deep.equal(expectResult)
            expect(todoRepository.schedule[functionName].calledOnce).to.be.ok 

        })
        it('should call find from lokijs',()=>{
            const functionName = "find"
            const expectResult = mockDatabase
            sandBox.stub(
                todoRepository.schedule,
                functionName
            ).returns(expectResult)
            
            const result = todoRepository.list()
            expect(result).to.be.deep.equal(expectResult)
            expect(todoRepository.schedule[functionName].calledOnce).to.be.ok 
        })
    })
})

const mockDatabase = [
    {
      name: 'Faustao se fodeo',
      age: 100,
      meta: { revision: 0, created: 1611627605102, version: 0 },
      '$loki': 1
    },
    {
      name: 'Joao',
      age: 102,
      meta: { revision: 0, created: 1611627605102, version: 0 },
      '$loki': 2
    }
]