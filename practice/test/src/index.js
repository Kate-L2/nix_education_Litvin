class Todos {
  constructor() {
    this.todos = [];
  }
  list() {
    return [...this.todos];
  }
  add(title) {
    const todoItem = {
      title: title,
    };
    this.todos.push();
  }
}
const todo = new Todos();

console.log(todo.list());
todo.add("Home work");
module.exports = Todos;
