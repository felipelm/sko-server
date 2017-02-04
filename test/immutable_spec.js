import{expect} from 'chai';
import{List, Map} from 'immutable';

describe('immutability', () =>{

  describe('A List',()=> {
    function addPlace(currentState, place){
      return currentState.update('places', places => places.push(place))
    }

    it('is immutable', () =>{
      let state = Map({
        places: List.of('Spoletto', 'McDonalds')
      });
      let nextState = addPlace(state, 'Subway');

      expect(nextState).to.equal(Map({
        places: List.of(
        'Spoletto',
        'McDonalds',
        'Subway'
        )
      }));

      expect(state).to.equal(Map({
        places: List.of(
        'Spoletto',
        'McDonalds'
        )
      }));
    });
  })
});
