import React from "react";
import styled from "styled-components";

const Input = styled.input`
  border: none;
  padding: 1rem;
  width: 100%;
  min-width: 15rem;
  height: 3rem;
  background-color: #444556;
  color: #fff;
  // border: 1px solid #d9d9d9;
  border-radius: 0.325rem;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0 0 0;
`;

const Title = styled.h4`
  margin: 0 0 0.25rem 0.25rem;
  font-weight: 600;
`;

interface Props {
  onChange: (e: string) => void;
  placeholder?: string;
  value?: string | undefined;
  type?: string;
  title?: string;
  height?: string;
  defaultValue?: string;
}

export default ({
  onChange,
  value,
  defaultValue,
  placeholder,
  type,
  title,
  height,
}: Props) => {
  return (
    <InputWrapper key={`${title}${placeholder}`}>
      <Title>{title}</Title>
      <Input
        placeholder={placeholder || title}
        value={value !== undefined ? value : defaultValue}
        type={type}
        height={height}
        onChange={(e) => onChange(e.currentTarget.value || "")}
      />
    </InputWrapper>
  );
};
