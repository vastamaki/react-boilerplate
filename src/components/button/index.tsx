import React, { ReactElement } from "react";
import styled from "styled-components";

const Button = styled.button`
  border: none;
  width: ${({ theme }) => theme.width || "10rem"};
  height: ${({ theme }) => theme.height || "3rem"};
  margin: ${(props) => props.theme.margin || "1rem 0 0 0"};
  border-radius: 0.325rem;
  background-color: ${({ theme }) =>
    theme.disabled ? theme.color || "#EFEFEF" : theme.color};
  cursor: pointer;
`;

interface Props {
  onClick: (e: any) => void;
  value: string | ReactElement;
  color?: string;
  margin?: string;
  disabled?: boolean;
  width?: string;
  height?: string;
}

export default ({
  onClick,
  value,
  color,
  margin,
  disabled,
  width,
  height,
}: Props) => {
  return (
    <Button
      disabled={disabled || false}
      theme={{ color, margin, disabled, height, width }}
      onClick={onClick}
    >
      {value}
    </Button>
  );
};