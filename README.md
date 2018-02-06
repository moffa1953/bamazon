# bamazon
Node js and MySQL Homework (Bamazon)

BamazonCustomer

Addition item done that were not in the specs

Department Validation
Order sales added to total sales for Bamazon Supervisor

	Current Inventory
	-----------------

	id	Description		Department		price

	1	Mens Dress Pants	Mens		69.99
	2	Mens Dress Shirts	Mens		49.99
	3	Mens Dress Shoes	Mens		89.99
	4	Mens Dress Coats	Mens		129.99
	5	Ladies Dress Pants	Ladies		69.99
	6	Ladies Dress Shirts	Ladies		49.99
	7	Ladies Dress Shoes	Ladies		89.99
	8	Ladies Dress Coats	Ladies		129.99
	9	Kids's Dress Pants	Kids		69.99
	10	Kids Dress Shirts	Kids		49.99
	11	Kids Dress Shoes	Kids		89.99
	12	Kids Dress Coats	Kids		129.99


? Please enter the product id. 11
? Enter the quantity you wish to buy? 3


	========================================================
	Your order has been placed! 
	Your total is $269.97
	Thank you for shopping with us!
	========================================================


? Please select an option: (Use arrow keys)
❯ View Products for Sale 
  View Low Inventory 
  Add to Inventory 
  Add New Product 
  Exit 	


	Current Inventory
	------------------

	Item ID	Product Name		Department	Price	Quanity

	1	Mens Dress Pants		Mens	69.99	8 
	2	Mens Dress Shirts		Mens	49.99	13 
	3	Mens Dress Shoes		Mens	89.99	8 
	4	Mens Dress Coats		Mens	129.99	10 
	5	Ladies Dress Pants		Ladies	69.99	11 
	6	Ladies Dress Shirts		Ladies	49.99	13 
	7	Ladies Dress Shoes		Ladies	89.99	8 
	8	Ladies Dress Coats		Ladies	129.99	11 
	9	Kids's Dress Pants		Kids	69.99	11 
	10	Kids Dress Shirts		Kids	49.99	13 
	11	Kids Dress Shoes		Kids	89.99	5 
	12	Kids Dress Coats		Kids	129.99	14 


? Please select an option: (Use arrow keys)
  View Products for Sale 
> View Low Inventory 
  Add to Inventory 
  Add New Product 
  Exit 
? Please select an option: View Low Inventory

	Low Inventory Items (< 10)
	-------------------------

	1	Mens Dress Pants		Mens	69.99	8
	3	Mens Dress Shoes		Mens	89.99	8
	4	Mens Dress Coats		Mens	129.99	10
	5	Ladies Dress Pants		Ladies	69.99	11
	7	Ladies Dress Shoes		Ladies	89.99	8
	8	Ladies Dress Coats		Ladies	129.99	11
	9	Kids's Dress Pants		Kids	69.99	11
	11	Kids Dress Shoes		Kids	89.99	5
	-------------------------

----------------------------------------------------------------------
==============
BAMAZONMANAGER
==============

? Please select an option: (Use arrow keys)
  View Products for Sale 
  View Low Inventory 
> Add to Inventory 
  Add New Product 
  Exit 
? Please select an option: Add to Inventory

? Please select an option: Add to Inventory
? Enter Product ID 5
? Quantity to increase stock 4

	=========================================
	Ladies Dress Pants stock quantity has been adjusted 
	The current inventory count is: 15
	=========================================

? Please select an option: Add New Product
? Product name: Mens Sport Coat
? Sales Departmentepartment? 10000-Mens
? Unit Price: 249.99
? Stock Qty: 4

===========================================================


	A new product has been created for Mens Sport Coat
	The product id is: 13 

===========================================================


? Please select an option: View Products for Sale
	Current Inventory
	------------------

	Item ID	Product Name		Department	Price	Quanity

	1	Mens Dress Pants		Mens	69.99	8 
	2	Mens Dress Shirts		Mens	49.99	13 
	3	Mens Dress Shoes		Mens	89.99	8 
	4	Mens Dress Coats		Mens	129.99	10 
	5	Ladies Dress Pants		Ladies	69.99	15 
	6	Ladies Dress Shirts		Ladies	49.99	13 
	7	Ladies Dress Shoes		Ladies	89.99	8 
	8	Ladies Dress Coats		Ladies	129.99	11 
	9	Kids's Dress Pants		Kids	69.99	11 
	10	Kids Dress Shirts		Kids	49.99	13 
	11	Kids Dress Shoes		Kids	89.99	5 
	12	Kids Dress Coats		Kids	129.99	14 
	13	Mens Sport Coat			Mens	249.99	4 

=================
BAMAZONSUPERVISOR
=================

? Please select an option: (Use arrow keys)
❯ View Department Sales 
  Create New Department 
  Exit

? Please select an option: View Department Sales


	Sales By Department
	------------------

	Dept ID		Dept Name	Overhead	Sales		Profit

	10000		Mens		50.75		729.93		679.18 
	20000		Ladies		75.25		0.00		0.00 
	30000		Kids		28.50		0.00		0.00 


? Please select an option: (Use arrow keys)
❯ View Department Sales 
  Create New Department 
  Exit 


? Please select an option: Create New Department
? Department ID (5 digits): 40000
? Department Name: Bedding
? Over Head Amt: 42.50
===========================================================
	A new department has been created for Bedding
	The department id is: 40000 
===========================================================
