import {Map, fromJS, List} from 'immutable';
import {expect} from 'chai';

import makeStore from '../src/store';

describe('store', () => {

  it('is a Redux store configured with the correct reducer', () => {
    const store = makeStore();
    expect(store.getState()).to.equal(Map());

    store.dispatch({
      type: 'SET_ENTRIES',
      entries: List.of('Jurassic Park', 'Lost World')
    });
    expect(store.getState()).to.equal(fromJS({
      entries: ['Jurassic Park', 'Lost World'],
      initialEntries: ['Jurassic Park', 'Lost World']
    }));
  });

});