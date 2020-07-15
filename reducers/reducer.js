export const initState = {
  data: [],
  loading: true,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_DATA':
      return {
        ...state,
        data: action.data,
        loading: action.loading,
      };
    default:
      return state;
  }
};
