module.exports = (providerInfo) => {
  const assert = require('assert');
  const scrapper = require('../../../src/scrappers/main');
  const describeMethod = providerInfo.pending ? describe.skip : describe

  describeMethod(`Integration - ${providerInfo}`, function() {
    this.timeout(15000);

    const scrappedContent = () => {
      if (this._scrappedContent) {
        return this._scrappedContent
      }

      return this._scrappedContent = scrapper(providerInfo.scrapperName)
    };

    describe('teams', function () {
      it('has correct lenght', function (done) {
        scrappedContent().then((state) => {
          assert.equal(state.teams.length, 15);

          done();
        });
      });

      it('has correct content', function (done) {
        scrappedContent().then((state) => {
          assert.equal(typeof state.teams[0].team_a, 'string');
          assert.equal(typeof state.teams[0].team_b, 'string');

          done();
        });
      });
    });

    describe('forecastPercentages', function () {
      it('has correct lenght', function (done) {
        scrappedContent().then((state) => {
          // 16 items because we have two rows for the last match
          assert.equal(state.forecastPercentages.length, 16);

          done();
        });
      });

      it('has correct content', function (done) {
        scrappedContent().then((state) => {
          assert.equal(typeof state.forecastPercentages[0].unos, 'number');
          assert.equal(typeof state.forecastPercentages[0].equis, 'number');
          assert.equal(typeof state.forecastPercentages[0].doses, 'number');
          assert.equal(typeof state.forecastPercentages[0].emes, 'number');

          done();
        });
      });
    });

    describe('forecast.classic', function () {
      beforeEach(function () {
        this.signs = [1, 'X', 2, 'M']
      });

      it('has correct lenght', function (done) {
        scrappedContent().then((state) => {
          assert.equal(state.forecast.classic.length, 15);

          done();
        });
      });

      it('has correct content', function (done) {
        scrappedContent().then((state) => {
          assert.notEqual(this.signs.indexOf(state.forecast.classic[0]), -1);
          assert.notEqual(this.signs.indexOf(state.forecast.classic[14]), -1);

          done();
        });
      });
    });

    describe('forecast.goals', function () {
      beforeEach(function () {
        this.signs = [1, 'X', 2, 'M']
      });

      it('has correct lenght', function (done) {
        scrappedContent().then((state) => {
          assert.equal(state.forecast.goals.length, 15);

          done();
        });
      });

      it('has correct content', function (done) {
        scrappedContent().then((state) => {
          assert.notEqual(this.signs.indexOf(state.forecast.goals[0]), -1);
          // The latest elements could be something like 1 - M
          assert.notEqual(state.forecast.goals[14].indexOf('-'), -1);

          done();
        });
      });
    });
  });
};
