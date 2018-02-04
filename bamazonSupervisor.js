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
					choices: ['View Department Sales', 'Create New Department','Exit'],
					filter: function (value) {

					switch (value) {
					    case 'View Department Sales':
					        return 'deptSales'
					        break;
					    case 'Create New Department':
					        return 'newDept'
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
				    case 'deptSales':
				        viewSales();
				        break;
				    case 'newDept':
				        createDept();
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



		function viewSales() {
			// console.log('___ENTER displayInventory___');

			// Construct the db query string
			queryStr = "SELECT "+
							"P.department_id," +
							"D.dept_name," +
							"D.ohc," +
							"SUM(P.product_sales) AS TOT_SALES," +
							"(SUM(P.product_sales)-D.ohc) AS NEW_BAL " +
						"from "+
							"products as P, "+
							"departments as D "+
						"where "+
							"P.department_id = D.dept_id "+
						"GROUP BY "+
							"P.department_id"
			
			connection.query(queryStr, function(err, data) {
				if (err) throw err;

				console.log('\n\n\tSales By Department');
				console.log('\t------------------\n');

				var strOut = '';
				console.log("\tDept ID\t\tDept Name\tOverhead\tSales\t\tProfit\n".yellow)

				for (var i = 0; i < data.length; i++) {
					console.log("\t"+data[i].department_id+
						"\t\t"+data[i].dept_name +
						"\t\t"+formatNumber(data[i].ohc) +
						"\t\t"+formatNumber(data[i].TOT_SALES) +
						"\t\t"+formatNumber(data[i].NEW_BAL)+" ".yellow)
				}
			  	console.log("-------------------\n".yellow);

				mainMenu();
			})
		}
		function createDept() {

			inquirer.prompt([
				{
					type: 'input',
					name: 'dept_id',
					message: 'Department ID (5 digits):',
					validate: checkNumber,
				},
				{
					type: 'input',
					name: 'dept_name',
					message: 'Department Name:',
				},
				{
					type: 'input',
					name: 'ohc',
					message: 'Over Head Amt:',
					validate: checkDecimal
				}
			]).then(function(answers) {

				var queryStr = 'INSERT INTO departments SET ?';

				// Add new product to the db
				connection.query(queryStr, answers, function (error, results, fields) {
					if (error) throw error;
					console.log('\n===========================================================\n'.yellow);
					console.log('\n\tA new department has been created for '.yellow+answers.depatment_name)
					console.log('\n\tThe product id is: '.yellow+ answers.dept_id + ' ');
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

		function formatNumber(number) {
					// this function a formatted numbers for displays 
					newFormat = number.toLocaleString('en',{minimumFractionDigits:2})
					return newFormat;
		}
