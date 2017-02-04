import{List,Map} from 'immutable';
import{expect} from 'chai';

import{setEntries, next} from '../src/core';

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

  describe('next', () => {
    it('takes next two entries to vote', () => {
      const state = Map({
        entries: List.of('Spoletto', 'McDonalds', 'Subway')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Spoletto', 'McDonalds')
        }),
        entries: List.of('Subway')
      }));
    });
  })
});
