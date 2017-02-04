import{List,Map} from 'immutable';
import{expect} from 'chai';

import{setEntries} from '../src/core';

describe('app logic', () => {
  describe('setEntries', () => {
    it('add entry to state', () => {
      const state = Map();
      const entries = List.of('Spoletto', 'McDonalds');
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of('Spoletto', 'McDonalds')
      }));
    });

    it('converts to immutable', () => {
      const state = Map();
      const entries = ['Spoletto', 'McDonalds'];
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of('Spoletto', 'McDonalds')
      }))
    })
  });
});
