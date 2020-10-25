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

const genreIndex = parseInt(input) - 1;

var playListTitle = await page.evaluate((genreSelector, genreIndex) => {
    const listOfAllGenres = document.querySelectorAll(genreSelector);
    const playListCollection = listOfAllGenres[genreIndex].querySelectorAll('.audibleTile');
    const playListCharts = listOfAllGenres[genreIndex].querySelectorAll('.systemPlaylistTile');

    function playAndGetPlayListTitle(lists, listTitleSelector) {
        const randIndex = Math.floor(Math.random() * Math.floor(lists.length));
        lists[randIndex].querySelector('.sc-button-play').click();
        const playListTitle = lists[randIndex].querySelector(listTitleSelector).innerText;
        return playListTitle;
    }

    if (playListCollection.length != 0) {
        return playAndGetPlayListTitle(playListCollection, '.sc-link-dark');
    } else if (playListCharts.length != 0) {
        return playAndGetPlayListTitle(playListCharts, '.playableTile__heading');
    } else {
        return "Sorry no playlists found";
    }
}, genreSelector, genreIndex);

console.log("\n" + 'Playing the playlist : ' + playListTitle.toUpperCase() + ' from soundclound' + "\n");

})();
