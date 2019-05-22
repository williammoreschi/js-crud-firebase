/* Crie um projeto no firebase (https://firebase.google.com/?hl=pt-BR) 
** seleciona qual o tipo de aplicação (web) e vc tera os dados da variavel firebaseConfig */
/*Your web app's Firebase configuration*/
var firebaseConfig = null;
/*Initialize Firebase*/
firebase.initializeApp(firebaseConfig);

var d = new Date();
var t =  d.getTime();
var counter = t;

document.getElementById("form").addEventListener("submit",(e)=>{
e.preventDefault();
var id = document.getElementById("idTask").value;
var taskName = document.getElementById("inputTask").value;
var description = document.getElementById("inputDescription").value;

if(parseInt(id)){
	updateTask(id,taskName,description);
}else{
	creatTask(taskName,description);
}

resetform();

});

function creatTask(taskName,description){
 console.log(counter);
 counter+=1;
 console.log(counter);
 var task = {
  task:taskName,
  id:counter,
  description:description
 }
 let db = firebase.database().ref("tasks/"+counter);
 db.set(task);
 readTask();
}

function readTask(){
	document.getElementById("cardSection").innerHTML='';
	var task = firebase.database().ref("tasks/");
	task.on("child_added",function(data){
		var taskValue = data.val();
		document.getElementById("cardSection").innerHTML+= `
		<div class ="card mb-3">
			<div class ="card-body">
				<h5 class="cart-title">${taskValue.task}</h5>
				<p class="cart-text">${taskValue.description}</p>
				<button type="button" class="btn btn-warning text-white" onclick="editTask(${taskValue.id},'${taskValue.task}','${taskValue.description}')">
				<i class="fas fa-edit"></i> Edit Task
				</button>
				<button type="button" class="btn btn-danger text-white" onclick="deleteTask(${taskValue.id})">
				<i class="fas fa-trash"></i> Delete Task
				</button>
			</div>
		</div>
		`;
	});
}

function editTask(id,task,description){
	document.getElementById("idTask").value=id;
	document.getElementById("inputTask").value=task;
	document.getElementById("inputDescription").value=description;
	document.getElementById("button1").classList.add('d-none');
	document.getElementById("button2").classList.remove('d-none');
	document.getElementById("button3").classList.remove('d-none');
}

function updateTask(id,taskName,description){
	var taskUpdated = {
		id:id,
		task:taskName,
		description:description
	};
	let db = firebase.database().ref("tasks/"+id);
	db.set(taskUpdated);
	readTask();
}

function deleteTask(id){
	let db = firebase.database().ref("tasks/"+id);
	db.remove();
	readTask();
}

function resetform(){
	document.getElementById("idTask").value="";
	document.getElementById("inputTask").value="";
	document.getElementById("inputDescription").value="";
	document.getElementById("button1").classList.remove('d-none');
	document.getElementById("button2").classList.add('d-none');
	document.getElementById("button3").classList.add('d-none');
}