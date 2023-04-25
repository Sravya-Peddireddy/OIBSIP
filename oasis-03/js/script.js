function myFunction() {
    var table = document.getElementById("myTable");
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var Task=document.getElementById("input-box").value;
    var Description=document.getElementById("description-box").value;
    cell1.innerHTML = Task;
    cell2.innerHTML = Description;
    cell3.innerHTML = "<button onclick=\"deleteRow(this)\">X</button>";
    document.getElementById("input-box").value = "";
    document.getElementById("description-box").value="";
    row.onclick = function() { toggleOverline(row); };
    saveTable();
    
  }

  function toggleOverline(row) {
    row.classList.toggle("overline");
  }


  function deleteRow(btn) {
    var row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
    var table = document.getElementById("myTable").innerHTML;
    localStorage.setItem("table", table);
    var index = row.rowIndex;
    var deletedItems = JSON.parse(localStorage.getItem("deletedItems")) || [];
    deletedItems.push(index);
    localStorage.setItem("deletedItems", JSON.stringify(deletedItems));
  }
  function saveTable() {
    var table = document.getElementById("myTable").innerHTML;
    localStorage.setItem("table", table);
  }

  function loadTable() {
    var table = localStorage.getItem("table");
    if (table) {
      document.getElementById("myTable").innerHTML = table;
      var rows = document.getElementsByTagName("tr");
      for (var i = 1; i < rows.length; i++) {
        rows[i].onclick = function() { toggleOverline(this); };
        var deleteButton = rows[i].getElementsByTagName("button")[0];
        deleteButton.onclick = function() { deleteRow(this); };
      }
    }
    var deletedItems = JSON.parse(localStorage.getItem("deletedItems")) || [];
    for (var i = 0; i < deletedItems.length; i++) {
      var row = document.getElementById("myTable").rows[deletedItems[i]];
      if (row) {
        row.classList.add("deleted");
      }
    }
  }
  
  function clearStorage() {
    localStorage.removeItem("table");
    localStorage.removeItem("deletedItems");
  }
  
  
  
  
  
  
  