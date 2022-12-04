import React, { useContext, useEffect, useState } from "react";
import Container from "../../components/common/Container";
import { GlobalContext } from "../../state/contexts/GlobalContext";
import Head from "next/head";
import Header from "../../components/common/Header";
import { useRouter } from "next/router";

const FirstHopExisting = () => {
  const {
    state: { hops },
    dispatch,
  } = useContext(GlobalContext);

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/storage-provider/kangaroo-submissions");
  };

  // const [tableData, setTableData] = useState([
  //   {
  //     fileURL:
  //       "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-zip-file.zip",
  //     funding: 70,
  //   },
  //   {
  //     fileURL:
  //       "https://drive.google.com/file/d/1_zeJqQP8umrTk-evSAt3wCLxAkTKo0lC/view",
  //     funding: 30,
  //   },
  // ]);

  const tableData = hops;

  const [buttonText, setButtonText] = useState("Pending SP");

  useEffect(() => {
    const timer = setTimeout(() => {
      setButtonText("View");
    }, 30000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Container>
      <Head>
        <title>First Hop - Existing Submission</title>
      </Head>
      <Header />
      <div className="flex flex-col items-start w-full max-w-4xl gap-10 px-8 mb-20 overflow-hidden">
        <h1 className="text-2xl text-brand-400">
          First Hop - Existing Submission
        </h1>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="grid items-end w-full grid-cols-1 gap-10 overflow-scroll justify-items-start md:grid-cols-2 max-h-96">
          <div className="flex flex-col w-full max-w-5xl col-span-2 overflow-scroll text-white border border-gray-800 item-stretch max-h-96">
            <div className="flex flex-row">
              <div className="flex-1 p-4">File URL</div>
              <div className="flex-1 p-4">Funding (ROCK)</div>
              <div className="flex-1 p-4">Action</div>
            </div>
            {tableData.map((data, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-row text-black bg-white border-b border-grey-200">
                  <a
                    href={data.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 p-4 text-blue-600 hover:underline">
                    {data.fileUrl.slice(0, 25)}...
                  </a>
                  <div className="flex-1 p-4 shrink-0">{data.funding}</div>
                  <div className="flex-1 p-4 shrink-0">
                    <button
                      onClick={() => router.push("/user/storage-providers")}
                      type="button"
                      className="text-sm font-semibold text-blue-500 uppercase hover:text-blue-600 active:text-blue-500">
                      {buttonText}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </form>

        <p className="mt-8 text-2xl font-light text-kggrey-200">
          Wallet Balance: 100 ROCK
        </p>
        <button
          className="mt-2 font-medium text-left uppercase text-white/80 hover:text-white"
          onClick={() => router.push("/user/first-hop")}>
          Create a submission
        </button>
      </div>
    </Container>
  );
};

export default FirstHopExisting;
