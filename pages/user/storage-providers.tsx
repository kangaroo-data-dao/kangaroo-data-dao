import React, { useContext, useState } from "react";
import Container from "../../components/common/Container";
import { GlobalContext } from "../../state/contexts/GlobalContext";
import Head from "next/head";
import Header from "../../components/common/Header";
import { useRouter } from "next/router";
import { Dialog } from "@headlessui/react";

const StorageProviders = () => {
  const {
    state: {},
    dispatch,
  } = useContext(GlobalContext);
  let [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/user/token-and-members");
  };

  const [tableData, setTableData] = useState([
    {
      fileURL:
        "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-zip-file.zip",
      funding: 70,
      votingPercentage: 10,
    },
    {
      fileURL:
        "https://drive.google.com/file/d/1_zeJqQP8umrTk-evSAt3wCLxAkTKo0lC/view",
      funding: 30,
      votingPercentage: 20,
    },
  ]);

  return (
    <Container>
      <Head>
        <title>Storage Providers Submissions</title>
      </Head>
      <Header />
      <div className="flex flex-col items-start w-full max-w-4xl gap-10 px-8 mb-20 overflow-hidden">
        <h1 className="text-2xl text-brand-400">
          Storage Providers Submissions
        </h1>
        <div className="flex flex-col w-full max-w-5xl overflow-scroll text-white border border-gray-800 item-stretch max-h-96">
          <div className="flex flex-row">
            <div className="flex-1 p-4">File URL</div>
            <div className="flex-1 p-4">Funding</div>
            <div className="flex-1 p-4">Voting %</div>
            <div className="flex-1 p-4">Action</div>
          </div>
          {tableData.map((data, index) => {
            return (
              <div
                key={index}
                className="flex flex-row text-black bg-white border-b border-grey-200">
                <a
                  href={data.fileURL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 p-4 text-blue-600 hover:underline ">
                  {data.fileURL.slice(0, 25)}...
                </a>
                <div className="flex-1 p-4">{data.funding} (ROCK)</div>
                <div className="flex-1 p-4">{data.votingPercentage}%</div>
                <div className="flex-1 p-4">
                  <button
                    onClick={() => setIsOpen(true)}
                    className="text-sm font-semibold text-blue-500 uppercase hover:text-blue-600 active:text-blue-500">
                    Vote
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-8 text-2xl font-light text-kggrey-200">
          Time left for next epoch: 23 days
        </p>
        <button className="mt-2 font-medium text-left uppercase text-white/80 hover:text-white">
          disconnect wallet
        </button>
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-50">
          <div className="fixed inset-0 bg-black/30"></div>
          <div className="fixed inset-0 overflow-y-auto">
            {/* Container to center the panel */}
            <div className="flex items-center justify-center min-h-full p-4">
              <Dialog.Panel className="flex flex-col w-full max-w-3xl gap-4 p-4 mx-auto bg-white rounded md:w-1/3 ">
                <Dialog.Title className="">Enter the id&apos;s</Dialog.Title>
                <p className="my-2 text-zinc-500">
                  Have you verified the authenticity of the deal by verifying
                  the data & URL
                </p>
                <form className="flex flex-col w-full gap-8">
                  <div className="flex flex-col w-full gap-4">
                    <input
                      className="w-full border-b border-grey-300 focus:outline-none"
                      placeholder="Deal ID"
                    />
                    <input
                      className="w-full border-b border-grey-300 focus:outline-none"
                      placeholder="PieceCID"
                    />
                  </div>
                  <div className="flex justify-end gap-4 pt-2">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-sm font-semibold uppercase text-zinc-400 hover:text-zinc-500 active:text-zinc-400">
                      VOTE NO
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-sm font-semibold text-green-500 uppercase hover:text-green-600 active:text-green-500">
                      VOTE YES
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </div>
    </Container>
  );
};

export default StorageProviders;
