let todoinp = document.querySelector("#task-input");

let ol = document.querySelector(".task-list");

const supabaseClient = supabase.createClient(
  "https://btcbqmdbztukpzjahtoo.supabase.co",
  "sb_publishable_KYmSt_4SfCKYSp-_0acx2w_om_GWtRA",
);

const addtodo = async (event) => {
  event.preventDefault();

  let todo = todoinp.value;

  await supabaseClient.from("todos").insert({ todo });
};

const getData = async () => {
  const response = await supabaseClient.from("todos").select("*");

  const todos = response.data;
  for (let i = 0; i < todos.length; i++) {
    const taskHTML = `
<li class="task-item" role="listitem">
  <div class="task-inner">
    <div class="task-number"></div>

    <input class="task-check" type="checkbox" id="task-1">

    <label class="task-text" for="task-1">${todos[i].todo}</label>

    <div class="task-actions">
      <button class="btn-icon btn-edit" type="button">✏️</button>
      <button class="btn-icon btn-delete" type="button">🗑️</button>
    </div>
  </div>

  <div class="task-separator"></div>

  <div class="task-meta">
    <time class="task-date" datetime="2026-10-18">Due Oct 18</time>
  </div>
</li>
`;

    ol.innerHTML += taskHTML;
  }
};
getData();
