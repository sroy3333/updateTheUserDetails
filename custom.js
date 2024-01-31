let editingUser = null;

function handleFormSubmit(event) {
  event.preventDefault();

  // Get form values
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;

  // Create user object
  const user = {
    username,
    email,
    phone
  };

  if (editingUser) {
    // Update existing user
    axios.put(`https://crudcrud.com/api/2c99b26bb2e44bcdb6a6abdd551f8e5d/appointmentData/${editingUser._id}`, user)
      .then((response) => {
        console.log(response.data); // Log updated user details
        editingUser = response.data; // Update the editingUser with the updated details
        fetchUsers(); // Refresh the user list
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // Clear form fields
  document.getElementById('username').value = '';
  document.getElementById('email').value = '';
  document.getElementById('phone').value = '';
}

// Function to add user to the list
function addUserToList(user) {
  // Create li element
  const li = document.createElement('li');

  // Create text node with user details
  const textNode = document.createTextNode(
    `Username: ${user.username}, Email: ${user.email}, Phone: ${user.phone}`
  );

  // Create delete button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = function () {
    // Remove li element from the screen
    li.remove();
    console.log('Deleted user details:', user); // Log deleted user details
  };

  // Create edit button
  const editButton = document.createElement('button');
  editButton.innerHTML = 'Edit'; // Edit icon
  editButton.onclick = function () {
    // Populate form fields with existing values
    document.getElementById('username').value = user.username;
    document.getElementById('email').value = user.email;
    document.getElementById('phone').value = user.phone;

    // Set editing user
    editingUser = user;
  };

  // Append text node, delete button, and edit button to li
  li.appendChild(textNode);
  li.appendChild(deleteButton);
  li.appendChild(editButton);

  // Append li to the user list
  document.getElementById('userList').appendChild(li);
}

// Function to fetch users
function fetchUsers() {
  axios.get("https://crudcrud.com/api/2c99b26bb2e44bcdb6a6abdd551f8e5d/appointmentData")
    .then((response) => {
      console.log(response.data); // Log fetched user details
      const userList = document.getElementById('userList');
      userList.innerHTML = '';
      response.data.forEach(addUserToList);
    })
    .catch((err) => {
      console.error(err);
    });
}

// Fetch users on page load
fetchUsers();
