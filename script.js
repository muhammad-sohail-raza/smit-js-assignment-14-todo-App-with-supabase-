let todoinp = document.querySelector("#task-input");

let lable = document.querySelector(".task-text");

let todo = todoinp.value;

const addtodo = (event) => {
  event.preventDefault();

  console.log(todo);

  //   await supabaseClient.from("todos").insert({ todo });
};

const showData = async () => {
  ul.innerHTML = "";

  //   const response = await supabaseClient.from("todos").select("*");
  //   const todos = response.data;
  //   for (let i = 0; i < todos.length; i++) {}
  // lable.innerHTML += ;
};
getData();
