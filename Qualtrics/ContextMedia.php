<?php

// hostname, database, username, and password
$db_hostname = 'dashboarddb.cv4dmwypmvpf.us-east-1.rds.amazonaws.com';
$db_username = 'dba';
$db_password = 'peterkwan4ever';
$db_database = 'ContextMedia';

// connect to the server
$db_server = mysql_connect($db_hostname, $db_username, $db_password);
if (!$db_server) die("Unable to connect to MySQL: " . mysql_error());

// select the database
mysql_select_db($db_database, $db_server)
	or die("Unable to select database: " . mysql_error());

//get the index from the index table
$sql = "SELECT theIndex FROM cm_index LIMIT 1";
$result = mysql_query($sql);
$row = mysql_fetch_object($result);
$index = $row->theIndex;
echo "the index: " . $index;  // testing
echo "<br/>";

// retrieve a code from my table
$offset = $index - 1;
$query = "SELECT * FROM cm_codebank LIMIT 1 OFFSET $offset";
$result2 = mysql_query($query);
if (!$result2) die ("Database access failed: " . mysql_error());
$row2 = mysql_fetch_object($result2);
$code = $row2->code;
echo "the code: " . $code;  // testing
echo "<br/>";

// get the number of codes in the code bank from the max code table
$sql = "SELECT maxNum FROM cm_maxnum LIMIT 1";
$result = mysql_query($sql);
$row = mysql_fetch_object($result);
$maxCodes = $row->maxNum;
echo "the max number of codes: " . $maxCodes;  // testing
echo "<br/>";


echo "<br/>";
echo "the final output JSON: ";

// echo out the code that the web service will return
$codeArray = array( 'index' => $index, 'code' => $code );
echo json_encode($codeArray);

// increment the index
if($index >= $maxCodes) {
	$index = 1;
} else {
	$index = $index + 1;
}

//update the index
$sql = "UPDATE cm_index SET theIndex = '{$index}'";
mysql_query($sql);

// close the connection to the server
mysql_close($db_server);

?>