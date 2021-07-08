var options = {
  method: 'GET',
  success: function(res) {
    // Parses the JSON object and processes the data from it
    const obj = JSON.parse(res.response)
    ProcessData(obj.data)
  },
  error: function(res) {
  }
}

// Performs ajax request for desired page number
function ajaxRequest(pagenumber = 1) {
  ajax("https://reqres.in/api/users?page=" + pagenumber, options);
}

// Processes data in JSON format and puts it into a table
function ProcessData(data) {

  // Creates a list of column headings
  var col = [];
        for (var i = 0; i < data.length; i++) {
            for (var key in data[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

  var table = document.createElement("table");

  var tr = table.insertRow(-1);

  // Formats headings properly
  for (var i = 0; i < col.length; i++) {
      var th = document.createElement("th");
      var header = ""
      if (i == 0) {
        header = "ID"
      } else if (i == 1) {
        header = "Email";
      } else if (i == 2) {
        header = "First Name";
      } else if (i == 3) {
        header = "Last Name";
      } else if (i == 4) {
        header = "Avatar";
      }
      th.innerHTML = header;
      tr.appendChild(th);
  }

  // Loops through all data entries and adds to the table
  for (var i = 0; i < data.length; i++) {

      tr = table.insertRow(-1);

      for (var j = 0; j < col.length; j++) {
          var currentData = data[i][col[j]]
          var tabCell = tr.insertCell(-1);
          if (j == 1) {
            // If data is an email, format as href
            var a = document.createElement("a");
            var linkText = document.createTextNode(currentData);
            a.appendChild(linkText);
            a.title = currentData;
            a.href = "mailto:" + currentData;
            tabCell.appendChild(a);
          } else if (j == col.length - 1) {
            // If data is an image, format as img
            var x = document.createElement("IMG");
            x.setAttribute("src", String(currentData));
            tabCell.appendChild(x);
          } else {
            // Otherwise just format data as normal
            tabCell.innerHTML = currentData;
          }

      }
  }

  var divShowData = document.getElementById('result-list');
  divShowData.innerHTML = "";
  divShowData.appendChild(table); // Add table to specified div section in html
}
