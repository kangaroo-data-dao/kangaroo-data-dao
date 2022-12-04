/* eslint-disable @next/next/no-img-element */
import { useContext, useEffect, useState } from "react";
import Container from "./common/Container";
import { GlobalContext } from "../state/contexts/GlobalContext";
import Head from "next/head";
import { image } from "../utils/constants";
import Button from "./common/Button";
import Header from "./common/Header";
import { useRouter } from "next/router";

function App() {
  const {
    state: {},
    dispatch,
  } = useContext(GlobalContext);

  const [active, setActive] = useState("storage provider");
  const [options, setOptions] = useState([
    {
      name: "storage provider",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20.25 6.375C20.25 8.653 16.556 10.5 12 10.5C7.444 10.5 3.75 8.653 3.75 6.375M20.25 6.375C20.25 4.097 16.556 2.25 12 2.25C7.444 2.25 3.75 4.097 3.75 6.375M20.25 6.375V17.625C20.25 19.903 16.556 21.75 12 21.75C7.444 21.75 3.75 19.903 3.75 17.625V6.375M20.25 6.375V10.125M3.75 6.375V10.125M20.25 10.125V13.875C20.25 16.153 16.556 18 12 18C7.444 18 3.75 16.153 3.75 13.875V10.125M20.25 10.125C20.25 12.403 16.556 14.25 12 14.25C7.444 14.25 3.75 12.403 3.75 10.125"
            stroke="#2097F6"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      desc: "provide storage",
    },
    {
      name: "user",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15.982 16.7247C15.2833 15.7996 14.3792 15.0493 13.3412 14.5331C12.3031 14.0168 11.1594 13.7487 10 13.7497C8.84064 13.7487 7.69688 14.0168 6.65882 14.5331C5.62075 15.0493 4.71674 15.7996 4.018 16.7247M15.981 16.7247C17.3445 15.5119 18.3071 13.9133 18.7412 12.1408C19.1752 10.3683 19.0603 8.50579 18.4115 6.80018C17.7627 5.09457 16.6107 3.62648 15.1084 2.5906C13.6061 1.55472 11.8243 1 9.9995 1C8.17466 1 6.39293 1.55472 4.8906 2.5906C3.38827 3.62648 2.23633 5.09457 1.58753 6.80018C0.938738 8.50579 0.823749 10.3683 1.25782 12.1408C1.69188 13.9133 2.6545 15.5119 4.018 16.7247M15.981 16.7247C14.335 18.1929 12.2056 19.0028 10 18.9997C7.79403 19.0031 5.66423 18.1931 4.018 16.7247M13 7.74971C13 8.54535 12.6839 9.30842 12.1213 9.87103C11.5587 10.4336 10.7956 10.7497 10 10.7497C9.20435 10.7497 8.44129 10.4336 7.87868 9.87103C7.31607 9.30842 7 8.54535 7 7.74971C7 6.95406 7.31607 6.19099 7.87868 5.62838C8.44129 5.06578 9.20435 4.74971 10 4.74971C10.7956 4.74971 11.5587 5.06578 12.1213 5.62838C12.6839 6.19099 13 6.95406 13 7.74971V7.74971Z"
            stroke="#E5C5FF"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      desc: "these CAN BE PEOPLE YOU TRUST WITH YOUR FUNDS.",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (active === "user") {
      router.push("/user/create-dao");
    } else if (active === "storage provider") {
      router.push("/storage-provider/kangaroo-submissions");
    }
  };

  return (
    <Container>
      <Head>
        <title>Select Role</title>
      </Head>
      <Header />
      <div className="flex flex-col w-full max-w-4xl gap-10 px-8 mb-40 overflow-hidden">
        <h1 className="text-2xl text-brand-400">Select your role</h1>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="grid items-stretch w-full grid-cols-1 gap-10 md:grid-cols-2">
          {options.map((d) => {
            return (
              <Card
                key={d.name}
                data={d}
                active={active === d.name}
                setActive={() => setActive(d.name)}
              />
            );
          })}
          <p></p>
          <Button
            type="submit"
            fullWidth={true}
            className="flex flex-row items-center justify-center gap-2 group">
            <p>NEXT</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 transition-all group-hover:translate-x-1">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
              />
            </svg>
          </Button>
        </form>
      </div>
    </Container>
  );
}

function Card({ data, active, setActive }: any) {
  return (
    <div
      onClick={setActive}
      className={`flex flex-col gap-6 p-6 text-white rounded-sm cursor-pointer select-none
      
      ${active ? "border border-brand-400/30" : "border border-transparent"}
      ${active ? "bg-zinc-700" : "bg-kggrey-500"}`}>
      <div className="flex items-center justify-center w-10 h-10 bg-gray-600 rounded-full">
        {data.icon}
      </div>
      <div className="flex flex-col gap-2">
        <p>{data.name}</p>
        <p
          className={`text-sm lowercase ${
            active ? "text-zinc-400" : "text-kggrey-400"
          }`}>
          {data.desc}
        </p>
      </div>
    </div>
  );
}
export default App;
