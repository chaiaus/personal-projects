import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";

interface Props {
  code: number[];
  clues: any[];
  onRoundOver: (status: string, answer: any, point: number) => void;
}

let guessNums = [0, 0, 0];

const CtCCell = styled.input`
  width: 50px;
  height: 65px;
  border-radius: 10px;
  border: 3px solid gray;
  background-color: transparent;
  font-family: "Rockwell";
  font-size: 45px;
  text-align: center;
  padding-top: 17px;
`;

const CtCText = styled.input`
  width: 60px;
  height: 75px;
  border-radius: 10px;
  border: 3px solid white;
  color: white;
  background-color: transparent;
  font-family: "Rockwell";
  font-size: 45px;
  text-align: center;
  padding-top: 17px;
`;

const ArrowUp = styled.div`
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 15px solid gray;
  &:hover {
    border-bottom: 15px solid #76ff03;
    cursor: pointer;
  }
`;

const ArrowDown = styled.div`
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 15px solid gray;
  &:hover {
    border-top: 15px solid #76ff03;
    cursor: pointer;
  }
`;

export const CrackTheCode = ({ code, clues, onRoundOver }: Props) => {
  const [guess, setGuess] = useState(guessNums);
  const clueArr = [
    {
      numSet: clues[0],
      clue: "One number is correct but is wrongly placed",
      color: "#A5C4E4",
    },
    { numSet: clues[1], clue: "Nothing is correct", color: "#FCE6A2" },
    {
      numSet: clues[2],
      clue: "Two numbers are correct but were wrongly placed",
      color: "#BBD6AB",
    },
    {
      numSet: clues[3],
      clue: "One number is correct and is in the right place",
      color: "#F0D4DB",
    },
    {
      numSet: clues[4],
      clue: "One number is correct but is wrongly placed",
      color: "#A5C4E4",
    },
  ];

  function handleButtonUp(index: number) {
    const guessNum = guess.map((c, i) => {
      if (i === index && c < 9) {
        return c + 1;
      } else {
        return c;
      }
    });
    setGuess(guessNum);
  }

  function handleButtonDown(index: number) {
    const guessNum = guess.map((c, i) => {
      if (i === index && c > 0) {
        return c - 1;
      } else {
        return c;
      }
    });
    setGuess(guessNum);
  }

  document.onkeydown = function (e) {
    if (e.key === "Enter") {
      if (guess.join("") === code.join("")) {
        onRoundOver(
          "passed",
          "You're correct! The code is " + code.join(""),
          1
        );
      } else {
        onRoundOver("failed", "You're wrong! The code is " + code.join(""), 0);
      }
    }
  };

  return (
    <>
      <Box className="default-box-style" sx={{ height: "3%" }}>
        <Typography variant="subtitle1">guess the code</Typography>
      </Box>
      <Box className="default-box-style" sx={{ height: "60%" }}>
        <Stack
          direction="column"
          useFlexGap
          flexWrap="wrap"
          spacing={1}
          sx={{ width: "100%" }}
        >
          {clueArr.map((clueSet, xindex) => (
            <Stack
              key={"ctc-clue-row" + xindex}
              direction="row"
              useFlexGap
              flexWrap="wrap"
              spacing={1}
              sx={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Stack
                key={"ctc-clue-row" + xindex}
                direction="row"
                useFlexGap
                flexWrap="wrap"
                spacing={0.5}
                sx={{
                  width: "40%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {clueSet.numSet.map((num: number, yindex: number) => (
                  <CtCCell
                    key={"ctc-clue" + xindex + "-cell" + yindex}
                    value={num}
                    style={{ color: clueSet.color }}
                    disabled
                  />
                ))}
              </Stack>
              <Typography variant="subtitle1" sx={{ width: "55%" }}>
                {clueSet.clue}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
      <Box className="default-box-style" sx={{ height: "20%" }}>
        <Stack direction="row" useFlexGap flexWrap="wrap" spacing={1}>
          {guess.map((num, index) => (
            <Stack
              key={"ctc-digit-" + (index + 1)}
              direction="column"
              useFlexGap
              flexWrap="wrap"
              spacing={0.7}
              sx={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ArrowUp
                id={"ctc-btn-up" + (index + 1)}
                onClick={() => handleButtonUp(index)}
              />
              <CtCText
                id={"ctc-digit-box" + (index + 1)}
                value={num}
                disabled
              />
              <ArrowDown
                id={"ctc-btn-down" + (index + 1)}
                onClick={() => handleButtonDown(index)}
              />
            </Stack>
          ))}
        </Stack>
      </Box>
      <Box className="default-box-style" sx={{ height: "10%" }}>
        <Typography variant="subtitle1" width="80%" textAlign="center">
          hit ENTER / RETURN to submit your answer
        </Typography>
      </Box>
    </>
  );
};
