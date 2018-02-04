var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require("colors")
var clearTerminal = require("clear-terminal")

// mySQL connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazonDB"
});

// if the connection is ok, start shopping
connection.connect(function(err) {
  if (err) throw err;  
});

		startShopping()

		function startShopping() {

				clearTerminal()

				displayInventory()
		}

		function displayInventory() {
				sqlStr = "select item_id, product_name, departments.dept_name, price, stock_quantity  FROM products, departments where products.stock_quantity > '0' AND departments.dept_id = products.department_id"
				connection.query(sqlStr, function(err, data) {
					if (err) throw err;
					console.log("\tCurrent Inventory")
					console.log("\t-----------------\n")
					console.log("\tid\tDescription\t\tDepartment\t\tprice\n")
					if(data.length == 0) {
						console.log("\nThere is no inventory to display".red)
					} else {
						for(i=0; i < data.length; i++) {
							console.log("\t"+data[i].item_id +
								        "\t"+data[i].product_name +
								        "\t"+data[i].dept_name +
								        "\t\t"+data[i].price)
						}
					}
					console.log("\n")
					getOrder()
				})
		}


		function getOrder() {

				inquirer.prompt([
					{
						type: 'input',
						name: 'prod_id',
						message: 'Please enter the product id.',
						validate: validateInput,
						filter: Number
					},
					{
						type: 'input',
						name: 'quantity',
						message: 'Enter the quantity you wish to buy?',
						validate: validateInput,
						filter: Number
					}
				]).then(function(answers) {

					var queryStr = 'SELECT * FROM products WHERE ?';

					connection.query(queryStr, {item_id: answers.prod_id}, function(err, data) {
						if (err) throw err;

						// check if selection is valid
						if (data.length === 0) {
							clearTerminal()
							console.log("\n\tThe product id entered is not valid - try again\n".red);
							displayInventory();

						} else {
							// product is valid

							// check if we have stock
							if (answers.quantity <= data[0].stock_quantity) {

								unitPrice = data[0].price

								var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (data[0].stock_quantity - answers.quantity) + 
								', product_sales = '+
								((answers.quantity*data[0].price)+data[0].product_sales) + 
								' WHERE item_id = ' + answers.prod_id;

								console.log('updateQueryStr = ' + updateQueryStr);

								// Update the inventory
								connection.query(updateQueryStr, function(err, data) {
									if (err) throw err;
									clearTerminal()
									console.log("\t========================================================".yellow)
									console.log('\tYour order has been placed! '.yellow)
									console.log("\tYour total is $".yellow +(answers.quantity*unitPrice));
									console.log('\tThank you for shopping with us!'.yellow);
									console.log("\t========================================================".yellow);

									// End the database connection
									connection.end();
								})
							} else {
								clearTerminal()
								console.log("\t=============================================".red)
								console.log('\tSorry, we do not have enough inventory to'.red)
							    console.log('\tfullfill you order. Current stock qty is '.red+data[0].stock_quantity);
								console.log("\t===========================================".red);

								displayInventory();
							}
						}
					})
				})
			}

    		function validateInput(value) {
 
                      result = false

                      if((value % 1) != 0) {
                      		console.log("Please enter a whole number")
                      } else {
                      		if(value < 0) {
                      			console.log("Please enter a positive number")
                      		} else {
                      			if(value == "") {
                      				console.log("An numeric entry must be made")
                      			} else {
                      				if(/[0-9]/.test(value)) {
                      					console.log(/[0-9]/.test(value))
                      					result = true
                      				}
                      			}
                      		}
                      }

                      return result                    
                }
