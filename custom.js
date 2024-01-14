// custom.js

document.addEventListener("DOMContentLoaded", function () {
    // Load existing user details from the API using the GET method
    axios.get("https://crudcrud.com/api/725f31b7a3ac467dbef43cd7f5816f49/appointmentData")
      .then(response => {
        console.log(response);

  
        const existingUsers = response.data;
        existingUsers.forEach(user => {
          showUserOnScreen(user);
        });
      })
      .catch(error => console.error('Error fetching existing users:', error));
  });
  
  function handleFormSubmit(event) {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
  
    const user = {
      username,
      email,
      phone
    };
  
    // Check if the form is in edit mode
    const editMode = document.getElementById('editMode').value === 'true';
  
    if (editMode) {
      // If in edit mode, update the user details in the API
      const userId = document.getElementById('userId').value;
      updateUser(userId, user);
    } else {
      // If not in edit mode, show the user details on the screen and save to API
      showUserOnScreen(user);
    }
  
    // Clear form fields
    document.getElementById('username').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
  
    // Reset edit mode status
    document.getElementById('userId').value = '';
    document.getElementById('editMode').value = 'false';
  }
  
  function showUserOnScreen(user) {
    const userList = document.getElementById('userList');
    const li = document.createElement('li');
  
    for (const property in user) {
      if (user.hasOwnProperty(property)) {
        const propertyValue = user[property];
        if (propertyValue !== undefined) {
          const textNode = document.createTextNode(`${property}: ${propertyValue} `); // Add space at the end
          li.appendChild(textNode);
        }
      }
    }
  
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function () {
      // Implement the logic to delete the user from the API and then remove from the list
      // Since we're using GET, we'll make a DELETE request here.
      deleteUser(user._id, li);
    };
  
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = function () {
      // Implement the logic to set the form in edit mode and populate with user details
      setEditMode(user);
    };
  
    li.appendChild(deleteButton);
    li.appendChild(editButton);
  
    userList.appendChild(li);
  }
  
  function deleteUser(userId, listItem) {
    // Make a DELETE request to remove the user from the API
    axios.delete(`https://crudcrud.com/api/725f31b7a3ac467dbef43cd7f5816f49/appointmentData/${userId}`)
      .then(response => {
        console.log('User deleted successfully:', response);
  
        // Remove the user details from the website
        listItem.remove();
      })
      .catch(error => console.error('Error deleting user:', error));
  }
  
  function setEditMode(user) {
    // Set the form in edit mode and populate with user details
    document.getElementById('username').value = user.username;
    document.getElementById('email').value = user.email;
    document.getElementById('phone').value = user.phone;
  
    // Store user ID and set edit mode status
    document.getElementById('userId').value = user._id;
    document.getElementById('editMode').value = 'true';
  }
  
  function updateUser(userId, updatedUser) {
    // Make a PUT request to update the user details in the API
    axios.put(`https://crudcrud.com/api/725f31b7a3ac467dbef43cd7f5816f49/appointmentData/${userId}`, updatedUser)
      .then(response => {
        console.log('User updated successfully:', response);
  
        // Update the user details on the website
        // In this example, we will simply replace the existing user details with the updated ones
        // You may want to implement a more sophisticated update logic based on your UI design
        const userList = document.getElementById('userList');
        const existingUserElement = Array.from(userList.children).find(li => li.querySelector('button[data-id]').dataset.id === userId);
        if (existingUserElement) {
          existingUserElement.remove();
          showUserOnScreen(updatedUser);
        }
      })
      .catch(error => console.error('Error updating user:', error));
  }
  