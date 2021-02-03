const { describe,it,before,afterEach} = require ('mocha')
const TodoService = require('../src/todoService')
const { createSandbox } = require('sinon')
const { expect } = require('chai')
const Todo = require('../src/todo')

describe('todoService', ()=>{
    
    let sandBox 
    
    before(()=>{
        sandBox = createSandbox()
    })
    
    describe('#list',() =>{
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
        let todoService 

        beforeEach(()=>{
            const dependencies = {
                todoRepository : {
                    list:sandBox.stub().returns(mockDatabase)
                }
            }
            todoService = new TodoService(dependencies)
    
        })
        it('should format data on specific format',()=>{
            const result = todoService.list()
            const[{meta,$loki,...expected}] = mockDatabase

            expect(result[0]).to.be.deep.equal(expected)

        })

    })
    
    describe('#create',()=>{
        
        let todoService 
        beforeEach(()=>{
            const dependencies = {
                todoRepository:{
                    create:sandBox.stub().returns(true)
                }
             }
            todoService = new TodoService(dependencies)

        })
        it('should t save todo item with invalid data',()=>{
            const data = new Todo({
                text : '',
                when : '',
                status:''
            })
            Reflect.deleteProperty(data,'id')
            const expected = {
                error:{
                    message:'invalid data',
                    data:data
                }
            }
            const result = todoService.create(data)
            expect(result).to.be.deep.equal(expected)
    
        })
        it('should save todo item with late status when the property is futher then today', ()=>{

             const properties = {
                text : 'I Must walk my dog',
                when : new Date("2020-12-01 12:00:00 GMT -0")
            }
    
            const expectedId= '00001'
            
            const uuid = require('uuid')
            
            const fakeNewId = sandBox.fake.returns(expectedId)
            sandBox.replace(uuid,"v4", fakeNewId)
            
            const data = new Todo(properties)
            const today = new Date("2020-12-02")
            sandBox.useFakeTimers(today.getTime())
            
            todoService.create(data)
    
            const expectedWith = {
                ...data,
                id: expectedId,
                status : "late"
            }
    
            expect(todoService.todoRepository.create.calledOnceWithExactly(expectedWith)).to.be.ok 
    
        })
    })

 
    it('should save todo item pending status')
    
})