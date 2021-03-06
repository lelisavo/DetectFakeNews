var request = require('request');
var cheerio = require('cheerio');
const puppeteer = require('puppeteer');



/**
 * Takes in a list of tags/claims and a file path, and will return
 * a graph about the claim from Fred economics data.
 * Param: tags = list of keywords or phrases about a certain claim
 * Param: imagePath = a relative or absolute path of where the graph representing the claims is going to go
 * Returns: Nothing, but will take a picture of the graph representing the given claims and place it whereever the
 * imageURL points to
 * Example getImage(["african american unemployment", "rate"] , 'image.png'); will put a picture of unemployment rate of african
 * males 20 and over in this folder as image.py
 */

function getImage(tags, imagePath) {
  var url = search(tags);
  request(url, function(error, response, html) {
    if (!error && response.statusCode == 200) {
      let $ = cheerio.load(html);
      var result = $('#series-pager > tbody > tr:nth-child(1) > td > div.col-xs-12.col-sm-10').html().trim();
      var results = result.split(" ")[1]
      var link = results.split('"')[1];
      link = "https://fred.stlouisfed.org" + link;
      screenshot(link, imagePath);
    }
  });

}


function search(tags) {
  var url = "https://fred.stlouisfed.org/search?st=";
  var i;
  for (i = 0; i < tags.length; i++) {
    url += tags[i]
    if (i < tags.length - 1) {
      url += "+"
    }
  }
  return url;
}


async function screenshot(url, imagePath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.screenshot({
    path: imagePath,
    clip: {
      x: 25,
      y: 350,
      width: 750,
      height: 450
    }
  });
  await browser.close();
}
