// Ginger Wolnik, January 30, 2017
// Task 1: As an admin, create an account for a new customer
//
// start at admin page

function logTitle(expected) {
	browser.getTitle().then(function(title) {
    if (! expected.localeCompare(title)) {
       console.log('Found expected page title:', expected);
    } else {
       console.log('Found page title:', title, ' but expected:', expected);
    }
  });
}

var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
var browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'safari' }).build();
browser.manage().timeouts().implicitlyWait(10000);

var adminUrl = 'http://phptravels.net/admin';
var expectedTitle = 'Administrator Login';  // actual title has typo, so compare fails
 
browser.get(adminUrl);
logTitle('Administrator Login');  // actual title has typo, so compare fails

var adminEmail = 'admin@phptravels.com';
var adminPassword = 'demoadmin';

// Maximize browser window if needed
browser.manage().window().maximize();

// Wait for elements to become visible, later add better wait algorithm
// Discussion and ideas to improve this here:
// http://www.obeythetestinggoat.com/how-to-get-selenium-to-wait-for-page-load-after-a-click.html

browser.sleep(2000); // 2 seconds

// Enter UserName
browser.findElement(By.name('email')).sendKeys(adminEmail);

// Enter Password
browser.findElement(By.name('password')).sendKeys(adminPassword);

// Click on 'Login' button
browser.findElement(By.css('body > div > form.logpanel.form-signin.form-horizontal.wow.fadeIn.animated.animated > button')).click();

// Need to handle Safari popup window "Would you like to save this password?"

// wait for next page to load
browser.sleep(2000);

// Verify successful login
logTitle('Dashboard');

// Click on Accounts, Customers
browser.findElement(By.css('#social-sidebar-menu > li:nth-child(4) > a > span')).click();
browser.sleep(4000);
browser.findElement(By.css('#Accounts > li:nth-child(3) > a')).click();
browser.sleep(4000);
logTitle('Customers Management');

// Click on Add Button
browser.findElement(By.css('#content > div > form > button')).click();
browser.sleep(2000);

logTitle('Add Customer');

// Enter new customer info
browser.findElement(By.name('fname')).sendKeys('John');
browser.findElement(By.name('lname')).sendKeys('Doe');
browser.findElement(By.name('email')).sendKeys('jd@nosuch.com');
browser.findElement(By.name('password')).sendKeys('cgWtan7z');
browser.findElement(By.name('mobile')).sendKeys('8005551212');
browser.findElement(By.name('address1')).sendKeys('123 Main St');
browser.findElement(By.name('address2')).sendKeys('Anytown\, CA 94000');

// checkbox Email Newsletter Subscriber
//browser.findElement(By.name('newssub')).click();  // this doesn't work
//browser.findElement(By.xpath("//span[contains(@class,'newssub')]")).click(); // this doesn't work
//browser.findElement(By.xpath("//span[@id='content']/form/div/div[2]/div/div[13]/div/div/label/div/ins")).click(); // this doesn't work
// also, click can toggle the check on and off, so need to add code to verify on

// select US from drop down menu
browser.findElement(By.id('s2id_autogen1')).click();
browser.sleep(2000);
browser.findElement(By.css('#select2-drop > ul > li:nth-child(212) > div')).click();
browser.sleep(2000);

// Submit
browser.findElement(By.css('#content > form > div > div.panel-footer > button')).click();

browser.sleep(4000);
logTitle('Customers Management');

browser.sleep(5000); // allow 5 seconds to look at the final page

// final verification would be to find new user on the Customers Management page

browser.quit();
