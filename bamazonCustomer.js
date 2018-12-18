var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
  
    port: 3306,
  
    user: "root",

    password: "root",
    database: "bamazon_db"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("---------------------------------");
    console.log("|    "+"***Welcome to BAMAZON***" + "    |");
    console.log("---------------------------------");
  });

function validateInput(value) {
  var integer = Number.isInteger(parseFloat(value));
  var sign = Math.sign(value);
  
  if (integer && (sign === 1)) {
    return true;
  } else {
    return 'Please enter a whole number.';
  }
}

function userPurchase(){
  inquirer.prompt([
    {
      type: "input",
      name: "item_id",
      message: "Please enter the Item ID which you'd like to purchase.",
      validate: validateInput,
      filter: Number
    },
    {
      type: "input",
      name: "quantity",
      message: "How many would you like to purchase?",
      validate: validateInput,
      filter: Number
    }
  ]).then(function(input){
    
    var item = input.item_id;
    var quantity = input.quantity;
    var query = 'SELECT * FROM products WHERE ?';

    console.log(item)

    connection.query(query, {item_id: item}, function(err, data){
      if (err) throw err;
      if(data.length === 0){
        console.log("ERROR: Invalid Item ID, Please select another ID.");
        displayTable();

      }else{
        var productData = data[0];
        if(quantity <= productData.stock_quantity) {
          console.log("Product is in stock, placing order!");

          var updateDB = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;
          connection.query(updateDB, function(err, data){
            if (err) throw err;
            console.log("Your order has been placed. Your total is $"+ productData.price * quantity);
            console.log("\n--------------------------------------------------------------------------\n");

            connection.end();
        
          })
        }else{
          console.log("Sorry, there is not enough inventory. Please modify your order.");
          console.log("\n-------------------------------------------------------------------------------\n");
          displayTable();
        }
      }
    })
  })
}

function displayTable() {
  query = 'SELECT * FROM products';

  connection.query(query, function(err, data){
    if (err) throw err;

    console.log("Current Inventory: ");
    console.log("--------------------------------------------------------------------------\n");

    var productTable = "";
    for (var i = 0; i< data.length; i++){
      productTable = "";
      productTable += data[i].item_id + "  ";
      productTable += "Product: " + data[i].product_name +" // ";
      productTable += "Department: " + data[i].department_name + " // ";
      productTable += "Price: $" + data[i].price + "\n";

      console.log (productTable);
    }

    console.log("--------------------------------------------------------------------------\n");

    userPurchase();
  })
}

displayTable();