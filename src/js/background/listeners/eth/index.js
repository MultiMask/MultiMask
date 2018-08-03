export default ({ App }) => async ({ type, payload }, sendResponse) => {
  switch (type) {
    case 'eth:init': {
      sendResponse({
        type: 'eth:init:res',
        payload: {
          data: 'new'
        }
      });
      break;
    }

    case 'check': {
      sendResponse({
        type: 'check:result',
        payload: {
          data: 'dest'
        }
      });
      break;
    }
  }
};
