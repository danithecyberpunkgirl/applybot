import webdriver from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import chromeDriver from 'chromedriver';
import faker from 'faker';
import fs from 'fs';
import path from 'path';
import data from './dataGen.js';
import utils from './utils.js';
import resumes from './resumes/index.js';

const { Builder, By, until } = webdriver;

const extensionPath = path.resolve('./src/captchaplugin.zip');
const dataDir = path.resolve('./src/chromeUserDir');

const chromeOptions = new chrome.Options();
chromeOptions.excludeSwitches('disable-extensions');
chromeOptions.addArguments(
  // '--headless',
  '--disable-dev-shm-usage',
  '--disable-web-security',
  '--disable-features=IsolateOrigins,site-per-process',
  '--allow-running-insecure-content',
  '--disable-blink-features=AutomationControlled',
  '--no-sandbox',
  '--mute-audio',
  '--window-size=1920,1080',
  '--no-first-run',
  '--no-default-browser-check',
  '--disable-dev-shm-usage',
  '--disable-gpu',
  '--enable-webgl',
  '--ignore-certificate-errors',
  // '--lang=en-US,en;q=0.9',
  // '--password-store=basic',
  // '--disable-gpu-sandbox',
  '--disable-software-rasterizer',
  '--disable-background-timer-throttling',
  // '--disable-backgrounding-occluded-windows',
  // '--disable-renderer-backgrounding',
  '--disable-infobars',
  '--disable-breakpad',
  '--disable-canvas-aa',
  '--disable-2d-canvas-clip-aa',
  '--disable-gl-drawing-for-tests',
  '--enable-low-end-device-mode',
  '--user-data-dir=' + dataDir
);
chromeOptions.addExtensions([extensionPath])

const timeout = 15000;
let driver;
let userData = {};

const initDriver = async () => {
  driver = new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
}

const startDriver = async () => {
  try {
    userData = {};
    //grab a random job listing, also selecting the city this user is in
    userData.cityState = utils.randomEntry(Object.entries(data.cities));
    driver.get(utils.randomEntry(data.urlsByCity[userData.cityState[0]]));
    await driver.sleep(2000);
    //navigate to signup
    await driver.findElement(By.xpath('//*[@id="content"]/div/div[2]/div/div[1]/div[1]/div/div/button'))
      .then(el => el.click());
    await driver.findElement(By.xpath('//*[@id="applyOption-top-manual"]'))
      .then(el => el.click());
    await driver.wait(until.elementLocated(By.linkText("Create an account")));
    await driver.findElement(By.linkText("Create an account"))
      .then(el => el.click());
  } catch (e) {
    console.error(e)
  }
}

const generateAccount = async () => {
  if (!driver) return;
  //Get random data
  userData.firstName = faker.name.firstName();
  userData.lastName = faker.name.lastName();
  userData.name = userData.firstName + " " + userData.lastName;
  userData.email = utils.randomEmail(userData.name);
  userData.password = faker.internet.password(12, false, /^[a-z]*[A-Z]*[0-9]*$/, 'aA0');
  userData.phoneNumber = faker.phone.phoneNumber('(###) ###-####');

  for (const key in data.signupData) {
    let info;
    switch (key) {
      case 'email':
      case 'email-retype':
        info = userData.email;
        break;
      case 'pass':
      case 'pass-retype':
        info = userData.password;
        break;
      case 'first_name':
        info = userData.firstName;
        break;
      case 'last_name':
        info = userData.lastName;
        break;
      case 'pn':
        info = userData.phoneNumber;
        break;
      default:
        break;
    }
    if (info) {
      await driver.findElement(By.xpath(data.signupData[key])).sendKeys(info)
    }
  }

  await driver.findElement(By.id('fbclc_ituCode'))
    .then(el => el.sendKeys('United States'));
  await driver.findElement(By.id('fbclc_country'))
    .then(el => el.sendKeys('United States'));
  await driver.findElement(By.xpath('//*[@id="dataPrivacyId"]')).then(el => el.click());
  await driver.wait(until.elementLocated(By.xpath('//*[@id="dlgButton_20:"]')));
  await driver.findElement(By.xpath('//*[@id="dlgButton_20:"]')).then(el => el.click());
  console.dir('solving captcha...')
  await driver.wait(until.elementLocated(By.css('.antigate_solver.solved'))).catch(err => console.error('failed to solve the captcha'))
  console.dir('captcha solved')
  await driver.findElement(By.xpath('//*[@id="fbclc_createAccountButton"]')).then(el => el.click());
  await driver.sleep(1000);
  if (await driver.findElement(By.id("errorMsg_1")).then(el => !!el).catch(e => {})) {
    return generateAccount();
  }
  console.dir(`successfully created an account for email ${userData.email}`)
}

const fillOutApplicationAndSubmit = async () => {
  if (!driver) return;
  await driver.wait(until.elementLocated(By.xpath('//*[@id="109:topBar"]')));
  //open bars
  await driver.findElement(By.xpath('//*[@id="109:topBar"]')).then(el => el.click());
  await driver.findElement(By.xpath('//*[@id="260:topBar"]')).then(el => el.click());

  for (const key in data.applyData) {
    let info;
    switch (key) {
      case 'resume':
        await driver.findElement(By.xpath('//*[@id="48:_attach"]/div[6]')).then(el => el.click());
        userData.resumePath = path.resolve(utils.randomEntry(resumes));
        info = userData.resumePath
        break;
      case 'addy':
        info = faker.address.streetAddress();
        break;
      case 'city':
        info = userData.cityState[0];
        break;
      case 'zip':
        info = utils.randomEntry(data.zip_codes[userData.cityState[0]]);
        break;
      case 'job':
        info = faker.name.jobTitle();
        break;
      case 'salary':
        info = utils.randomInt(15, 25);
        break;
      default:
        break;
    }
    if (info) {
      driver.findElement(By.xpath(data.applyData[key])).then(el => el.sendKeys(info))
    }
  }
  console.dir(`filled out app forms for ${userData.cityState[0]}`)

  // fill out dropdowns
  await driver.findElement(By.id('154:_select'))
    .then(el => el.sendKeys('Yes'));
  await driver.findElement(By.id('195:_select'))
    .then(el => el.sendKeys('United States'));

  await driver.findElement(By.id('211:_select'))
    .then(el => el.sendKeys('Yes'));
  await driver.findElement(By.id('215:_select'))
    .then(el => el.sendKeys('No'));
  await driver.findElement(By.id('219:_select'))
    .then(el => el.sendKeys('No'));
  await driver.findElement(By.id('223:_select'))
    .then(el => el.sendKeys('No'));
  await driver.findElement(By.id('227:_select'))
    .then(el => el.sendKeys('No'));
  await driver.findElement(By.id('231:_select'))
    .then(el => el.sendKeys('Yes'));
  await driver.sleep(1000);

  await driver.findElement(By.id('235:_select'))
    .then(el => el.sendKeys(utils.weightedRand({ 'Male': 1, 'Female': 1, 'Other': 0.1 })));

  await driver.findElement(By.xpath('//label[text()="350 LBS"]')).then(el => el.click());
  await driver.findElement(By.xpath('//label[text()="800 LBS"]')).then(el => el.click());
  await driver.findElements(By.xpath('//label[text()="Yes"]')).then(els => els.forEach(el => el.click()));
  await driver.wait(until.elementLocated(By.id("48:_attachDownloadLabel")));
  await driver.sleep(2000);
  await driver.findElement(By.xpath('//*[@id="261:_submitBtn"]')).then(el => el.click());
  await driver.wait(until.elementLocated(By.className("rcmSuccessBackToResultsBtn")));
  await driver.findElement(By.css("#rcmJobApplicationCtr > div.msgContent > div.rcmSuccessBackToResultsBtnWrapper > div:nth-child(2)")).then(el => el.click())
  await driver.wait(until.elementLocated(By.id("_signout")));
  await driver.findElement(By.id("_signout")).then(el => el.click());
  await driver.sleep(1000);
  console.dir(`submitted application for ${userData.email}`)
}


await initDriver();
let iters = 0;
while (iters < 10000) {
  try {
    await startDriver();
  } catch (e) {
    console.dir('could not start webdriver')
    console.error(e);
    break;
  }
  try {
    await generateAccount();
  } catch (e) {
    console.dir('account creation failed')
    console.error(e);
    break;
  }
  try {
    await fillOutApplicationAndSubmit();
  } catch (e) {
    console.dir('submission failed')
    console.error(e);
  }
  iters++;
  console.dir('count ' + iters);
}
if (driver) {
  driver.close();
  //remove files that break restarting chrome
  const deletable = [
    path.resolve('./src/chromeUserDir/Local State'),
    path.resolve('./src/chromeUserDir/Default/Preferences')
  ];
  deletable.forEach(fp => {
    fs.unlinkSync(fp, (e) => {
      if (e) {
        console.error(e);
      } else {
        console.dir('reset user dir')
      }
    })
  });
}

