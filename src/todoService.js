class TodoService {
    constructor({todoRepository}){
        this.todoRepository = todoRepository
    }
    create(todoItem){
        if(!todoItem.isValid()){
            return{
                error:{
                    message:'invalid data',
                    data:todoItem
                }
            }
        }


    }
    list(query){
        const result = this.todoRepository.list()
        const resultParse = result.map(({meta,$loki,...expected})=>{
            return expected
        })
        return resultParse
    }
}
module.exports = TodoService