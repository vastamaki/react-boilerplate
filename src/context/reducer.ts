export const initialState = {
  auth: false,
};
export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_AUTH":
      return {
        ...state,
        auth: action.payload,
      };

    default:
      return state;
  }
};
