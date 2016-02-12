<?php

	$user = $_GET['user'];	

	switch ($user) {
		case "QeiaOrgana@qcert.com":
			$myJSON = '{"firstName": "Qeia", "lastName": "Organa", "email": "QeiaOrgana@qcert.com", "purchase": "Blaster Rifle", "discountItem1": "Silencer", "discountItem2": "Scope", "discountItem3": "Phaser", "discountItem4": "Holster", "discountPrice": "15%", "dealOfTheDay": "Double-Bladed Lightsaber"}';
			break;
		case "QukeSkywalker@qcert.com":
			$myJSON = '{"firstName": "Quke", "lastName": "Skywalker", "email": "QukeSkywalker@qcert.com", "purchase": "Lightsaber", "discountItem1": "Belt", "discountItem2": "Belt Pouch", "discountItem3": "Belt Bundle", "discountItem4": "Cloaks", "discountPrice": "10%", "dealOfTheDay": "Double-Bladed Lightsaber"}';
			break;
		case "QarthVader@qcert.com":
			$myJSON = '{"firstName": "Qarth", "lastName": "Vader", "email": "QarthVader@qcert.com", "purchase": "ATAT (Heavy Machinery)", "discountItem1": "Tool Kit", "discountItem2": "Junk Parts", "discountItem3": "Tow Cable Cutters", "discountItem4": "Anti-Ewok Sealant", "discountPrice": "0%", "dealOfTheDay": "Double-Bladed Lightsaber"}';
			break;
		case "QobaFett@qcert.com":
			$myJSON = '{"firstName": "Qoba", "lastName": "Fett", "email": "QobaFett@qcert.com", "purchase": "Jet Pack", "discountItem1": "Fuel", "discountItem2": "Replacement Engine", "discountItem3": "Tool Kit", "discountItem4": "Decimator", "discountPrice": "15%", "dealOfTheDay": "Double-Bladed Lightsaber"}';
			break;
		case "QanSolo@qcert.com":
			$myJSON = '{"firstName": "Qan", "lastName": "Solo", "email": "QanSolo@qcert.com", "purchase": "Blaster Rifle", "discountItem1": "Silencer", "discountItem2": "Scope", "discountItem3": "Phaser", "discountItem4": "Holster", "discountPrice": "15%", "dealOfTheDay": "Double-Bladed Lightsaber"}';
			break;
		case "Qobi-WanKenobi@qcert.com":
			$myJSON = '{"firstName": "Qobi-Wan", "lastName": "Kenobi", "email": "Qobi-WanKenobi@qcert.com", "purchase": "Lightsaber", "discountItem1": "Belt", "discountItem2": "Belt Pouch", "discountItem3": "Belt Bundle", "discountItem4": "Cloaks", "discountPrice": "10%", "dealOfTheDay": "Double-Bladed Lightsaber"}';
			break;
		case "Q2D2@qcert.com":
			$myJSON = '{"firstName": "Q2", "lastName": "D2", "email": "Q2D2@qcert.com", "purchase": "Motivator (Heavy Machinery)", "discountItem1": "Tool Kit", "discountItem2": "Junk Parts", "discountItem3": "Tow Cable Cutters", "discountItem4": "Anti-Ewok Sealant", "discountPrice": "0%", "dealOfTheDay": "Double-Bladed Lightsaber"}';
			break;
		case "Qoda@qcert.com":
			$myJSON = '{"firstName": "Qoda", "lastName": "", "email": "Qoda@qcert.com", "purchase": "Flashlight (supplies)", "discountItem1": "Backpack", "discountItem2": "Batteries", "discountItem3": "Food Packs", "discountItem4": "First Aid Kit", "discountPrice": "30%", "dealOfTheDay": "Double-Bladed Lightsaber"}';
			break;
		case "QadmeAmidala@qcert.com":
			$myJSON = '{"firstName": "Qadme", "lastName": "Amidala", "email": "QadmeAmidala@qcert.com", "purchase": "Blaster Rifle", "discountItem1": "Silencer", "discountItem2": "Scope", "discountItem3": "Phaser", "discountItem4": "Holster", "discountPrice": "15%", "dealOfTheDay": "Double-Bladed Lightsaber"}';
			break;
		case "QyloRen@qcert.com":
			$myJSON = '{"firstName": "Qylo", "lastName": "Red", "email": "QyloRen@qcert.com", "purchase": "Lightsaber", "discountItem1": "Belt", "discountItem2": "Belt Pouch", "discountItem3": "Belt Bundle", "discountItem4": "Cloaks", "discountPrice": "10%", "dealOfTheDay": "Double-Bladed Lightsaber"}';
			break;
		case "Qey@qcert.com":
			$myJSON = '{ "firstName": "Qey", "lastName": "", "email": "Qey@qcert.com", "purchase": "Dehydrated Meal Pack (supplies)", "discountItem1": "Backpack", "discountItem2": "Batteries", "discountItem3": "Food Packs", "discountItem4": "First Aid Kit", "discountPrice": "30%", "dealOfTheDay": "Double-Bladed Lightsaber"}';
			break;
		case "QoeDameron@qcert.com":
			$myJSON = '{"firstName": "Qoe", "lastName": "Dameron", "email": "QoeDameron@qcert.com", "purchase": "X-Wing (Heavy Machinery)", "discountItem1": "Tool Kit", "discountItem2": "Junk Parts", "discountItem3": "Tow Cable Cutters", "discountItem4": "Anti-Ewok Sealant", "discountPrice": "0%", "dealOfTheDay": "Double-Bladed Lightsaber"}';
			break;
		case "Qinn@qcert.com":
			$myJSON = '{"firstName": "Qinn", "lastName": "", "email": "Qinn@qcert.com", "purchase": "Leather Jacket (clothes)", "discountItem1": "Robes", "discountItem2": "Boots", "discountItem3": "Helmet", "discountItem4": "Armour", "discountPrice": "25%", "dealOfTheDay": "Double-Bladed Lightsaber"}';
			break;
		default:
			$myJSON = '{"Error Message": "incorrect email address"}';
	}

	echo json_encode(json_decode($myJSON));

?>