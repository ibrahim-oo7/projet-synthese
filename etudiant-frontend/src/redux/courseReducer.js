const initialState = {
  module1Done: false,
  module2Done: false
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {

    case "FINISH_MODULE_1":
      return {
        ...state,
        module1Done: true
      };

    case "FINISH_MODULE_2":
      return {
        ...state,
        module2Done: true
      };

    case "RESET_COURSE":
      return initialState;

    default:
      return state;
  }
};

export default courseReducer;
