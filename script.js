const input    = document.getElementById("input");
const addBtn   = document.getElementById("add");
const listEl   = document.getElementById("list");
const counter  = document.getElementById("counter");
const clearBt  = document.getElementById("clear");
const dateEl   = document.getElementById("date");

// today's date, formatted like a boutique menu
dateEl.textContent = new Date().toLocaleDateString("en-GB", {
  weekday: "long", day: "numeric", month: "long"
});

let items = JSON.parse(localStorage.getItem("maison.paper") || "[]");

const save = () =>
  localStorage.setItem("maison.paper", JSON.stringify(items));

function render() {
  listEl.innerHTML = "";

  if (!items.length) {
    const e = document.createElement("li");
    e.className = "empty";
    e.textContent = "your list awaits its first treasure…";
    listEl.appendChild(e);
  } else {
    items.forEach((item, i) => {
      const li = document.createElement("li");
      li.className = "item" + (item.done ? " done" : "");

      const box = document.createElement("span");
      box.className = "box";
      box.addEventListener("click", () => toggle(i));

      const text = document.createElement("span");
      text.className = "text";
      text.textContent = item.text;
      text.addEventListener("click", () => toggle(i));

      const del = document.createElement("button");
      del.className = "remove";
      del.textContent = "×";
      del.title = "Remove";
      del.addEventListener("click", () => remove(i));

      li.append(box, text, del);
      listEl.appendChild(li);
    });
  }

  const left = items.filter(i => !i.done).length;
  counter.textContent =
    `${items.length} item${items.length === 1 ? "" : "s"} · ${left} remaining`;
}

function add() {
  const text = input.value.trim();
  if (!text) return;
  items.push({ text, done: false });
  input.value = "";
  input.focus();
  save();
  render();
}

function toggle(i) { items[i].done = !items[i].done; save(); render(); }
function remove(i) { items.splice(i, 1);              save(); render(); }

addBtn.addEventListener("click", add);
input.addEventListener("keydown", e => { if (e.key === "Enter") add(); });

clearBt.addEventListener("click", () => {
  if (items.length && confirm("Remove all items?")) {
    items = [];
    save();
    render();
  }
});

render();
