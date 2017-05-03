import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {

  describe('setEntries', () => {

    it('adds the entries to the state', () => {
      const state = Map();
      const entries = List.of('Jurassic Park', 'Lost World');
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of('Jurassic Park', 'Lost World')
      }));
    });

    it('converts to immutable', () => {
      const state = Map();
      const entries = List.of('Jurassic Park', 'Lost World');
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of('Jurassic Park', 'Lost World')
      }));
    });

  });



  describe('next', () => {

    it('takes the next two entries under vote', () => {
      const state = Map({
        entries: List.of('Jurassic Park', 'Lost World', 'Jurassic Park III')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        entries: List.of('Jurassic Park III'),
        vote: Map({
          pair: List.of('Jurassic Park', 'Lost World')
        })
      }));
    });

  });



  describe('vote', () => {

    it('creates a tally for the voted entry', () => {
      const state = Map({
        pair: List.of('Jurassic Park', 'Lost World')
      });
      const nextState = vote(state, 'Jurassic Park');
      expect(nextState).to.equal(Map({
        pair: List.of('Jurassic Park', 'Lost World'),
        tally: Map({
          'Jurassic Park': 1
        })
      }));
    });

    it('adds to existing tally for the voted entry', () => {
      const state = Map({
        pair: List.of('Jurassic Park', 'Lost World'),
        tally: Map({
          'Jurassic Park': 3,
          'Lost World': 2
        })
      });
      const nextState = vote(state, 'Jurassic Park');
      expect(nextState).to.equal(Map({
        pair: List.of('Jurassic Park', 'Lost World'),
        tally: Map({
          'Jurassic Park': 4,
          'Lost World': 2
        })
      }));
    });

  });



  describe('next', () => {

    it('puts winner of current vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Jurassic Park', 'Lost World'),
          tally: Map({
            'Jurassic Park': 4,
            'Lost World': 2
          })
        }),
        entries: List.of('Jurassic Park III', 'Jurassic World', 'Jurassic World 2')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Jurassic Park III', 'Jurassic World')
        }),
        entries: List.of('Jurassic World 2', 'Jurassic Park')
      }));
    });

    it('puts both from tied vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Jurassic Park', 'Lost World'),
          tally: Map({
            'Jurassic Park': 3,
            'Lost World': 3
          })
        }),
        entries: List.of('Jurassic Park III', 'Jurassic World', 'Jurassic World 2')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Jurassic Park III', 'Jurassic World')
        }),
        entries: List.of('Jurassic World 2', 'Jurassic Park', 'Lost World')
      }));
    });

    it('marks winner when just one entry left', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Jurassic Park', 'Lost World'),
          tally: Map({
            'Jurassic Park': 4,
            'Lost World': 2
          })
        }),
        entries: List()
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        winner: 'Jurassic Park'
      }));
    });

  });

});