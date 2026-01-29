let doctors = [];

// load JSON
fetch("doctors.json")
    .then(res => res.json())
    .then(data => {
        doctors = data;
    })
    .catch(err => console.error(err));

function displayDoctors(list) {
    const tableBody = document.getElementById("doctorTable");
    tableBody.innerHTML = "";

    if (list.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="4">No doctors found</td>
            </tr>
        `;
        return;
    }

    list.forEach(doc => {
        tableBody.innerHTML += `
            <tr>
                <td>${doc.name}</td>
                <td>${doc.specialization}</td>
                <td>${doc.availability.join(", ")}</td>
                <td>
                    <button onclick="alert('Appointment booking coming soon')">
                        Book Appointment
                    </button>
                </td>
            </tr>
        `;
    });
}

function applyFilters() {
    const nameVal = document.getElementById("nameSearch").value.toLowerCase();
    const specVal = document.getElementById("specSearch").value.toLowerCase();
    const dayVal  = document.getElementById("dayFilter").value;

    const tableSection = document.querySelector(".table-section");

    // hide table if nothing typed/selected
    if (!nameVal && !specVal && !dayVal) {
        tableSection.style.display = "none";
        return;
    }

    // show table once user interacts
    tableSection.style.display = "block";

    const filtered = doctors.filter(doc =>
        doc.name.toLowerCase().includes(nameVal) &&
        doc.specialization.toLowerCase().includes(specVal) &&
        (dayVal === "" || doc.availability.includes(dayVal))
    );

    displayDoctors(filtered);
}

// live listeners
document.getElementById("nameSearch").addEventListener("keyup", applyFilters);
document.getElementById("specSearch").addEventListener("keyup", applyFilters);
document.getElementById("dayFilter").addEventListener("change", applyFilters);
