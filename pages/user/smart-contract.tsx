import React, { useContext, useEffect, useState } from "react";
import Container from "../../components/common/Container";
import { GlobalContext } from "../../state/contexts/GlobalContext";
import Head from "next/head";
import { ethers } from "ethers";
import Button from "../../components/common/Button";
import { useRouter } from "next/router";
import { setWalletAddress } from "../../state/actions/global";

declare let window: any;

const SmartContract = () => {
  const {
    state: {},
    dispatch,
  } = useContext(GlobalContext);

  const router = useRouter();
  const [link, setLink] = useState("");

  const abi = [
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "newAddress",
          type: "address",
        },
      ],
      name: "ContractCreated",
      type: "event",
    },
    {
      inputs: [],
      name: "allFoundations",
      outputs: [
        {
          internalType: "contract Kangaroo[]",
          name: "coll",
          type: "address[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "createKangaroo",
      outputs: [
        {
          internalType: "contract Kangaroo",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const setup = async () => {
    try {
      console.log("SEtYP");
      const addressContract = "0xdCc106447cE2ac2DB24eb10fE257dd57D89Ae9d3";
      const ethereum = (window as any).ethereum;
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const walletAddress = accounts[0];
      dispatch(setWalletAddress(walletAddress));
      const signer = provider.getSigner(walletAddress);
      const contract = new ethers.Contract(addressContract, abi, signer);

      const res = await contract.createKangaroo();
      console.log({ res });

      const foundations = await contract.allFoundations();
      console.log({ foundations });
      const link =
        "https://wallaby.filfox.info/en/address/" +
        foundations[foundations.length - 1];
      setLink(link);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!window.ethereum) return;
    try {
      setup();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const goToFirstHop = () => {
    router.push("/user/first-hop");
  };

  return (
    <Container>
      <Head>
        <title>Smart Contract</title>
      </Head>
      <div className="flex flex-col items-center justify-center w-full h-full max-w-5xl gap-10 px-20">
        <h1 className="text-3xl text-brand-400">
          {link.length > 0 ? "Deployed" : "Deploying"} Kangaroo Smart Contract
        </h1>
        {link.length > 0 ? (
          <a
            target="_blank"
            href={link}
            rel="noreferrer"
            className="text-blue-400 hover:text-blue-500">
            see transaction
          </a>
        ) : (
          <div className="animate-spin-slow">
            <svg
              width="244"
              height="244"
              viewBox="0 0 244 244"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M129.019 120.217C138.494 117.318 148.524 116.722 158.275 118.478C168.026 120.234 177.218 124.292 185.087 130.315C192.956 136.338 199.274 144.152 203.518 153.107C207.762 162.063 209.809 171.902 209.488 181.808C209.167 191.714 206.489 201.4 201.674 210.062C196.86 218.725 190.049 226.113 181.807 231.614C173.566 237.115 164.131 240.57 154.286 241.691C144.441 242.813 134.471 241.569 125.204 238.063C137.619 234.251 148.533 226.654 156.42 216.334C164.307 206.014 168.773 193.486 169.193 180.503C169.614 167.52 165.968 154.729 158.765 143.92C151.561 133.111 141.162 124.824 129.019 120.217Z"
                stroke="#997070"
                stroke-width="1.3908"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M128.208 125.703C136.955 130.355 144.467 137.027 150.12 145.165C155.772 153.303 159.402 162.673 160.708 172.496C162.014 182.319 160.958 192.312 157.628 201.645C154.298 210.978 148.79 219.382 141.562 226.158C134.333 232.935 125.593 237.888 116.067 240.608C106.54 243.328 96.5029 243.735 86.7877 241.796C77.0724 239.856 67.9599 235.627 60.2068 229.458C52.4538 223.289 46.2839 215.359 42.2095 206.326C53.6818 212.408 66.7671 214.753 79.6368 213.033C92.5064 211.313 104.517 205.614 113.991 196.733C123.464 187.851 129.927 176.231 132.476 163.496C135.025 150.762 133.533 137.548 128.208 125.703Z"
                stroke="#997070"
                stroke-width="1.3908"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M123.762 129.023C126.663 138.501 127.26 148.534 125.505 158.289C123.75 168.044 119.694 177.24 113.673 185.112C107.652 192.984 99.8401 199.305 90.8862 203.551C81.9322 207.797 72.0947 209.844 62.1909 209.524C52.287 209.203 42.6026 206.523 33.9421 201.707C25.2815 196.89 17.8949 190.076 12.3957 181.831C6.89643 173.586 3.44336 164.147 2.32327 154.299C1.20317 144.45 2.44838 134.477 5.95548 125.207C9.76754 137.623 17.3627 148.537 27.6793 156.425C37.9959 164.312 50.5183 168.778 63.4964 169.198C76.4745 169.619 89.2597 165.973 100.065 158.77C110.87 151.566 119.155 141.166 123.762 129.023Z"
                stroke="#997070"
                stroke-width="1.3908"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M118.284 128.191C113.635 136.944 106.965 144.461 98.8286 150.118C90.692 155.775 81.3234 159.408 71.5011 160.716C61.6789 162.024 51.6864 160.968 42.3537 157.638C33.021 154.307 24.6174 148.797 17.841 141.566C11.0646 134.334 6.11093 125.59 3.39148 116.058C0.672036 106.527 0.265279 96.4849 2.20501 86.7651C4.14475 77.0452 8.37501 67.9286 14.5444 60.1724C20.7137 52.4162 28.6441 46.2443 37.6769 42.1694C31.5951 53.6455 29.2501 66.7356 30.9696 79.6099C32.6891 92.4843 38.3872 104.5 47.2673 113.976C56.1475 123.453 67.766 129.917 80.4988 132.466C93.2316 135.015 106.442 133.52 118.284 128.191Z"
                stroke="#997070"
                stroke-width="1.3908"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M114.979 123.745C105.504 126.644 95.4745 127.24 85.7232 125.484C75.9718 123.727 66.78 119.669 58.9112 113.647C51.0424 107.624 44.7237 99.81 40.4798 90.8543C36.2359 81.8985 34.1893 72.0592 34.51 62.1535C34.8307 52.2478 37.5094 42.5616 42.3237 33.8993C47.138 25.2369 53.9488 17.8485 62.1907 12.3475C70.4326 6.84656 79.8675 3.39186 89.7121 2.27032C99.5566 1.14877 109.527 2.39275 118.794 5.89895C106.382 9.71385 95.4716 17.3121 87.5873 27.632C79.7031 37.9519 75.2389 50.4777 74.8186 63.4592C74.3983 76.4407 78.043 89.2292 85.2433 100.038C92.4436 110.846 102.84 119.135 114.979 123.745Z"
                stroke="#997070"
                stroke-width="1.3908"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M115.79 118.292C107.044 113.639 99.5336 106.967 93.8826 98.8283C88.2316 90.6899 84.6031 81.3204 83.2983 71.4978C81.9936 61.6753 83.0502 51.6832 86.3805 42.351C89.7108 33.0189 95.2187 24.6161 102.447 17.8403C109.675 11.0646 118.415 6.11131 127.941 3.39188C137.466 0.672444 147.503 0.265293 157.218 2.20423C166.933 4.14316 176.045 8.37224 183.798 14.5403C191.55 20.7084 197.72 28.6375 201.795 37.6692C190.323 31.5847 177.236 29.2379 164.365 30.9568C151.494 32.6757 139.482 38.3744 130.007 47.2563C120.532 56.1382 114.068 67.7594 111.519 80.4956C108.97 93.2317 110.464 106.446 115.79 118.292Z"
                stroke="#997070"
                stroke-width="1.3908"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M120.242 114.939C117.346 105.463 116.751 95.4323 118.508 85.6803C120.265 75.9283 124.322 66.7361 130.342 58.8671C136.363 50.9981 144.173 44.6793 153.125 40.4354C162.077 36.1914 171.912 34.1449 181.813 34.4656C191.714 34.7864 201.396 37.4651 210.054 42.2795C218.713 47.0939 226.098 53.9049 231.597 62.1471C237.096 70.3893 240.55 79.8247 241.672 89.67C242.795 99.5153 241.552 109.486 238.049 118.755C234.237 106.339 226.642 95.4244 216.325 87.5371C206.009 79.6498 193.486 75.1838 180.508 74.7634C167.53 74.343 154.745 77.9892 143.94 85.1923C133.135 92.3954 124.85 102.795 120.242 114.939Z"
                stroke="#997070"
                stroke-width="1.3908"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M125.72 115.77C130.371 107.019 137.041 99.5033 145.178 93.848C153.315 88.1927 162.683 84.5608 172.505 83.254C182.327 81.9472 192.319 83.0032 201.65 86.3343C210.982 89.6653 219.385 95.1754 226.161 102.407C232.936 109.638 237.889 118.382 240.609 127.913C243.328 137.443 243.735 147.485 241.795 157.204C239.856 166.923 235.626 176.04 229.458 183.796C223.289 191.552 215.36 197.724 206.328 201.799C212.412 190.323 214.759 177.232 213.041 164.356C211.322 151.48 205.624 139.463 196.744 129.985C187.863 120.507 176.243 114.042 163.509 111.493C150.775 108.945 137.563 110.44 125.72 115.77Z"
                stroke="#997070"
                stroke-width="1.3908"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        )}
        {link.length > 0 && (
          <Button
            onClick={goToFirstHop}
            type="button"
            fullWidth={true}
            className="flex flex-row items-center justify-center gap-2 mt-8 group">
            <p>Next</p>
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
        )}
      </div>
    </Container>
  );
};

export default SmartContract;
