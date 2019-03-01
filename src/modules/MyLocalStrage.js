const STORAGE_KEY = 'todos-vuejs-demo'

export default {
  fetch: ()=>{
    console.log(localStorage.getItem(STORAGE_KEY) || '[]')
    let todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    // todos.forEach(function(todo, index){
    //   todo.id = index
    // })
    todoStorage.uid = todos.length
    return todos
  },
  save: (todos)=>{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}