import {List, Map} from 'immutable';

export const INITIAL_STATE = Map();

export function resetEntries(state){
  var entries = require('../entries.json');
  return state.remove('vote')
              .set('entries', List(entries));
}

export function setEntries(state,entries){
  return state.set('entries', List(entries));
}

function getWinners(vote){
  if(!vote) return [];
  const [a,b] = vote.get('pair');
  const aVotes = vote.getIn(['score', a], 0);
  const bVotes = vote.getIn(['score', b], 0);
  if(aVotes > bVotes) return [a];
  else if(aVotes<bVotes) return [b];
  else return [a,b];
}

export function next(state){
  const entries = state.get('entries').concat(getWinners(state.get('vote')));
  if(entries.size === 1){
    return state.remove('vote')
                .remove('entries')
                .set('winner',entries.first());
  }else{
    return state.merge({
      vote: Map({
        round: state.getIn(['vote', 'round'], 0)+1,
        pair: entries.take(2)
      }),
      entries: entries.skip(2)
    })
  }
}

export function vote(voteState, entry){
  return voteState.updateIn(
    ['score', entry],
    0,
    score => score + 1
  );
}
