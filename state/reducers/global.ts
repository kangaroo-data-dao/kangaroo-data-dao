import { constants } from "../actions/global";

const reducer = <T>(state: any, action: { type: string; payload: T }) => {
  console.log("ACTION", action);
  const { type, payload } = action ?? {};
  switch (type) {
    case constants.SET_THEME:
      return {
        ...state,
        darkMode: payload,
      };
    case constants.SET_LOGIN:
      return {
        ...state,
        login: payload,
      };
    case constants.SET_LOADING:
      return {
        ...state,
        loading: payload,
      };

    case constants.ADD_DAO_MEMBER:
      return {
        ...state,
        members: [
          ...state.members,
          {
            address: "",
            tokenDistribution: 0,
            id: state.members[state.members.length - 1].id + 1,
          },
        ],
      };
    case constants.SET_WALLET_ADDRESS:
      return {
        ...state,
        walletAddress: payload,
      };

    case constants.SET_DAO_DATA:
      return {
        ...state,
        dao: payload,
      };

    case constants.SET_MEMBERS:
      return {
        ...state,
        members: payload,
      };
    case constants.ADD_HOP:
      return {
        ...state,
        hops: [...state.hops, payload],
      };
    default:
      return state;
  }
};

export default reducer;
