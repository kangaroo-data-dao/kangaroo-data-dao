import React, { useContext, useState } from "react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Container from "../../components/common/Container";
import { GlobalContext } from "../../state/contexts/GlobalContext";
import Head from "next/head";
import Header from "../../components/common/Header";
import { useRouter } from "next/router";
import { setDaoData } from "../../state/actions/global";

const CreateDAO = () => {
  const {
    state: {},
    dispatch,
  } = useContext(GlobalContext);

  const [formData, setFormData] = useState([
    { label: "DAO Name", value: "" },
    { label: "DAO Token Name", value: "" },
    { label: "DAO Token Supply", value: "" },
  ]);

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      setDaoData(formData[0].value, formData[1].value, formData[2].value)
    );
    router.push("/user/token-and-members");
  };

  const handleChange = (label: string, value: string) => {
    const newData = formData.map((data) => {
      if (data.label === label) {
        return { ...data, value };
      }
      return data;
    });
    setFormData(newData);
  };

  return (
    <Container>
      <Head>
        <title>Create Data DAO</title>
      </Head>
      <Header />
      <div className="flex flex-col w-full max-w-4xl gap-10 px-8 mb-40 overflow-hidden">
        <h1 className="text-2xl text-brand-400">Create a Data DAO</h1>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="grid items-end w-full grid-cols-1 gap-10 md:grid-cols-2">
          {formData.map((data) => (
            <Input
              key={data.label}
              label={data.label}
              value={data.value}
              placeholder={`enter ${data.label.toLowerCase()}`}
              onChange={(e) => handleChange(data.label, e.target.value)}
              fullWidth={true}
            />
          ))}
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
};

export default CreateDAO;
