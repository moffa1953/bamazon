// Pull in required dependencies
var inquirer = require('inquirer');
var mysql = require('mysql');
var colors = require('colors');
var clearTerminal = require("clear-terminal");


// Define the MySQL connection parameters
var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,

	// Your username
	user: 'root',

	// Your password
	password: '',
	database: 'bamazonDB'
});


clearTerminal()

mainMenu()


		function mainMenu() {

			inquirer.prompt([
				{
					type: 'list',
					name: 'option',
					message: 'Please select an option:',
					choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product','Exit'],
					filter: function (value) {

					switch (value) {
					    case 'View Products for Sale':
					        return 'sale'
					        break;
					    case 'View Low Inventory':
					        return 'lowInventory'
					        break;
					    case 'Add to Inventory':
					        return 'addToStock'
					        break;
					    case 'Add New Product':
					        return 'newProduct'
					        break;			    
					    case 'Exit':
					        return 'gotoEnd'
					        break;
					    default:
					        console.log("This should not happend")
					}            // end of switch 

					}
				}
			]).then(function(answer) {

				switch (answer.option) {
				    case 'sale':
				        currentInventory();
				        break;
				    case 'lowInventory':
				        lowInventory();
				        break;
				    case 'addToStock':
				        addStock();
				        break;
				    case 'newProduct':
				        newProduct();
				        break; 
				    case 'gotoEnd':
				    	console.log('\n\n\nGOODBYE\n\n'.red)
				        connection.end();
				        break;               
				    default:
						console.log('No such option! - goodbye!'.red);
						connection.end()
				}            // end of switch 

			})
		}

		function currentInventory() {
			// console.log('___ENTER displayInventory___');

			// Construct the db query string
			queryStr = 'SELECT * FROM products';

			// Make the db query
			connection.query(queryStr, function(err, data) {
				if (err) throw err;

				console.log('\tCurrent Inventory');
				console.log('\t------------------\n');

				var strOut = '';
				console.log("\tItem ID\tProduct Name\t\tDepartment\tPrice\tQuanity\n".yellow)

				for (var i = 0; i < data.length; i++) {
					console.log("\t"+data[i].item_id+
						"\t"+data[i].product_name +
						"\t\t"+data[i].department_id +
						"\t"+data[i].price+"\t"+data[i].stock_quantity+" ".yellow)
				}
			  	console.log("-------------------\n".yellow);

				mainMenu();
			})
		}

		function lowInventory() {

			queryStr = 'SELECT * FROM products WHERE stock_quantity < 12';

			connection.query(queryStr, function(err, data) {
				if (err) throw err;

				console.log('\tLow Inventory Items (< 5)'.yellow);
				console.log('\t-------------------------\n');

				for (var i = 0; i < data.length; i++) {
					console.log("\t"+data[i].item_id+
						"\t"+data[i].product_name +
						"\t\t"+data[i].department_id +
						"\t"+data[i].price+"\t"+data[i].stock_quantity)
				}
				console.log('\t-------------------------\n'.yellow);

				mainMenu();
			})
		}

		function addStock() {

			inquirer.prompt([
				{
					type: 'input',
					name: 'item_id',
					message: 'Enter Product ID',
					validate: checkNumber(),
					filter: Number
				},
				{
					type: 'input',
					name: 'quantity',
					message: 'Quantity to increase stock',
					validate: checkNumber,
					filter: Number
				}
			]).then(function(answers) {

				// check if item exists
				var queryStr = 'SELECT * FROM products WHERE ?';

				connection.query(queryStr, {item_id: answers.item_id}, function(err, data) {
					if (err) throw err;

					if (data.length === 0) {
						console.log('\n\t======================'.red)
						console.log('\tInvalid Product ID'.red);
						console.log('\t======================\n'.red)
						addStock();

					} else {
						var prodData = data[0];

						var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (prodData.stock_quantity + answers.quantity)+' WHERE item_id = ' + answers.item_id;

						connection.query(updateQueryStr, function(err, data) {
							if (err) throw err;
							console.log("\n\t=========================================".yellow);
							console.log('\t'+prodData.product_name + ' stock quantity has been adjusted '.yellow);
							console.log('\tThe current inventory count is: '.yellow+ (prodData.stock_quantity + answers.quantity));					
							console.log("\t=========================================\n");

							mainMenu();
						})
					}
				})
			})
		}

		function newProduct() {

			inquirer.prompt([
				{
					type: 'input',
					name: 'product_name',
					message: 'Product name:',
				},
				{
					type: 'input',
					name: 'department_id',
					message: 'Department ID:',
				},
				{
					type: 'input',
					name: 'price',
					message: 'Unit Price:',
					validate: checkDecimal
				},
				{
					type: 'input',
					name: 'stock_quantity',
					message: 'Stock Qty:',
					validate: checkNumber
				}
			]).then(function(answers) {

				answers.product_sales = 0  // default value for product sales

				var queryStr = 'INSERT INTO products SET ?';

				// Add new product to the db
				connection.query(queryStr, answers, function (error, results, fields) {
					if (error) throw error;
					console.log('\n===========================================================\n'.yellow);
					console.log('\n\tA new product has been created for '.yellow+answers.product_name)
					console.log('\n\tThe product id is: '.yellow+ results.insertId + ' ');
					console.log('\n===========================================================\n\n'.yellow);

					mainMenu();
				});
			})
		}

		function checkNumber(value) {
	        result = false

            if((value % 1) != 0) {
              		console.log("Please enter a whole number".red)
                      } else {
                      		if(value < 0) {
                      			console.log("Please enter a positive number".red)
                      		} else {
                      			if(value == "") {
                      				console.log("An numeric entry must be made".red)
                      			} else {
                      				if(/[0-9]/.test(value)) {
                      					
                      					result = true
                      				}
                      			}
               		}
            }
            return result                    
                
		}

		function checkDecimal(value) {
	        result = false

            if((value % 1) == 0) {
              		console.log("This prompt requires a 2 digit number".red)
                      } else {
                      		if(value < 0) {
                      			console.log("Please enter a positive number".red)
                      		} else {
                      			if(value == "") {
                      				console.log("An numeric entry must be made".red)
                      			} else {
                      				if(/[0-9]/.test(value)) {
                      					
                      					result = true
                      				}
                      			}
               		}
            }
            return result                    
                
		}
