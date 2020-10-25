const puppeteer = require('puppeteer-core');

(async() => {

const MUSIC_URL = 'https://soundcloud.com/discover';

const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    ignoreDefaultArgs: [
        "--mute-audio",
    ],
    args: [
        "--autoplay-policy=no-user-gesture-required",
    ],
});

const page = await browser.newPage();

await page.goto(MUSIC_URL, { waitUntil: 'networkidle0' })

})();
