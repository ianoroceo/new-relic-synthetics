/**
 * Feel free to explore, or check out the full documentation
 * https://docs.newrelic.com/docs/synthetics/new-relic-synthetics/scripting-monitors/writing-scripted-browsers
 * for details.
 */

//var assert = require('assert');
var chai = require("chai"),
    expect = chai.expect;

// Login Objects
var appUrl = '';
var loginForm = $driver.By.css('');
var userNameField = $driver.By.css('');
var userName = '';
var pwdField = $driver.By.css('');

var CryptoJS = require('crypto-js');
var encrypt = CryptoJS.enc.Base64.parse('');
var pwd = encrypt.toString(CryptoJS.enc.Utf8);
var loginButton = $driver.By.css('');

// Homepage Objects
var homePageContents = $driver.By.css('');

// User Profile and Settings Menu Objects
var userSettingsMenu = $driver.By.css('');
var signOutButton = $driver.By.css('');

// Open Web App and visit Login Page
$browser.manage().window().setSize(1920, 937).then(function(){ //set browser size
  $browser.get(appUrl);
  console.log('(' + (new Date()).toISOString() + ') Opening Login Page...');
});

// Wait for Login Form to be displayed
$browser.waitForElement(loginForm, 2000);
console.log('(' + (new Date()).toISOString() + ') Login Page is displayed...');

// Login to App
console.log('(' + (new Date()).toISOString() + ') Inputting Log-in Credentials...');
$browser.findElement(userNameField).sendKeys(userName);
$browser.findElement(pwdField).sendKeys(pwd);
$browser.findElement(loginButton).click();
console.log('(' + (new Date()).toISOString() + ') Logging in to App...');

// Wait for the Page to Load
$browser.waitForElement(homePageContents, 30000);
console.log('(' + (new Date()).toISOString() + ') Homepage Contents are displayed...');

// Checks text is correct on the Menu Options. 'Welcome,  '
$browser.findElement(userSettingsMenu).then(function(text){
  text.getText().then(function(innerText){
    console.log('(' + (new Date()).toISOString() + ') This is the text string ' + innerText);
    expect(innerText).to.equal('Welcome,  '); //validate that text is correct
    });
  }
);


// Logout from App
console.log('(' + (new Date()).toISOString() + ') Click on User Profile Settings Menu...');
$browser.findElement(userSettingsMenu).click();
$browser.findElement(signOutButton).click();
console.log('(' + (new Date()).toISOString() + ') Logging Out from App...');
$browser.waitForElement($driver.By.css('.footer'));

$browser.getCurrentUrl().then(function(url){
  console.log('(' + (new Date()).toISOString() + ') Successfully Logged Out... ' + url);
  expect(url).to.equal('https://hiring.careerbuilder.com/'); //validate that redirect url is correct
});



