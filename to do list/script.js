/* ================= LOAD ================= */
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let timers = {};

/* ================= FIX OLD TASKS ================= */
// ensure every task has id
tasks.forEach(t => {
  if (!t.id) t.id = Date.now().toString() + Math.random();
});

/* ================= SAVE ================= */
function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* ================= NOTIFICATION ================= */
if ("Notification" in window && Notification.permission === "default") {
  Notification.requestPermission();
}

/* ================= REMINDER ================= */
function scheduleReminder(task) {
  if (!task.date || !task.time) return;

  const target = new Date(task.date + " " + task.time).getTime();
  const delay = target - Date.now();
  if (delay <= 0) return;

  if (timers[task.id]) clearTimeout(timers[task.id]);

  timers[task.id] = setTimeout(() => {
    if (Notification.permission === "granted") {
      new Notification("⏰ Task Reminder", { body: task.text });
    } else {
      alert("Reminder: " + task.text);
    }
  }, delay);
}

/* ================= SHOW ================= */
function showTasks() {

  tasks.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;

    const d1 = new Date((a.date||"2100-01-01")+" "+(a.time||"23:59"));
    const d2 = new Date((b.date||"2100-01-01")+" "+(b.time||"23:59"));
    return d1 - d2;
  });

  const list = document.getElementById("taskList");
  list.innerHTML = "";

  if (tasks.length === 0) {
    list.innerHTML = "<p>No tasks yet</p>";
    updateStats();
    save();
    return;
  }

  tasks.forEach(task => {
    const li = document.createElement("li");

    if (task.done) li.classList.add("completed");
    if (task.pinned) li.classList.add("pinned");

    const today = new Date().toISOString().split("T")[0];
    if (task.date === today) li.classList.add("today");

    li.innerHTML = `
      <div>
        <span onclick="toggleTask('${task.id}')">${task.text}</span>
        <div class="time">
          ${task.date ? "📅 "+task.date : ""}
          ${task.time ? " ⏰ "+task.time : ""}
        </div>
      </div>

      <div>
        <button onclick="pinTask('${task.id}')">📌</button>
        <button onclick="editTask('${task.id}')">✏</button>
        <button onclick="deleteTask('${task.id}', this)">✖</button>
      </div>
    `;

    list.appendChild(li);
    scheduleReminder(task);
  });

  save();
  updateStats();
}

/* ================= ADD ================= */
function addTask() {
  const input = document.getElementById("taskInput");
  const date = document.getElementById("taskDate").value;
  const time = document.getElementById("taskTime").value;

  const text = input.value.trim();
  if (!text) return alert("Enter task");

  const newTask = {
    id: Date.now().toString(),
    text,
    done:false,
    date,
    time,
    pinned:false
  };

  tasks.push(newTask);
  input.value="";
  document.getElementById("taskDate").value="";
  document.getElementById("taskTime").value="";

  showTasks();
}

/* ================= DELETE (FIXED) ================= */
function deleteTask(id, btn) {
  const li = btn.closest("li");
  li.classList.add("fade-out");

  setTimeout(() => {
    // force string compare
    tasks = tasks.filter(t => String(t.id) !== String(id));

    // clear reminder
    if (timers[id]) clearTimeout(timers[id]);

    save();       // IMPORTANT
    showTasks();  // refresh UI
  }, 250);
}

/* ================= TOGGLE ================= */
function toggleTask(id) {
  const t = tasks.find(t => String(t.id) === String(id));
  if (!t) return;

  t.done = !t.done;
  save();
  showTasks();
}

/* ================= EDIT ================= */
function editTask(id) {
  const t = tasks.find(t => String(t.id) === String(id));
  if (!t) return;

  const newText = prompt("Edit task:", t.text);
  if (newText && newText.trim()) {
    t.text = newText.trim();
    save();
    showTasks();
  }
}

/* ================= PIN ================= */
function pinTask(id) {
  const t = tasks.find(t => String(t.id) === String(id));
  if (!t) return;

  t.pinned = !t.pinned;
  save();
  showTasks();
}

/* ================= STATS ================= */
function updateStats() {
  document.getElementById("totalTasks").innerText =
    tasks.length + " tasks";

  document.getElementById("pendingTasks").innerText =
    tasks.filter(t=>!t.done).length + " pending";

  document.getElementById("completedTasks").innerText =
    tasks.filter(t=>t.done).length + " done";
}

/* ================= ENTER ================= */
document.getElementById("taskInput")
.addEventListener("keypress", e=>{
  if(e.key==="Enter") addTask();
});

/* ================= PICKER ================= */
document.getElementById("taskDate").onclick = function(){
  this.showPicker();
};
document.getElementById("taskTime").onclick = function(){
  this.showPicker();
};

/* ================= INIT ================= */
showTasks();
