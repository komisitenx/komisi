// Data disimpan di localStorage
let db = JSON.parse(localStorage.getItem("jobchainPro")) || {
  transaksi: [],
  anggaran: [],
  rab: [],
  komisi: []
};

let currentUser = null;

// Simpan ke localStorage
function saveDB() {
  localStorage.setItem("jobchainPro", JSON.stringify(db));
}

// Login sistem
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "admin" && password === "123") {
    currentUser = "admin";
    document.getElementById("loginPage").classList.remove("active");
    document.getElementById("dashboardPage").classList.add("active");
    document.getElementById("roleInfo").innerText = "Login sebagai ADMIN";
    renderAll();
  } else if (username === "user" && password === "123") {
    currentUser = "user";
    document.getElementById("loginPage").classList.remove("active");
    document.getElementById("dashboardPage").classList.add("active");
    document.getElementById("roleInfo").innerText = "Login sebagai USER";
    renderAll();
    // User hanya bisa lihat komisi
    document.getElementById("formTransaksi").style.display = "none";
    document.getElementById("formAnggaran").style.display = "none";
    document.getElementById("formRab").style.display = "none";
    document.getElementById("formKomisi").style.display = "none";
  } else {
    document.getElementById("loginError").innerText = "Username atau Password salah!";
  }
}

// Logout
function logout() {
  currentUser = null;
  document.getElementById("dashboardPage").classList.remove("active");
  document.getElementById("loginPage").classList.add("active");
}

// Tampilkan section
function showSection(id) {
  document.querySelectorAll(".section").forEach(sec => sec.style.display = "none");
  document.getElementById(id).style.display = "block";
}

// Tambah data
function addData(event, type) {
  event.preventDefault();
  const inputs = event.target.querySelectorAll("input");
  const data = { text: inputs[0].value, number: inputs[1].value };
  db[type].push(data);
  saveDB();
  inputs[0].value = "";
  inputs[1].value = "";
  renderList(type);
}

// Hapus data
function deleteData(type, index) {
  db[type].splice(index, 1);
  saveDB();
  renderList(type);
}

// Render list
function renderList(type) {
  const listEl = document.getElementById("list" + capitalize(type));
  listEl.innerHTML = "";
  db[type].forEach((item, i) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.text} - Rp${item.number} 
      ${currentUser === "admin" ? `<button onclick="deleteData('${type}', ${i})">Hapus</button>` : ""}`;
    listEl.appendChild(li);
  });
}

// Render semua section
function renderAll() {
  ["transaksi", "anggaran", "rab", "komisi"].forEach(renderList);
  showSection("transaksi"); // default buka transaksi
}

// Capitalize helper
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
