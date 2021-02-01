const _ = require('lodash');
const {
  compose,
  composeAsync,
  extractNumber,
  enforceHttpsUrl,
  fetchHtmlFromUrl,
  extractFromElems,
  fromPairsToObject,
  fetchElemInnerText,
  fetchElemAttribute,
  extractUrlAttribute
} = require('../helper/helpers');

const URL_BASE = "https://blogtruyen.vn";

const pageRelativeUrl = url => // Ex: url = 'about' => https://blogtruyen.vn/about
  _.isString(url) ? `${URL_BASE}${url.replace(/^\/*?/, "/")}` : null;

const extractComics = $ => {
  const mainSite = $('#wrapper');
  const mainContent = mainSite.find('section.main-content')
  const listMainPage = mainContent.find('section.list-mainpage')
  const comics = listMainPage.find('.storyitem > .fl-l > a')
  let data = []

  const extractMethod = elem => {
    const href = elem.attr('href')
    const title = elem.attr('title')
    const img = elem.find('img').attr('src')
    data.push({
      href, img, title
    })
  }

  const extract = extractFromElems(extractMethod)(fromPairsToObject);

  extract(comics)($)
  return data
}

const fetchComic = () => {
  return composeAsync(extractComics, fetchHtmlFromUrl)(URL_BASE);
}

module.exports = fetchComic
