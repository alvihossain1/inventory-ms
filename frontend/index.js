// CREATE PRODUCT
$("#createButton").click(function (e) {
  e.preventDefault();
  let productName = document.getElementById("productName").value
  let productDescription = document.getElementById("productDescription").value
  let price = document.getElementById("price").value
  let quantity = document.getElementById("quantity").value
  let type = document.getElementById("type").value

  if(productName == "" || productDescription == "" || price == "" || quantity == "" || type == ""){
    document.getElementById("outputCreate").innerHTML = "Please fill up all the fields.";
    return;
  }



  let object = {
    "productName": `${productName}`, "productDescription": `${productDescription}`, "price": `${price}`,
    "quantity": `${quantity}`, "type": `${type}`
  };

  let path = `http://localhost:4000/api/products`;
  $.ajax({
    url: path,
    type: "POST",
    data: object,
    success: function (data) {
      console.log(data);
      document.getElementById("outputCreate").innerHTML = `<h4> Data Inserted with ID: ${data[0].productID} </h4> ${table(data)}`;
    }
  });
})

// FETCH PRODUCT
$("#fetchButton").click(function (e) {
  e.preventDefault();

  let path = "http://localhost:4000/api/products";
  $.get(path, function (data, status) {
    // alert("Data: " + data + "\nStatus: " + status);
    console.log(data);
    document.getElementById("outputFetch").innerHTML = table(data);

  });
})

// FETCH PRODUCT BY ID
$("#fetchButtonID").click(function (e) {
  e.preventDefault();
  let id = document.getElementById("searchbyid").value

  if(id == ""){
    document.getElementById("outputFetchID").innerHTML = "Please enter id";
    return
  }

  let path = `http://localhost:4000/api/products:${id}`;
  $.get(path, function (data, status) {
    document.getElementById("outputFetchID").innerHTML = table(data);
  });
})


// UPDATE PRODUCT BY ID
$("#updateButtonID").click(function (e) {
  e.preventDefault();
  let productID = document.getElementById("uproductID").value
  let productName = document.getElementById("uproductName").value
  let productDescription = document.getElementById("uproductDescription").value
  let price = document.getElementById("uprice").value
  let quantity = document.getElementById("uquantity").value
  let type = document.getElementById("utype").value

  if(productID == ""){
    document.getElementById("outputUpdateID").innerHTML = "Please enter product ID";
    return;
  }

  let object = {
    "productName": `${productName}`, "productDescription": `${productDescription}`, "price": `${price}`,
    "quantity": `${quantity}`, "type": `${type}`
  };

  let path = `http://localhost:4000/api/products:${productID}`;
  $.ajax({
    url: path,
    type: "PUT",
    data: object,
    success: function (data) {
      document.getElementById("outputUpdateID").innerHTML = table(data);
    }
  });
})



// DELETE PRODUCT BY ID
$("#deleteButtonID").click(function (e) {
  e.preventDefault();

  let id = document.getElementById("deletebyID").value;
  if(id == ""){
    document.getElementById("outputDeleteID").innerHTML = "Please enter product ID";
    return;
  }

  let path = `http://localhost:4000/api/products:${id}`;
  $.ajax({
    url: path,
    type: 'DELETE',
    success: function (data) {
      console.log(data)
      document.getElementById("outputDeleteID").innerHTML = JSON.stringify(data);
    }
  });
})



// CUSTOM TABLE FUNCTION
function table(data) {
  if(data.length == 0){
    console.log("DOESNT EXIST")
    return "<h4> ID doesn't Exist </h4>";
  }
  console.log(data)
  let str = "";
  for (var i = 0; i < data.length; i++) {
    str = str + `
    <tr>
      <th scope="row">${i + 1}</th>
      <td>${data[i].productID}</td>
      <td>${data[i].productName}</td>
      <td>${data[i].productDescription}</td>
      <td>${data[i].price}</td>
      <td>${data[i].quantity}</td>
      <td>${data[i].type}</td>
    </tr>
    `;
  }
  return `
  <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Product ID</th>
      <th scope="col">Product Name</th>
      <th scope="col">Product Desc</th>
      <th scope="col">Price</th>
      <th scope="col">Quantity</th>
      <th scope="col">Type</th>
    </tr>
  </thead>
  <tbody>
    ${str}
  </tbody>
</table>
  `;
}

