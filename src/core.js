import {List, Map} from 'immutable';

export function setEntries(state, entries) {
  const list = List(entries);
  return state.set('entries', list)
  .set('initialEntries', list);
}

export function next(state, round = state.getIn(['vote', 'round'], 0)) {
  const entries = state.get('entries')
  .concat(getWinners(state.get('vote')));
  if (entries.size === 1) {
    return state.remove('vote')
    .remove('entries')
    .set('winner', entries.first());
  } else {
    return state.merge({
      vote: Map({
        round: round + 1,
        pair: entries.slice(0,2)
      }),
      entries: entries.slice(2)
    });
  }
}

export function restart(state) {
 const round = state.getIn(['vote', 'round'], 0);
 return next(
   state.set('entries', state.get('initialEntries'))
   .remove('vote')
   .remove('winner'),
   round
   );
}

// What the code expresses is "reach into the nested data structure path
// ['tally', 'Jurassic Park'], and apply this function there. 
// If there are keys missing along the path, create new Maps in their place. 
// If the value at the end is missing, initialize it with 0".
export function vote(voteState, entry) {
  return voteState.updateIn(
    ['tally', entry],
    0,
    tally => tally + 1
    );
}

function getWinners(vote) {
  if (!vote) return [];
  const [a, b] = vote.get('pair');
  const aVotes = vote.getIn(['tally', a], 0);
  const bVotes = vote.getIn(['tally', b], 0);
  if      (aVotes > bVotes)  return [a];
  else if (aVotes < bVotes)  return [b];
  else                       return [a, b];
}

export const INITIAL_STATE = Map();