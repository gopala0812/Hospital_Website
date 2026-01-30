/* ================================
   Sidebar Toggle (Mobile Friendly)
================================ */
function toggleSidebar() {
    const sidebar = document.querySelector(".sidebar");
    if (sidebar) {
        sidebar.classList.toggle("open");
    }
}

/* ================================
   LOGIN LOGIC (FINAL – NO ROLE)
================================ */
function handleLogin(event) {
    event.preventDefault();

    const usernameEl = document.getElementById("username");
    const passwordEl = document.getElementById("password");

    if (!usernameEl || !passwordEl) {
        alert("Login fields not found");
        return;
    }

    const username = usernameEl.value.trim();
    const password = passwordEl.value.trim();

    if (username === "" || password === "") {
        alert("Please enter username and password");
        return;
    }

    // MOCK AUTHENTICATION
    if (username === "admin" && password === "admin") {
        alert("Staff login successful");
        window.location.href = "staff.html";
    } else {
        alert("Patient login successful");
        window.location.href = "patient.html";
    }
}

/* ================================
   Section Switching (Patient/Staff)
================================ */
function showSection(id) {
    const sections = document.querySelectorAll(".section");
    sections.forEach(section => {
        section.style.display = "none";
    });

    const target = document.getElementById(id);
    if (target) {
        target.style.display = "block";
    }
}

/* ================================
   Patient Registration (Staff)
================================ */
function registerPatient(event) {
    event.preventDefault();
    alert("Patient registered successfully");
    event.target.reset();
}

/* ================================
   Medicine Inventory Sorting
================================ */
function sortMedicines() {
    const table = document.querySelector("table");
    if (!table) return;

    let switching = true;

    while (switching) {
        switching = false;
        const rows = table.rows;

        for (let i = 1; i < rows.length - 1; i++) {
            let shouldSwitch = false;

            let x = parseInt(rows[i].cells[2].innerText);
            let y = parseInt(rows[i + 1].cells[2].innerText);

            if (x < y) {
                shouldSwitch = true;
                break;
            }
        }

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

/* ================================
   Feedback Submission
================================ */
function submitFeedback(event) {
    event.preventDefault();
    alert("Thank you for your feedback!");
    event.target.reset();
}
/* ================================
   Load Medicines from JSON
================================ */
document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.getElementById("medicineTable");

    if (!tableBody) return; // Only runs on staff page

    fetch("medicines.json")
        .then(response => response.json())
        .then(data => {
            tableBody.innerHTML = "";

            data.forEach(med => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${med.name}</td>
                    <td>${med.category}</td>
                    <td>${med.quantity}</td>
                `;

                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error("Error loading medicines:", error);
            tableBody.innerHTML =
                "<tr><td colspan='3'>Unable to load medicines</td></tr>";
        });
});
/* ================================
   PATIENT – DOCTOR SEARCH
================================ */

let doctorsData = [];
let doctorsLoaded = false;

document.addEventListener("DOMContentLoaded", () => {

    // Load doctors JSON
    fetch("doctors.json")
        .then(res => res.json())
        .then(data => {
            doctorsData = data;
            doctorsLoaded = true;
        })
        .catch(err => console.error("Doctor JSON error:", err));

    const nameInput = document.getElementById("nameSearch");
    const specInput = document.getElementById("specSearch");
    const dayFilter = document.getElementById("dayFilter");

    if (!nameInput || !specInput || !dayFilter) return;

    [nameInput, specInput, dayFilter].forEach(el => {
        el.addEventListener("input", filterDoctors);
    });
});

function filterDoctors() {
    if (!doctorsLoaded) return;

    const name = document.getElementById("nameSearch").value.toLowerCase();
    const spec = document.getElementById("specSearch").value.toLowerCase();
    const day = document.getElementById("dayFilter").value;

    const filtered = doctorsData.filter(doc => {
        const matchName = doc.name.toLowerCase().includes(name);
        const matchSpec = doc.specialization.toLowerCase().includes(spec);
        const matchDay = day === "" || doc.days.includes(day);
        return matchName && matchSpec && matchDay;
    });

    renderDoctors(filtered);
}

function renderDoctors(list) {
    const tbody = document.getElementById("doctorTable");
    const section = document.getElementById("doctorTableSection");

    tbody.innerHTML = "";

    if (list.length === 0) {
        section.style.display = "none";
        return;
    }

    section.style.display = "block";

    list.forEach(doc => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${doc.name}</td>
            <td>${doc.specialization}</td>
            <td>${doc.days.join(", ")}</td>
            <td>
                <button onclick="bookAppointment('${doc.name}')">
                    Book Appointment
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

/* ================================
   DUMMY BOOK APPOINTMENT
================================ */

function bookAppointment(doctorName) {
    alert("Appointment request sent for " + doctorName);
}
