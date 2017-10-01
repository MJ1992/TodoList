var todoList = {
	todos: [],
	
	addTodo: function(item) {
		this.todos.push({
			todoText: item,
			completed: false
		});
		
	},
	changeTodo: function(position,newValue){
		this.todos[position].todoText = newValue;
		
	},
	deleteTodo: function(position){
		this.todos.splice(position,1);
		
	},
	toggleCompleted: function(position){
		this.todos[position].completed = !this.todos[position].completed;
		
	},

	toggleAll: function(){
		var completedTodos = 0;
		var totalTodos = this.todos.length;

		
		this.todos.forEach(function(todo){
			if(todo.completed ===true){
				completedTodos++;
			}

		});

		
		this.todos.forEach(function(todo){

			if(completedTodos === totalTodos){
			//make everything false
			
				todo.completed = false;

			}else{
			
				todo.completed = true;

			
		}
	});

		

	}

}




var handlers = {
	toggleAll: function(){
	todoList.toggleAll();
	view.displayTodos();
},
	addTodos: function(){
		var addTodoInputText = document.getElementById("addTodosInputText");
		todoList.addTodo(addTodoInputText.value);
		addTodoInputText.value = "";
		view.displayTodos();
	},
	changeTodos: function(){
		var changeTodoInputText = document.getElementById('changeTodoInputText');
		var changeTodoPositionInput = document.getElementById('changeTodoInputPosition');
		todoList.changeTodo(changeTodoPositionInput.valueAsNumber,changeTodoInputText.value);
		changeTodoInputText.value = '';
		changeTodoPositionInput.value = '';
		view.displayTodos();

	},
	deleteTodos: function(position){
		todoList.deleteTodo(position);
		view.displayTodos();
	}
	,
	toggleCompleted: function(){
		var toggleCompletedTodoPositionInput = document.getElementById('toggleCompletedTodoPositionInput');
		todoList.toggleCompleted(toggleCompletedTodoPositionInput.valueAsNumber);
		toggleCompletedTodoPositionInput.value = "";
		view.displayTodos();
	}


};

var view = {
	displayTodos: function(){
		var todoUl = document.querySelector('ul');
		todoUl.innerHTML = "";
		
		
		todoList.todos.forEach(function(todo, position){

			var todosLi = document.createElement('li');


				var todoTextWithcompletion  = '';
				if (todo.completed === true) {
					todoTextWithcompletion = "(x) " + todo.todoText;

				}else{
					todoTextWithcompletion = "() " + todo.todoText;
				}



				todosLi.id = position;
				todosLi.textContent = todoTextWithcompletion;
				todosLi.appendChild(this.createDeleteButton());
				todoUl.appendChild(todosLi);

		},this);

	},
	createDeleteButton: function(){
		var deleteButton = document.createElement('button');
		deleteButton.textContent = "Delete";
		deleteButton.className = "deleteButton";
		return deleteButton;
	},

	setUpEventListeners: function(){

		var todoUl = document.querySelector('ul');
		todoUl.addEventListener('click',function(e){
		var elementClicked = e.target;
		if(elementClicked.className === "deleteButton"){
			handlers.deleteTodos(parseInt(elementClicked.parentNode.id));
		}
	
	

		});

	}
};

view.setUpEventListeners();