let todoinp = document.querySelector("#task-input");

let ol = document.querySelector(".task-list");

let Totaltodo = document.querySelector(".stat-number");

const supabaseClient = supabase.createClient(
  "https://btcbqmdbztukpzjahtoo.supabase.co",
  "sb_publishable_KYmSt_4SfCKYSp-_0acx2w_om_GWtRA",
);

const addtodo = async (event) => {
  event.preventDefault();

  let todo = todoinp.value;

  await supabaseClient.from("todos").insert({ todo });

  getData();
};

const getData = async () => {
  ol.innerHTML = "";
  const response = await supabaseClient.from("todos").select("*");
  const todos = response.data;
  let add = 0;
  // console.log(todos);
  for (let i = 0; i < todos.length; i++) {
    const date = new Date(todos[i].created_at);
    add++;
    const date1 = date.getDate();
    const month = date.getMonth();

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const formattedDate = `${date1} ${months[month]}`;

    const taskHTML = `
    <li class="task-item" role="listitem">
    <div class="task-inner">
    <div class="task-number"></div>

    <input class="task-check" type="checkbox" id="task-1">

    <label class="task-text" for="task-1">${todos[i].todo}</label>

    <div class="task-actions">
      <button class="btn-icon btn-edit" type="button"  onclick="edittodo(${todos[i].id}, '${todos[i].todo}')">✏️</button>
      <button class="btn-icon btn-delete" type="button" onclick="deletetodo(${todos[i].id})">🗑️</button>
    </div>
    </div>

    <div class="task-separator"></div>

    <div class="task-meta">
    <time class="task-date" datetime="2026-10-18">${formattedDate}</time>
   </div>
   </li>
`;
    ol.innerHTML += taskHTML;
  }
  Totaltodo.innerHTML = add;
};
getData();

const deletetodo = async (id) => {
  const response = await supabaseClient.from("todos").delete().eq("id", id);
  // console.log(response)
  if (!response.error) {
    getData();
  }
};

const alltodoDelete = async () => {
  const response = await supabaseClient.from("todos").delete().neq("id", 0);

  getData();
};

const edittodo = async (id, oldtask) => {
  const newtask = prompt("Enter new task", oldtask);

  if (newtask === null || newtask.trim() === "") {
    return;
  }

  const response = await supabaseClient
    .from("todos")
    .update({ todo: newtask.trim() })
    .eq("id", id);

  if (!response.error) {
    getData();
  }
};

// Theme toggle button ko select karna
const themeToggle = document.querySelector(".theme-toggle");

// Button click par light class toggle karna
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");

  // User ki preference ko localStorage mein save karna
  const isLight = document.body.classList.contains("light");
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

// Page refresh ya dubara kholne par purani theme yaad rakhna
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light");
  }
});
