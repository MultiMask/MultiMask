import {
  PROFILE_CREARE_DONE, PROFILE_CREATE_GENERATE
} from 'constants/ui/createProfile';

const initialState = {
  seed: ''
};

export default function profileCreateReducer (state = initialState, action) {
  switch (action.type) {
    case PROFILE_CREATE_GENERATE:
      return {
        seed: action.payload.seed,
      }
    case PROFILE_CREARE_DONE:
      return {
        seed: null,
      }
  }

  return state;
}
