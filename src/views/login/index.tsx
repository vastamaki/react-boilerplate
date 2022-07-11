import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Button from "components/button";
import Input from "components/input";
import { useNavigate } from "react-router-dom";
import { customFetch } from "helpers/fetch";
import LoadingPage from "components/loading-spinner";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const LoginForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 1rem;
  padding: 0 5rem;
  height: 30rem;
  background-color: #222831;
`;

const Error = styled.h4`
  color: red;
`;

const Title = styled.h1`
  margin: 0 0 2rem 0;
  font-weight: 500;
`;

const ForgotPassword = styled.h4``;

export default () => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState<boolean>(false);

  const navigation = useNavigate();

  const onClick = async () => {
    setLoading(true);
    const req = await customFetch(`/login`, {
      method: "POST",
      body: JSON.stringify({
        username: state.username,
        password: state.password,
      }),
    });

    if (req.status !== 200) {
      setLoading(false);
      setError(true);
    }

    const { AuthenticationResult } = await req.json();

    if (AuthenticationResult) {
      const { AccessToken, IdToken, RefreshToken } = AuthenticationResult;
      localStorage.setItem("access_token", AccessToken);
      localStorage.setItem("refresh_token", RefreshToken);
      localStorage.setItem("id_token", IdToken);
      navigation("/");
    }
    setLoading(false);
  };

  return (
    <Wrapper>
      <LoginForm>
        <Title>LOGIN</Title>
        <Input
          onChange={(text: string) =>
            setState({
              ...state,
              username: text,
            })
          }
          placeholder="Email"
          title="EMAIL"
          value={state.username}
        />
        <Input
          onChange={(text: string) =>
            setState({
              ...state,
              password: text,
            })
          }
          type="password"
          placeholder="Password"
          title="PASSWORD"
          value={state.password}
        />
        {error && <Error>Invalid username or password</Error>}
        <Button
          width="100%"
          margin="1rem"
          onClick={onClick}
          color="#ff6961"
          value={loading ? <LoadingPage /> : "Login"}
        />

        <ForgotPassword>Forgot your password? <a href="/forgot-password">Click here</a></ForgotPassword>
      </LoginForm>
    </Wrapper>
  );
};
