export const setTheme = (darkMode: boolean) => {
  return {
    type: constants.SET_THEME,
    payload: darkMode,
  };
};

export const setLogin = (login: boolean) => {
  return {
    type: constants.SET_LOGIN,
    payload: login,
  };
};

export const setLoading = (loading: boolean) => {
  return {
    type: constants.SET_LOADING,
    payload: loading,
  };
};

export const addDaoMember = () => {
  return {
    type: constants.ADD_DAO_MEMBER,
  };
};

export const setWalletAddress = (address: string) => {
  console.log(address);
  return {
    type: constants.SET_WALLET_ADDRESS,
    payload: address,
  };
};

export const setMembers = (members: any) => {
  return {
    type: constants.SET_MEMBERS,
    payload: members,
  };
};

export const addHop = (fileUrl: string, funding: number) => {
  return {
    type: constants.ADD_HOP,
    payload: { fileUrl, funding },
  };
};

export const setDaoData = (
  name: string,
  tokenName: string,
  tokenSupply: string
) => {
  return {
    type: constants.SET_DAO_DATA,
    payload: {
      name,
      tokenName,
      tokenSupply,
    },
  };
};

export const constants = {
  SET_THEME: "SET_THEME",
  SET_LOGIN: "SET_LOGIN",
  SET_LOADING: "SET_LOADING",
  SET_WALLET_ADDRESS: "SET_WALLET_ADDRESS",
  SET_MEMBERS: "SET_MEMBERS",
  SET_DAO_DATA: "SET_DAO_DATA",
  ADD_DAO_MEMBER: "ADD_DAO_MEMBER",
  ADD_HOP: "ADD_HOP",
};
