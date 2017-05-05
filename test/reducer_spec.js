import {Map, fromJS, List} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

  it('handles SET_ENTRIES', () => {
    const initialState = Map();
    const action = {type: 'SET_ENTRIES', entries: List.of('Jurassic Park')};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      entries: ['Jurassic Park'],
      initialEntries: ['Jurassic Park']
    }));
  });

  it('handles NEXT', () => {
    const initialState = fromJS({
      entries: ['Jurassic Park', 'Lost World']
    });
    const action = {type: 'NEXT'};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      entries: [],
      vote: {
        round: 1,
        pair: ['Jurassic Park', 'Lost World']
      }
    }));
  });

  it('handles VOTE', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Jurassic Park', 'Lost World']
      },
      entries: []
    });
    const action = {type: 'VOTE', entry: 'Jurassic Park'};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Jurassic Park', 'Lost World'],
        tally: {'Jurassic Park': 1}
      },
      entries: []
    }));
  });

  it('has an initial state', () => {
    const action = {type: 'SET_ENTRIES', entries: List.of('Jurassic Park')};
    const nextState = reducer(undefined, action);
    expect(nextState).to.equal(fromJS({
      entries: ['Jurassic Park'],
      initialEntries: ['Jurassic Park']
    }));
  });

  it('can be used with reduce', () => {
  const actions = [
    {type: 'SET_ENTRIES', entries: List.of('Jurassic Park', 'Lost World')},
    {type: 'NEXT'},
    {type: 'VOTE', entry: 'Jurassic Park'},
    {type: 'VOTE', entry: 'Lost World'},
    {type: 'VOTE', entry: 'Jurassic Park'},
    {type: 'NEXT'}
  ];
  const finalState = actions.reduce(reducer, Map());

  expect(finalState).to.equal(fromJS({
    winner: 'Jurassic Park',
    initialEntries: ['Jurassic Park', 'Lost World']
  }));
});

});