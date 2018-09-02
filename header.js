// const puppeteer = require('puppeteer');


// let browser, page;

// beforeEach(async () => {

//     browser = await puppeteer.launch({
//         headless: false
//     }
//     );

//     page = await browser.newPage();
//     await page.goto('localhost:3000');

// },20000);

// afterEach(async () => {
//     // await browser.close();
// });

// // test("Open Browser", async () => {


// //     const text = await page.$eval('a.brand-logo', el => el.innerHTML);

// //     expect(text).toEqual('Blogster');

// // });

// // test.only("Click and check url", async () => {


// //     await page.click('.right a')

// //     const url = page.url();
// //     expect(url).toMatch(/accounts\.google\.com/);
// // });

// test.only('check session', async () => {

//     const id = '5b49d37e33797d21dc486c12';
//     const Buffer = require('safe-buffer').Buffer;
//     const sessionObject = {
//         passport: {
//             user: id
//         }
//     };
    
//     const sessionString = Buffer.from(
//         JSON.stringify(sessionObject)).toString('base64');

//     const Keygrip = require('keygrip');
//     const keys = require('../config/keys');
//     const keygrip = new Keygrip([keys.cookieKey]);
//     const sig = keygrip.sign('session=' + sessionString);
//     console.log(sessionString, sig);

    
//     await page.setCookie({ name: 'session', value: sessionString });
//     await page.setCookie({ name: 'session.sig', value: sig });

//     await page.goto('localhost:3000');
   
//     await page.waitFor('a[href="/auth/logout"]');

//     const text = await page.$eval('a[href="/auth/logout"]', el => el.innerHTML)
//     expect(text).toEqual('Logout');
    

// });



const puppeteer = require('puppeteer');
const xpath = require('xpath');

beforeEach(async () => {

    browser = await puppeteer.launch({
        ignoreHTTPSErrors: true, headless: false,  timeout: 0
    }
    );

    page = await browser.newPage();

    await page.goto('http://10.16.111.131');
    

},20000);




test("Click and check url", async () => {

    await page.waitFor('input[name=txt_Username]');
    await page.$eval('input[name=txt_Username]', el => el.value = 'root');
    await page.$eval('input[name=txt_Password]', el => el.value = 'admin');
    
    await page.click('button[name=Submit]');

    await page.waitForNavigation({waitUntil: 'load'});

    //to select buttons from headerTab
    await page.click( '[value="0"] > .tabBtnCenter' );

    
    //to select buttons from left side nav 
    await page.click('.others [value="2"]');
    
   

    //await page.waitForSelector('iframe[src*=wlaninfo]');
    const frame = await page.frames().find(f => f.name() === 'frameContent');
    await frame.waitForSelector('#ApplyBthNAP #btnCheck');
    const button = await frame.$('#ApplyBthNAP #btnCheck');
    
    await button.click();

    //await page.waitForSelector('#wlan_napinfo_table');

    const selectors = await page.$$('#wlan_napinfo_table');
    console.log('tabal_length ' + selectors.length);
    for(let tr of selectors){
     const trText = await page.evaluate(el => el.innerHTML, tr);
     console.log('log tr Text=' + trText)
    }
    
    //grabbing frame workin
    // const frames = await page.frames();
    // const frame = (await page.frames())[1];
    // console.log(frame['_name'])

    //const frame = await page.frames().find(f => f.name() == 'frameContent');
    //const frame = await page.frames().find(f => f.url().indexOf("wlaninfo">0));
    // const button = await frame.$(".DivNAPInfo");
    // var frames = await page.frames();
    // const fream = await frames.find(b=> b.url().indexOf("wlaninfo">0));

    // const button = await fream.$$("#DivNAPInfo");
    //console.log(await frame)

    //const NAP = await frame.$('#ApplyBthNap');
    // const button = await NAP.$('btnCheck');
   

    },80000);
