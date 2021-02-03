const { describe,it,beforeEach,afterEach} = require ('mocha')
const { expect } = require('chai')
const { createSandbox} = require ('sinon')
const Todo = require("../src/todo")

describe('todo', ()=>{
    beforeEach(()=>{
        let sandbox
        sandBox = createSandbox()
    })
    afterEach(()=>{
        sandBox.restore()
    })
    describe('#isValid', ()=>{
        it('should return invalid when creating without text',()=>{
            const data = {
                text : '',
                when : new Date("2020-12-01")
            }
            const todo = new Todo(data)
            const result = todo.isValid()
            expect(result).to.be.not.ok

        })
        it('should return invalid when creating without when or when is invalid',()=>{
            const data = {
                text : 'Hello World',
                when : new Date("20-12-01")
            }
            const todo = new Todo(data)
            const result = todo.isValid()
            expect(result).to.be.not.ok

        })

        it('should have "id","text","when" and "status" properties after creating object', ()=>{
            const data = {
                text : 'Hello World',
                when : new Date("2020-12-01")
            }
            const expectedId= '00001'
            
            const uuid = require('uuid')
            const fakeNewId = sandBox.fake.returns(expectedId)
            sandBox.replace(uuid,"v4", fakeNewId)

            const todo = new Todo(data)
            const result = todo.isValid()

            expect(result).to.be.ok
            expect(uuid.v4.calledOnce).to.be.ok

        })
    })
})
