/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { createContext, Dispatch, useEffect, useReducer } from "react";
import globalReducer from "../reducers/global";

type InitialStateType = {
  darkMode: boolean;
  loggedIn: boolean;
  loading: boolean;
  dao: {
    name: string;
    tokenName: string;
    tokenSupply: string;
  };
  members: { address: string; tokenDistribution: number; id: number }[];
  hops: {
    fileUrl: string;
    funding: number;
  }[];
  walletAddress: string;
};

export const initialState = {
  darkMode: false,
  loggedIn: false,
  loading: false,
  dao: {
    name: "",
    tokenName: "",
    tokenSupply: "",
  },
  members: [{ id: 1, address: "", tokenDistribution: 0 }],
  hops: [],
  walletAddress: "",
};

export const GlobalContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<any>;
}>({ state: initialState, dispatch: () => {} });

const GlobalProvider = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add("dark");
      window.localStorage.setItem("theme", JSON.stringify("dark"));
    } else {
      document.documentElement.classList.remove("dark");
      window.localStorage.setItem("theme", JSON.stringify("light"));
    }
  }, [state.darkMode]);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
