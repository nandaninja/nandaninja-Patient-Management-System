const correctPassword = 'admin123';

document.getElementById('loginPage').style.display = 'block';

function checkPassword() {
  const input = document.getElementById('passwordInput').value;
  if (input === correctPassword) {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('pmsPage').style.display = 'block';
    loadPMS();
  } else {
    document.getElementById('errorMsg').innerText = 'Incorrect password. Try again.';
  }
}

function loadPMS() {
  const sheetURL = 'https://opensheet.vercel.app/1z5wK5Wc0Xq45XPzaOXYQO88h1M0zdC1YjO8VfbsxJfk/Form%20Responses%201';

  fetch(sheetURL)
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('patientTable').getElementsByTagName('tbody')[0];
      data.forEach(patient => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td data-label="Timestamp">${patient["Timestamp"]}</td>
          <td data-label="Patient Name">${patient["Patient Name "] || ''}</td>
          <td data-label="Appointment Date">${patient["  Appointment Date"] || ''}</td>
          <td data-label="Appointment Time">${patient["Appointment Time"] || ''}</td>
          <td data-label="Mobile Number">${patient["Mobile Number(10 digits)"] || ''}</td>
          <td data-label="Email Address">${patient["Email Address "] || ''}</td>
          <td data-label="Patient's Age">${patient["Patient's Age"] || ''}</td>
          <td data-label="Pre-History of Diseases">${patient["Pre-History of Diseases "] || ''}</td>
          <td data-label="Type Of Service">${patient["Type Of Service"] || ''}</td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch(error => console.error('Error fetching data:', error));
}

function filterByDate() {
  const filterDate = document.getElementById('filterDate').value;
  const rows = document.querySelectorAll('#patientTable tbody tr');
  
  // If no filter is applied, show all rows
  if (filterDate === '') {
    rows.forEach(row => row.style.display = '');
    return;
  }

  rows.forEach(row => {
    const appointmentDate = row.cells[2].innerText.trim(); // The 3rd cell contains the appointment date
    const rowDate = new Date(appointmentDate); // Convert the date string to Date object
    const selectedDate = new Date(filterDate); // Convert the filter date to Date object

    // Compare both dates
    if (rowDate.toDateString() === selectedDate.toDateString()) {
      row.style.display = ''; // Show row if dates match
    } else {
      row.style.display = 'none'; // Hide row if dates don't match
    }
  });
}

function resetTable() {
  document.getElementById('filterDate').value = '';
  const rows = document.querySelectorAll('#patientTable tbody tr');
  rows.forEach(row => row.style.display = '');
}
