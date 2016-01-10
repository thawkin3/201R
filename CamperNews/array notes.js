var oldArray = [1,2,3,4,5,6,7,8,9,10];
oldArray;

// turns an array into a single value
// this one sums every value into a single value
var oneSum = oldArray.reduce(function(p,c){return p+c});

// affects every value of the array
// this one multiplies every value by 4
var timesFour = oldArray.map(function(val){return val*4});

// used to iterate through an array and filter out elements where a given condition is not true
// this one keeps only elements that are less than or equal to 5
var newArray = oldArray.filter(function(val) {
  return val <= 5;
});

// sorts an array from lowest to highest
oldArray.sort();

// sorts an array from highest to lowest
oldArray.sort(function(a,b){
  return b - a;
});

// reverses an array
oldArray.reverse();

// concatenates two arrays
var oldArray = [1,2,3];
var concatMe = [4,5,6];
var newArray = oldArray.concat(concatMe);

// splits up a string into an array
var wordsString = "The brown fox";
var wordsArray = words.split(" ");

// joins array elements into a string
var joinMe = ["Join","me","into","a","string"];
var joinedString = joinMe.join(" ");