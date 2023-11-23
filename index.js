const express = require('express');
const puppeteer = require('puppeteer');
const dotenv = require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    initialisePuppeteer();
    console.log(`server is running on port: ${port}`);
});

const url = 'https://livent.ltd/';

const initialisePuppeteer = async () => {
    try{
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ['--start-maximized']
         });

        const page = await browser.newPage();

        await page.setDefaultNavigationTimeout(60000);
        await page.goto(url);

        await page.waitForSelector('input[type = "tel"]');
        await page.type('input[type = "tel"]', process.env.PHONE, { delay: 100 });

        await page.waitForSelector('input[id = "pwd"]');
        await page.type('input[id = "pwd"]', process.env.PASSWORD, { delay: 100 });

        await page.click('.btn');

        // await page.evaluate(() => {
        //     const form = document.querySelector('div.signin-wrap');
        //     form.submit();
        // });

        await page.waitForNavigation();
    
        await page.waitForTimeout(3000);

        await page.click('body > div.home-wrap > div.menu > div:nth-child(2)');

        await page.waitForSelector('.all');
        await page.click('.all');

        await page.click('.btn');

        await page.waitForTimeout(5000);

        browser.close();
    }catch(err){
        console.log(err);
    }

}