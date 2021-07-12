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

// Stan: Add a condition that will prevent bringin the page back again if the very same page is currently loaded
// Ethan: added variable to store current page and done!
var currentPage = 0;
// Performs ajax request for desired page number
function ajaxRequest(pagenumber = 1) {
  if (pagenumber != currentPage) {
    currentPage = pagenumber;
    ajax("https://reqres.in/api/users?page=" + pagenumber, options);
    changeButton(pagenumber); // Updates button style depending on page loaded
  }
}

function changeButton(pagenumber) {
  var btn1 = document.getElementById("btn1");
  var btn2 = document.getElementById("btn2");
  if (pagenumber == 1) {
    btn1.className = "clicked";
    btn2.className = "";
  } else if (pagenumber == 2) {
    btn1.className = "";
    btn2.className = "clicked";
  }
}

// STAN: a simple index object to give correct names, order and type
var keysToHeading = {
  avatar: {
    title: "Avatar",
    order: 10,
    type: "image"
  },
  email: {
    title: "E-mail",
    order: 40,
    type: "email"
  },
  first_name: {
    title: "First Name",
    order: 20,
    type: "string"
  },
  last_name: {
    title: "Last Name",
    order: 30,
    type: "string"
  },
}

// Processes data in JSON format and puts it into a table
function ProcessData(data) {

  // STAN: I like this idea where you can have a flexible number of colsumns!
  // Creates a list of colsumn headings
  // STAN: use plurals as it contains multiple elements
  var cols = [];
  // Stan: No need for loop, we can just test for length of the array and grab first element
  if (data.length > 0) {
    // Stan: try using -
    // var keys = Object.keys(data[0])
    // then use forEach method on the keys instead of for in loop
    // Ethan: done!
    var keys = Object.keys(data[0])
    keys.forEach(function columnMaker(key) {
      if (keysToHeading.hasOwnProperty(key)) {
        cols.push(key);
      }
    });

    // Order data by order value
    cols.sort(function(firstKey, secondKey) {
      return keysToHeading[firstKey].order - keysToHeading[secondKey].order
    })
  }

  var table = document.createElement("table");

  var tr = table.insertRow(-1);

  // Formats headings properly
  // STAN: try rewriting this to use forEach array method
  // Ethan: done!
  cols.forEach(function formatHeadings(col) {
    var th = document.createElement("th");
    th.innerHTML = keysToHeading[col].title;
    tr.appendChild(th);
  });

  // Loops through all data entries and adds to the table
  for (var i = 0; i < data.length; i++) {

      tr = table.insertRow(-1);

      for (var j = 0; j < cols.length; j++) {
          var col = cols[j]
          var currentData = data[i][col]
          var tabCell = tr.insertCell(-1);
          if (keysToHeading[col].type === 'email') {
            // If data is an email, format as href
            var a = document.createElement("a");
            var linkText = document.createTextNode(currentData);
            a.appendChild(linkText);
            a.title = currentData;
            a.href = "mailto:" + currentData;
            tabCell.appendChild(a);
          } else if (keysToHeading[col].type === 'image') {
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
