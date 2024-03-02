function uuid() {
  // replace all global x & ywith random number we get from func
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (param) {
      let num = (Math.random() * 16) | 0;
      let v = param == 'x' ? num : (num & 0x3) | 0x8;
      return v.toString(16);
    }
  );
}

let todoInput = document.querySelector('.input');
let addTodoButton = document.querySelector('.button');
let showTodos = document.querySelector('.todos-container');
let todo = '';
let todoList = JSON.parse(localStorage.getItem('todos')) || [];

addTodoButton.addEventListener('click', (e) => {
  e.preventDefault(); // to prevent default behaviour of submission
  todo = todoInput.value;
  console.log('TODO: ', todo);
  if (todo.length > 0) {
    todoList.push({
      todo,
      id: uuid(),
      isCompleted: false,
    });
    renderTodoList(todoList);
    localStorage.setItem('todos', JSON.stringify(todoList));
    todoInput.value = '';
  }
});

showTodos.addEventListener('click', (e) => {
  e.preventDefault();
  let key = e.target.dataset.key; // event delegation key
  let delTodoKey = e.target.dataset.todokey; // event delegation key
  todoList = todoList.map((todo) =>
    todo.id === key
      ? {
          ...todo,
          isCompleted: !todo.isCompleted,
        }
      : todo
  );
  todoList = todoList.filter((todo) => todo.id !== delTodoKey);
  localStorage.setItem('todos', JSON.stringify(todoList));
  console.log(todoList);
  renderTodoList(todoList);
});

function renderTodoList(todoList) {
  // data-key is attribute for adding event delegation
  // event delegation: when multiple childs do same things (eg. checkbox will strike todo), so instead of adding
  // event listener to multiple checkbox, we add listener to parent & capture it in bubbling phase
  showTodos.innerHTML = todoList.map(
    ({ todo, id, isCompleted }) =>
      `<div class="todo relative"> 
        <input id="item-${id}" 
               data-key=${id} 
               class="t-checkbox t-pointer" 
               type="checkbox" ${isCompleted ? 'checked' : ''}
        > 
        <label data-key=${id} 
               class="todo-text t-pointer ${isCompleted ? 'checked-todo' : ''}" 
               for="item-${id}"> ${todo} 
        </label> 
        <button class="absolute right-0 button cursor">
          <span data-todokey=${id}  class="del-btn material-icons-outlined">delete</span>
        </button> 
      </div>`
  );
}

renderTodoList(todoList);
