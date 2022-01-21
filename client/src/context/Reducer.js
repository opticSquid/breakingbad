const reducer = (state, action) => {
  switch (action.type) {
    case "Set_BB":
      return {
        ...state,
        BB: action.data,
      };
    case "Set_BCS":
      return {
        ...state,
        BCS: action.data,
      };
    case "Set_SearchTerm":
      return {
        ...state,
        searchTerm: action.data,
      };
    default:
      return state;
  }
};
export default reducer;
