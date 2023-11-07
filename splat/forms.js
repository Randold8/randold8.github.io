
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById('date').textContent = today;
    
    // Replace the date on the website
    var dateElement = document.getElementById("date"); // replace '.website-date' with the actual selector for the date on your website
    if (dateElement) {
      dateElement.innerText = today;
    }
    document.getElementById('userForm').addEventListener('submit', function(e) {
        e.preventDefault();
  });