import {List, Map} from 'immutable';
import {expect} from 'chai';

describe('immutability', () => {

  describe('a number', () => {

    function increment(currentState) {
      return currentState + 1;
    }

    it('is immutable', () => {
      let state = 42;
      let nextState = increment(state);

      expect(nextState).to.equal(43);
      expect(state).to.equal(42);
    });

  });



  describe('A List', () => {

    function addMovie(currentState, movie) {
      return currentState.push(movie);
    }

    it('is immutable', () => {
      let state = List.of('Jurassic Park', 'Lost World');
      let nextState = addMovie(state, 'Jurassic Park III');

      expect(nextState).to.equal(List.of(
        'Jurassic Park',
        'Lost World',
        'Jurassic Park III'
      ));
      expect(state).to.equal(List.of(
        'Jurassic Park',
        'Lost World'
      ));
    });

  });



  describe('a tree', () => {

    // function addMovie(currentState, movie) {
    //   return currentState.set(
    //     'movies',
    //     currentState.get('movies').push(movie)
    //   );
    // }

    // Same as function above
    function addMovie(currentState, movie) {
      return currentState.update('movies', movies => movies.push(movie));
    }

    it('is immutable', () => {
      let state = new Map({
        movies: List.of('Jurassic Park', 'Lost World')
      });
      let nextState = addMovie(state, 'Jurassic Park III');

      expect(nextState).to.equal(Map({
        movies: List.of(
          'Jurassic Park',
          'Lost World',
          'Jurassic Park III'
        )
      }));
      expect(state).to.equal(Map({
        movies: List.of(
          'Jurassic Park',
          'Lost World'
        )
      }));
    });

  });

});