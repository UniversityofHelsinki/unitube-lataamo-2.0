const puppeteer = require('puppeteer');
const { AxePuppeteer } = require('axe-puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('http://localhost:8000');

        const results = await new AxePuppeteer(page).analyze();

        console.log(results.violations);

        await browser.close();

        process.exit(results.violations.length > 0 ? 1 : 0);
    } catch (error) {
        console.error('Error occurred:', error);
        process.exit(1); // Exit with error status code
    }
})();
