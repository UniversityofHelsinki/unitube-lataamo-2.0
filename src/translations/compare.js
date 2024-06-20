// To compare files, run the following command on this folder: node compare.js
// Folder needs to contain compare.js, fi.json and sv.json files. Change the file names in the script if needed.
const fs = require('fs');

// Define the paths to the json files.
const jsonPath1 = 'fi.json';
const jsonPath2 = 'sv.json';

// Read the contents
let json1Content = fs.readFileSync(jsonPath1, 'utf-8');
let json2Content = fs.readFileSync(jsonPath2, 'utf-8');

// Parse the contents to objects
let json1 = JSON.parse(json1Content);
let json2 = JSON.parse(json2Content);

// Function to convert object keys to lowercase
function lowerCaseKeys(obj) {
  const output = {};
  for (let i in obj) {
    if (Object.prototype.toString.apply(obj[i]) === '[object Object]') {
       output[i.toLowerCase()] = lowerCaseKeys(obj[i]);
    } else {
       output[i.toLowerCase()] = obj[i];
    }
  }
  return output;
}

json1 = lowerCaseKeys(json1);
json2 = lowerCaseKeys(json2);

// Fetch their keys
const json1Keys = Object.keys(json1);
const json2Keys = Object.keys(json2);

// Find keys in json1 that are not in json2 and add them
json1Keys.forEach((key) => {
  if (!json2Keys.includes(key)) {
    json2[key] = '???';
  }
});

// Now find keys in json2 that are not in json1 and add them
json2Keys.forEach((key) => {
  if (!json1Keys.includes(key)) {
    json1[key] = '???';
  }
});

function sortObject(obj){
  return Object
    .keys(obj)
    .sort()
    .reduce((res, key) =>
      (res[key] = obj[key], res), {});
}

// Sorted JSON
json1 = sortObject(json1);
json2 = sortObject(json2);

// Stringify JSON objects with indentation
json1Content = JSON.stringify(json1, null, 2);
json2Content = JSON.stringify(json2, null, 2);

// Write back to files
fs.writeFileSync(jsonPath1, json1Content);
fs.writeFileSync(jsonPath2, json2Content);

console.log("JSON files have been updated with missing keys.")
