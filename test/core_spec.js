import{List,Map} from 'immutable';
import{expect} from 'chai';

import{setEntries, next, vote, resetEntries} from '../src/core';

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
          round: 1,
          pair: List.of('Spoletto', 'McDonalds')
        }),
        entries: List.of('Subway')
      }));
    });

    it('winner of current vote back in entries', ()=>{
      const state = Map({
        vote: Map({
          round: 1,
          pair: List.of('Spoletto', 'Subway'),
          score: Map({
            'Spoletto': 4,
            'Subway': 2
          })
        }),
        entries: List.of('McDonalds', 'BurgerKing', 'Bobs')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          round: 2,
          pair: List.of('McDonalds', 'BurgerKing')
        }),
        entries: List.of('Bobs', 'Spoletto')
      }));
    });

    it('return both tied vote back to entries', () => {
      const state = Map({
        vote: Map({
          round: 1,
          pair: List.of('Spoletto', 'Bobs'),
          score: Map({
            'Spoletto': 3,
            'Bobs': 3
          })
        }),
        entries: List.of('McDonalds', 'BurgerKing', 'Pizzahut')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          round: 2,
          pair: List.of('McDonalds', 'BurgerKing')
        }),
        entries: List.of('Pizzahut', 'Spoletto', 'Bobs')
      }));
    });

    it('winner when just one entry left', () => {
      const state = Map({
        vote: Map({
          pair: List.of('McDonalds', 'Bobs'),
          score: Map({
            'McDonalds': 4,
            'Bobs':2
          })
        }),
        entries: List()
        });
        const nextState = next(state);
        expect(nextState).to.equal(Map({
          winner: 'McDonalds'
        }));
      });
    });

  describe('vote', () => {
    it('create score for voted entry', () => {
      const state = Map({
          round: 1,
          pair: List.of('Spoletto', 'McDonalds')
      });
      const nextState = vote(state, 'Spoletto');
      expect(nextState).to.equal(Map({
          round: 1,
          pair: List.of('Spoletto', 'McDonalds'),
          score: Map({
            'Spoletto': 1
          })
      }));

    });

      it('adds to existing score voted entry', () => {
        const state = Map({
            round: 1,
            pair: List.of('Spoletto', 'McDonalds'),
            score: Map({
              'Spoletto': 4,
              'McDonalds':4
            })
        });
        const nextState = vote(state, 'Spoletto');
        expect(nextState).to.equal(Map({
            round: 1,
            pair: List.of('Spoletto','McDonalds'),
            score: Map({
              'Spoletto':5,
              'McDonalds':4
            })
        }));
      });
    });

    describe('resetEntries', ()=>{
      it('reset entries for initial file', () => {
        const state = Map({
          vote: Map({
            round: 1,
            pair: List.of('Spoletto', 'Bobs'),
            score: Map({
              'Spoletto': 3,
              'Bobs': 3
            })
          }),
          entries: List.of('McDonalds', 'BurgerKing', 'Pizzahut')
        });
        const nextState = resetEntries(state);
        expect(nextState).to.equal(Map({
          entries: List.of('McDonalds', 'Bobs', 'Subway', 'Spoletto', 'Burger King', 'Pizza Hut', 'Dominos Pizza', 'Bibi', 'Delirio Tropical')};
        ));
      })
    });
  });
