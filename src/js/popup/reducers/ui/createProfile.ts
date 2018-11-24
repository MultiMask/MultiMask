import { PROFILE_CREATE_DONE, PROFILE_CREATE_GENERATE } from 'constants/profile';

const initialState = {
  seed: ''
};

export default function profileCreateReducer(state = initialState, action) {
  switch (action.type) {
    case PROFILE_CREATE_GENERATE:
      return {
        seed: action.payload.seed
      };
    case PROFILE_CREATE_DONE:
      return {
        seed: null
      };
  }

  return state;
}
