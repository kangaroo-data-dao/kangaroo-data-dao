import React, { useContext, useState } from "react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Container from "../../components/common/Container";
import { GlobalContext } from "../../state/contexts/GlobalContext";
import Head from "next/head";
import Header from "../../components/common/Header";
import { useRouter } from "next/router";
import { addHop } from "../../state/actions/global";

const FirstHop = () => {
  const {
    state: { hops },
    dispatch,
  } = useContext(GlobalContext);

  const [fileUrl, setFileUrl] = useState("");
  const [funding, setFunding] = useState(0);

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addHop(fileUrl, funding));
    router.push("/user/first-hop-existing");
  };

  return (
    <Container>
      <Head>
        <title>First Hop</title>
      </Head>
      <Header />
      <div className="flex flex-col items-start w-full max-w-4xl gap-10 px-8 mb-20 overflow-hidden">
        <h1 className="text-2xl text-brand-400">First Hop</h1>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="grid items-end w-full grid-cols-1 gap-10 overflow-scroll justify-items-start md:grid-cols-2 max-h-96">
          <Input
            label={"Submit a file URL"}
            value={fileUrl}
            placeholder={"enter any file url"}
            onChange={(e) => setFileUrl(e.target.value)}
            fullWidth={true}
          />
          <Input
            type="number"
            label={"Funding"}
            value={funding}
            onChange={(e) => setFunding(Number(e.target.value))}
            placeholder={"enter any amount"}
            fullWidth={true}
          />
          <Button
            disabled={fileUrl.length === 0}
            type="submit"
            fullWidth={true}
            className="flex flex-row items-center justify-center gap-2 mt-8 group">
            <p>SUBMIT</p>
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
        {hops.length !== 0 && (
          <button
            onClick={() => router.push("/user/first-hop-existing")}
            className="inline mt-2 font-medium text-left text-white/80 hover:text-white">
            VOTE FOR AN EXISITING SUBMISSION
          </button>
        )}
        <p className="mt-8 text-2xl font-light text-kggrey-200">
          Wallet Balance: 100 ROCK
        </p>
      </div>
    </Container>
  );
};

export default FirstHop;
