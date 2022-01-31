'use strict';

const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const pretty = require('pretty');
const router = express.Router();
const routeGuard = require('./../middleware/route-guard');

// const flightsURL = `https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3`;
const flightsURL = `https://www.google.com/travel/flights/search?tfs=CBwQAhoeagcIARIDQ0RHEgoyMDIyLTA2LTE4cgcIARIDSkZLcAGCAQsI____________AUABSAGYAQI&hl=en&gl=fr&curr=EUR`;
// const flightsURL = `https://skiplagged.com/flights/PAR/JFK/2022-02-25/2022-03-11`;
// const flightsURL = `https://www.writerswrite.co.za/literary-birthday-calendar/`;

// const $ = cheerio.load(markup);
// console.log(pretty($.html()));

router.get('/', (req, res, next) => {
  // async function that scrapes the data
  async function getFlightData() {
    try {
      // fetches HTML of page we want to scrape
      const { data } = await axios.get(flightsURL);
      // loads HTML fetched above
      const $ = cheerio.load(data);
      // selects all the flights in the class KC3CM
      // const listFlights = $('.plainlist ul li');
      const listFlights = $('.trip-duration > span')
        .get()
        .map((repo) => {
          const $repo = $(repo);
          const title = $repo.find('.trip-stops').text();
          return title;
        });
      console.log('new', listFlights);
      // const listFlights = $('.Ir0Voe');
      // const listFlights = $('*');
      // const listFlights = $('.S0QcGc>div>span');
      // const listFlights = $('.wpex-entry.wpex-clr');
      // const listFlights = $('.VKb8lb.H4aYKc > .mz0jqb.taHBqe.Qpcsfe');
      // const listFlights = $('.VKb8lb.H4aYKc > .mz0jqb.taHBqe.Qpcsfe');
      // const listFlights = $('.TQqf0e.sSHqwe.tPgKwe.ogfYpf');

      // console.log('listtttttt', $(listFlights).find('span'));

      // const listFlights = $('.S0QcGc');
      // stores data for all flights
      const flights = [];

      // let filteredFlights = listFlights.filter((idx, el) => {
      //   return $(el).children(
      //     'div.WZwUvb.EA71Tc > div.N8AcTe > div > div.yDBH5d > div.S0QcGc > div > div:nth-child(2) > div > div:nth-child(1) > div > div.KC3CM > div.mxvQLc.ceis6c.uj4xv.uVdL1c.A8qKrc > div.OgQvJf.nKlB3b > div.Ir0Voe > div.TQqf0e.sSHqwe.tPgKwe.ogfYpf > span'
      //   );
      // return $(el).children("div**[**class='.S0QcGc'] span");
      // return $(el).children("div[role='listitem'] span");
      // return $(el).children("div[jsname='zZLz7']");
      // });
      // let items = filteredFlights.get();
      // console.log('items!', items);
      // items.forEach((e) => {
      //   console.log('names of each filtered item with jsname', e.name);
      // });
      // use .each to loop through all the data selected
      // listFlights.each((idx, el) => {
      //   const flight = {
      //     birthday: '',
      //     writer: '',
      //     info: '',
      //     airline: '',
      //     time: '',
      //     duration: '',
      //     stops: '',
      //     price: ''
      //   };
      //   flight.duration = $(el).find('span').text();
      // flight.birthday = $(el).find('p > strong').text();
      // flight.writer = $(el).find('ol > li > a').text();
      // flight.info = $(el).children[0]('.qeoz6e.HKHSfd > span').text();
      // flight.info = $(el)[0].attr('data-expandedlabel').text();
      // flight.info = $(el).children[0].attr('dataset.expandedlabel').text();

      // flight.info = $(el).children('.trip__stops-0').attribs('id');
      // flight.airline = $(el).children('span').text();

      // flights.push(flight);
      // });
      console.log('flights!', flights);
      res.render('home', { flights });
    } catch (err) {
      console.log(err);
    }
  }
  getFlightData();
});

router.get('/axios', routeGuard, (req, res, next) => {
  const flights = [];
  axios
    .get(flightsURL)
    .then((resp) => {
      const $ = cheerio.load(resp.data);
      // console.log('resp data', resp.data);
      console.log('cheerio load', $);
      console.log(
        'selecting with cheerio',
        $('div').children('.OXZ8S ').text()
      );
      // return $('.YMlIz.FpEdX').each((index, element) => {
      $('div[class=mz0jqb taHBqe Qpcsfe]')
        .html()
        .find('.E2ZmUe.tGDW3.yxAs1')
        .each((index, element) => {
          // const duration = $(element).attr('data-expandedlabel');
          // .text();
          // console.log(duration);
          flights.push($(element).attr('data-expandedlabel'));
        });
      console.log(flights);
      res.render('home', { flights });
    })
    // .then(() => {
    //   res.render('home', { flights });
    // })
    .catch((error) => {
      console.log(error);
    });
});

router.get('/private', routeGuard, (req, res, next) => {
  res.render('private');
});

module.exports = router;
