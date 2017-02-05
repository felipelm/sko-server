import{setEntries, next, vote, INITIAL_STATE, resetEntries} from './core';

export default function reducer(state = INITIAL_STATE, action){
  switch(action.type){
    case 'SET_ENTRIES':
      return setEntries(state,action.entries);
    case 'NEXT':
      return next(state);
    case 'VOTE':
      return state.update('vote',
                          voteState => vote(voteState, action.entry));
    case 'RESET':
      return next(resetEntries(state));
  }
  return state;
}
