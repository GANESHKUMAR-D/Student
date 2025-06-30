let students = JSON.parse(localStorage.getItem('students')) || [];

function renderTable() {
  const tableBody = document.querySelector('#student-table tbody');
  tableBody.innerHTML = '';
  students.forEach((student, index) => {
    tableBody.innerHTML += `
      <tr>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.roll}</td>
        <td>${student.dob}</td>
        <td>${student.address}</td>
        <td>
          <button class="edit" onclick="editStudent(${index})">Edit</button>
          <button class="delete" onclick="deleteStudent(${index})">Delete</button>
        </td>
      </tr>
    `;
  });
  localStorage.setItem('students', JSON.stringify(students));
}

document.getElementById('student-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const newStudent = {
    name: document.getElementById('name').value,
    age: document.getElementById('age').value,
    roll: document.getElementById('roll').value,
    dob: document.getElementById('dob').value,
    address: document.getElementById('address').value,
  };
  if (this.dataset.editing) {
    students[this.dataset.editing] = newStudent;
    delete this.dataset.editing;
  } else {
    students.push(newStudent);
  }
  this.reset();
  renderTable();
});

function editStudent(index) {
  const student = students[index];
  document.getElementById('name').value = student.name;
  document.getElementById('age').value = student.age;
  document.getElementById('roll').value = student.roll;
  document.getElementById('dob').value = student.dob;
  document.getElementById('address').value = student.address;
  document.getElementById('student-form').dataset.editing = index;
}

function deleteStudent(index) {
  if (confirm('Are you sure you want to delete this student?')) {
    students.splice(index, 1);
    renderTable();
  }
}

renderTable();
