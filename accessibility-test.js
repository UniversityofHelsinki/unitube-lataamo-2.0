const puppeteer = require('puppeteer');
const { AxePuppeteer } = require('axe-puppeteer');
const {join} = require("path");
const {pathToFileURL} = require("url");

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const filePath = join(__dirname, './build/index.html');
        console.log(filePath);
        const fileUrl = pathToFileURL(filePath).toString();
        await page.goto(fileUrl); // Replace with your CRA URL

        const results = await new AxePuppeteer(page).analyze();

        console.log(results.violations);

        await browser.close();

        process.exit(results.violations.length > 0 ? 1 : 0);
    } catch (error) {
        console.error('Error occurred:', error);
        process.exit(1); // Exit with error status code
    }
})();
