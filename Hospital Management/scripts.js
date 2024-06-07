document.addEventListener('DOMContentLoaded', function() {
    // Handle form submission for adding patients
    const patientForm = document.getElementById('patientForm');
    if (patientForm) {
        patientForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const age = document.getElementById('age').value;
            const id = document.getElementById('id').value;
            const bedded = document.getElementById('bedded').value;
            const disease = document.getElementById('disease').value;
            const patients = JSON.parse(localStorage.getItem('patients')) || [];
            patients.push({ name, age, id, bedded, disease });
            localStorage.setItem('patients', JSON.stringify(patients));
            alert('Patient added successfully');
            patientForm.reset();
        });
    }

    // Handle form submission for adding doctors
    const doctorForm = document.getElementById('doctorForm');
    if (doctorForm) {
        doctorForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const specialization = document.getElementById('specialization').value;
            const id = document.getElementById('id').value;
            const doctors = JSON.parse(localStorage.getItem('doctors')) || [];
            doctors.push({ name, specialization, id });
            localStorage.setItem('doctors', JSON.stringify(doctors));
            alert('Doctor added successfully');
            doctorForm.reset();
        });
    }

    // Display total counts on index page
    const totalPatientsElement = document.getElementById('totalPatients');
    const totalDoctorsElement = document.getElementById('totalDoctors');
    if (totalPatientsElement && totalDoctorsElement) {
        const patients = JSON.parse(localStorage.getItem('patients')) || [];
        const doctors = JSON.parse(localStorage.getItem('doctors')) || [];
        totalPatientsElement.textContent = patients.length;
        totalDoctorsElement.textContent = doctors.length;
    }

    // List Patients
    const patientTable = document.getElementById('patientTable');
    if (patientTable) {
        const patients = JSON.parse(localStorage.getItem('patients')) || [];
        const tbody = patientTable.querySelector('tbody');
        patients.forEach(patient => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${patient.name}</td><td>${patient.age}</td><td>${patient.id}</td><td>${patient.bedded}</td><td>${patient.disease}</td>`;
            tbody.appendChild(tr);
        });
    }

    // List Doctors
    const doctorTable = document.getElementById('doctorTable');
    if (doctorTable) {
        const doctors = JSON.parse(localStorage.getItem('doctors')) || [];
        const tbody = doctorTable.querySelector('tbody');
        doctors.forEach(doctor => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${doctor.name}</td><td>${doctor.specialization}</td><td>${doctor.id}</td>`;
            tbody.appendChild(tr);
        });
    }

    // Search functionality on index page
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    if (searchInput && searchResults) {
        searchInput.addEventListener('input', function() {
            const query = searchInput.value.toLowerCase();
            const patients = JSON.parse(localStorage.getItem('patients')) || [];
            const doctors = JSON.parse(localStorage.getItem('doctors')) || [];
            const results = [];

            if (query) {
                // Filter patients
                patients.forEach(patient => {
                    if (patient.name.toLowerCase().includes(query) || patient.id.toLowerCase().includes(query)) {
                        results.push(`Patient: ${patient.name}, ID: ${patient.id}`);
                    }
                });

                // Filter doctors
                doctors.forEach(doctor => {
                    if (doctor.name.toLowerCase().includes(query) || doctor.id.toLowerCase().includes(query)) {
                        results.push(`Doctor: ${doctor.name}, ID: ${doctor.id}`);
                    }
                });
            }

            // Display results
            searchResults.innerHTML = '';
            if (results.length > 0) {
                results.forEach(result => {
                    const div = document.createElement('div');
                    div.textContent = result;
                    searchResults.appendChild(div);
                });
            } else {
                searchResults.innerHTML = '<div>No results found</div>';
            }
        });
    }
});