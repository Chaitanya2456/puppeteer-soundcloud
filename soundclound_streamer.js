const puppeteer = require('puppeteer-core');
const readline = require('readline');

(async() => {

const MUSIC_URL = 'https://soundcloud.com/discover';
const genreSelector = '.mixedModularHome__item';

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

await page.goto(MUSIC_URL, { waitUntil: 'networkidle0' });

var genreNamesList = await page.evaluate((genreSelector) => {
    var genreNamesList = [];
    const listOfAllGenres = Array.from(document.querySelectorAll(genreSelector));
    for (index in listOfAllGenres) {
      genreNamesList.push(listOfAllGenres[index].children[0].children[0].children[0].innerText);
    }
    return genreNamesList;
}, genreSelector);
  
console.log("\n" + "Available genres are : " + "\n");

for (index in genreNamesList) {
    console.log((parseInt(index) + 1) + ' - ' + genreNamesList[index]);
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function getInput(question) {
    return new Promise((resolve) => {
      rl.question(question, (answer) => {
        resolve(answer);
      });
    });
}

var input;

try {
    input = await getInput("\n" + 'To select the genre, input the genre number and hit enter' + "\n");
    while (!Number.isInteger(parseInt(input)) || parseInt(input) > genreNamesList.length) {
      input = await getInput("\n" + 'Invalid input. Enter again' + "\n");
    }
    rl.close();
} catch (err) {
    console.error(err);
}

console.log("\n" + 'Selected Genre is ' + genreNamesList[parseInt(input) - 1]);

})();
