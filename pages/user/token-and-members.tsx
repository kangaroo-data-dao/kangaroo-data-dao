import React, { Fragment, useContext, useState } from "react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Container from "../../components/common/Container";
import { GlobalContext } from "../../state/contexts/GlobalContext";
import { addDaoMember } from "../../state/actions/global";
import Head from "next/head";
import Header from "../../components/common/Header";
import { useRouter } from "next/router";

const TokenAndMembers = () => {
  const {
    state: { members: storedMembers },
    dispatch,
  } = useContext(GlobalContext);

  const router = useRouter();

  const [members, setMembers] = useState(storedMembers);

  const handleChange = (
    id: number,
    key: "tokenDistribution" | "address",
    value: string
  ) => {
    const newMembers = members.map((member) => {
      if (member.id === id) {
        return { ...member, [key]: value };
      }
      return member;
    });
    setMembers(newMembers);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setMembers(members));
    router.push("/user/smart-contract");
  };

  const addMember = () => {
    setMembers([
      ...members,
      {
        address: "",
        tokenDistribution: 0,
        id: members[members.length - 1].id + 1,
      },
    ]);
  };

  const removeMember = (id: number) => {
    setMembers(members.filter((member) => member.id !== id));
  };

  return (
    <Container>
      <Head>
        <title>Token Distribution & Members</title>
      </Head>
      <Header />
      <div className="flex flex-col w-full max-w-4xl gap-10 px-8 mb-40 overflow-hidden">
        <h1 className="text-2xl text-brand-400">
          Token Distribution & Members
        </h1>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="grid items-end w-full grid-cols-1 gap-10 overflow-scroll justify-items-start md:grid-cols-2 max-h-96">
          {members.map((data, index) => (
            <Fragment key={data.id}>
              <Input
                label={`Member ${data.id} - FEVM Address`}
                value={data.address}
                placeholder="0x36b230a84D8333d58556772ed701b41Bbb264305"
                onChange={(e) =>
                  handleChange(data.id, "address", e.target.value)
                }
                fullWidth={true}
              />
              <div className="flex items-end w-full gap-2">
                <Input
                  label="Token Distribution"
                  value={data.tokenDistribution}
                  placeholder="0"
                  onChange={(e) =>
                    handleChange(data.id, "tokenDistribution", e.target.value)
                  }
                  className="flex-1"
                  fullWidth={true}
                />
                {members.length > 1 && (
                  <svg
                    onClick={() => removeMember(data.id)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 text-red-200 cursor-pointer hover:text-red-400">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
              </div>
            </Fragment>
          ))}
          <Button
            type="button"
            onClick={addMember}
            variant="secondary"
            className="flex items-center justify-center gap-2 ">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="white" />
            </svg>
            Add Member
          </Button>
          <Button
            type="submit"
            disabled={members[0].address.length === 0}
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
};

export default TokenAndMembers;
