/* define functions here */

// Function to populate HTML markups with data from data.js
function populateCartData() {
	for (var i = 0; i < filenames.length; i++) {
		// Set count
		var countElem = document.getElementById('count' + (i + 1));
		if (countElem) countElem.textContent = quantities[i];

		// Set price
		var priceElem = document.getElementById('price' + (i + 1));
		if (priceElem) priceElem.textContent = '$' + prices[i].toFixed(2);

		// Set amount
		var amountElem = document.getElementById('amount' + (i + 1));
		if (amountElem) amountElem.textContent = '$' + (quantities[i] * prices[i]).toFixed(2);
	}

	// Calculate subtotal
	var subtotal = 0;
	for (var i = 0; i < filenames.length; i++) {
		subtotal += quantities[i] * prices[i];
	}
	var subtotalElem = document.getElementById('subtotal');
	if (subtotalElem) subtotalElem.textContent = '$' + subtotal.toFixed(2);

	// Calculate tax (10%)
	var tax = subtotal * 0.10;
	var taxElem = document.getElementById('tax');
	if (taxElem) taxElem.textContent = '$' + tax.toFixed(2);

	// Shipping (fixed $40)
	var shipping = 40;
	var shippingElem = document.getElementById('shipping');
	if (shippingElem) shippingElem.textContent = '$' + shipping.toFixed(2);

	// Grand total
	var total = subtotal + tax + shipping;
	var totalElem = document.getElementById('total');
	if (totalElem) totalElem.textContent = '$' + total.toFixed(2);
}

// calculate total based on subtotal, tax and shipping values from cisc3003-practice06-after.html
function calculateTotal() {
	// get the values from the input fields
	var subtotal = parseFloat(document.getElementById("subtotal").value);
	var tax = parseFloat(document.getElementById("tax").value);
	var shipping = parseFloat(document.getElementById("shipping").value);

	// calculate the total
	var total = subtotal + tax + shipping;

	// display the total in the total field
	document.getElementById("total").value = total.toFixed(2);
}

// calculate subtotal based on amount value for each item from cisc3003-practice06-after.html
function calculateSubtotal() {
	// get the values from the input fields
	var item1 = parseFloat(document.getElementById("amount1").value);
	var item2 = parseFloat(document.getElementById("amount2").value);
	var item3 = parseFloat(document.getElementById("amount3").value);

	// calculate the subtotal
	var subtotal = item1 + item2 + item3;
	// display the subtotal in the subtotal field
	document.getElementById("subtotal").value = subtotal.toFixed(2);
}

// calculate tax based on subtotal value from cisc3003-practice06-after.html
function calculateTax() {
	// get the value from the subtotal input field
	var subtotal = parseFloat(document.getElementById("subtotal").value);
	// calculate the tax (assuming a tax rate of 10%)
	var tax = subtotal * 0.10;
	// display the tax in the tax field
	document.getElementById("tax").value = tax.toFixed(2);
}

// calculate shipping based on subtotal value from cisc3003-practice06-after.html
function calculateShipping() {
	// get the value from the subtotal input field
	var subtotal = parseFloat(document.getElementById("subtotal").value);
	// calculate the shipping (assuming a flat rate of $10 for orders under $200, and free shipping for orders $200 and above)
	var shipping = subtotal < 200 ? 40 : 0;
	// display the shipping in the shipping field
	document.getElementById("shipping").value = shipping.toFixed(2);
}

// calculate amount for each item based on count and price values from cisc3003-practice06-after.html
function calculateAmount(itemNumber) {
	// get the count and price values for the specified item
	var count = parseFloat(document.getElementById("count" + itemNumber).value);
	var price = parseFloat(document.getElementById("price" + itemNumber).value.replace("$", ""));
	// calculate the amount
	var amount = count * price;
	// display the amount in the amount field for the specified item
	document.getElementById("amount" + itemNumber).value = amount.toFixed(2);
	// recalculate the subtotal, tax, shipping and total whenever an amount is updated
	calculateSubtotal();
	calculateTax();
	calculateShipping();
	calculateTotal();
}

// replace markup with values from data.js and add event listeners to count input fields from cisc3003-practice06-after.html
function initialize() {
	// replace markup with values from data.js
	for (var i = 0; i < filenames.length; i++) {
		document.getElementById("image" + (i + 1)).src = "images/" + filenames[i];
		document.getElementById("title" + (i + 1)).textContent = titles[i];
		document.getElementById("count" + (i + 1)).value = quantities[i];
		document.getElementById("price" + (i + 1)).textContent = "$" + prices[i].toFixed(2);
		calculateAmount(i + 1); // calculate the amount for each item based on the initial count and price values
	}
	// add event listeners to count input fields
	for (var i = 1; i <= filenames.length; i++) {
		document.getElementById("count" + i).addEventListener("change", function() {
			var itemNumber = this.id.replace("count", ""); // get the item number from the id of the input field
			calculateAmount(itemNumber); // calculate the amount for the specified item whenever the count value changes
		});
	}
	// add event listeners to subtotal, tax and shipping input fields to recalculate the total whenever any of these values change
	for (var i = 1; i <= 3; i++) {
		document.getElementById("count" + i).addEventListener("change", calculateTotal);
		document.getElementById("price" + i).addEventListener("change", calculateTotal);
		document.getElementById("amount" + i).addEventListener("change", calculateTotal);
	}
	document.getElementById("subtotal").addEventListener("change", calculateTotal);
	document.getElementById("tax").addEventListener("change", calculateTotal);
	document.getElementById("shipping").addEventListener("change", calculateTotal);
}