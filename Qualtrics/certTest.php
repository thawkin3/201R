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
			$myJSON = ;
			break;
		case "Q2D2@qcert.com":
			$myJSON = ;
			break;
		case "Qoda@qcert.com":
			$myJSON = ;
			break;
		case "QadmeAmidala@qcert.com":
			$myJSON = ;
			break;
		case "QyloRen@qcert.com":
			$myJSON = ;
			break;
		case "Qey@qcert.com":
			$myJSON = ;
			break;
		case "QoeDameron@qcert.com":
			$myJSON = ;
			break;
		case "Qinn@qcert.com":
			$myJSON = ;
			break;
		default:
			$myJSON = '{"Error Message": "incorrect email address"}';
	}

	echo json_encode(json_decode($myJSON));

?>