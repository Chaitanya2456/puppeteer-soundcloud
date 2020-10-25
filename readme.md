# Soundcloud Streamer
A terminal based music streamer that lets user select from available genres on 'soundcloud/discover' and plays any of Top 5 playlists from that genre.

## Setup
  `npm install`
  `npm i puppeteer-core`

## Usage
You need an existing chromium based browser which is required by puppeteer-core.

In the browser config, change `executablePath` to your chromium based browser. You can find it for chrome by going to "chrome://version".

### Run instructions

`cd puppeteer-soundcloud`

`node soundcloud_streamer.js`

It prompts you to select a genre, then plays any of top 5 playlists from that genre.

To exit, press `ctrl + c`.
