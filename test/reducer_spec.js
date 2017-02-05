import {Map,fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () =>{

  it('can be used with reduce', ()=>{
    const actions = [
      {type:'SET_ENTRIES', entries: ['McDonalds', 'Bobs']},
      {type: 'NEXT'},
      {type: 'VOTE', entry: 'McDonalds'},
      {type: 'VOTE', entry: 'Bobs'},
      {type: 'VOTE', entry: 'McDonalds'},
      {type: 'NEXT'}
    ];
    const finalState = actions.reduce(reducer,Map());

    expect(finalState).to.equal(fromJS({
      winner: 'McDonalds'
    }));
  });

  it('has an initialState', ()=>{
    const action = {type: 'SET_ENTRIES', entries: ['McDonalds']};
    const nextState = reducer(undefined, action);
    expect(nextState).to.equal(fromJS({
      entries: ['McDonalds']
    }));
  });

  it('handles SET_ENTRIES',() => {
    const initialState = Map();
    const action = {type: 'SET_ENTRIES', entries: ['McDonalds']};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      entries: ['McDonalds']
    }));
  });

  it('handles next', () => {
    const initialState = fromJS({
      entries: ['McDonalds', 'Bobs']
    });
    const action = {type: 'NEXT'};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote:{
        round: 1,
        pair: ['McDonalds', 'Bobs']
      },
      entries: []
    }));
  });

  it('handles vote', () => {
    const initialState = fromJS({
      vote: {
        round: 1,
        pair: ['McDonalds', 'Bobs'],
      },
      entries: []
    });
    const action = {type: 'VOTE', entry: 'McDonalds'};
    const nextState = reducer(initialState,action);

    expect(nextState).to.equal(fromJS({
      vote: {
        round: 1,
        pair: ['McDonalds', 'Bobs'],
        score: {McDonalds: 1}
      },
      entries: []
    }));
  });
});
