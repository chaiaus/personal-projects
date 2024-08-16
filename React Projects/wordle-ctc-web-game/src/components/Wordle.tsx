import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import styled from "styled-components";
import { Backspace, SavedSearch, TrackChanges } from "@mui/icons-material";
import "../style.css";
import { useEffect, useState } from "react";
import { blue, red } from "@mui/material/colors";

interface Props {
  word: string;
  wordArr: string[];
  onRoundOver: (status: string, text: string, point: number) => void;
}

let wordleLetterArr = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];
const hintOne: any[] = [];
let letterArrCopy = [...wordleLetterArr.flat()];

const WordleText = styled.input.attrs((props) => ({
  className: props.className,
}))`
  &.wrong-place {
    background-color: var(--color-sunglow);
    border: 0;
  }
  &.not-included {
    background-color: var(--color-davysgray);
    border: 0;
  }
  &.right-place {
    background-color: var(--color-pistachio);
    border: 0;
  }
  &.hint {
    background-color: var(--color-pistachio);
  }
  &.hint::placeholder {
    color: var(--color-davysgray);
  }
  display: flex;
  text-align: center;
  background-color: transparent;
  border: 3px solid gray;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 5px;
  font-family: "Arial Rounded MT Bold";
  border: 3px solid gray;
  font-size: 26px;
  padding-top: 0;
`;

const WordleTile = styled.button.attrs((props) => ({
  className: props.className,
}))`
  &.wrong-place {
    background-color: var(--color-sunglow);
  }
  &.not-included {
    background-color: var(--color-davysgray);
  }
  &.right-place {
    background-color: var(--color-pistachio);
  }

  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Arial Rounded MT Bold";
  font-size: 22px;
  color: white;
  width: 33px;
  height: 45px;
  border-radius: 5px;
  border: 0;
  border-bottom: 1px solid white;
  box-shadow: var(--color-timberwolf) 0 5px 0;
  background-color: var(--color-battleshipgray);
  cursor: pointer;
`;

const WordleHint = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  border: 0;
  color: #3d3d3d;
  cursor: pointer;
`;

const ButtonBadge = styled.span`
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: rgba(220, 53, 69, 0.8);
  border-radius: 50%;
  padding: 4px;
  font-size: 10px;
  color: white;
  margin-left: 30px;
`;

export const Wordle = ({ word, wordArr, onRoundOver }: Props) => {
  let cellRow = [];
  const cellSet = [];
  const [wordCopy, setWordCopy] = useState(word.split(""));
  const [hintCount, setHintCount] = useState([3, 3]);
  const [wordleGuess, setWordleGuess] = useState(() => {
    const localValue = localStorage.getItem("");
    if (localValue == null) return [];

    return JSON.parse(localValue);
  });
  const [wordleGuessList, setWordleGuessList] = useState(() => {
    const localValue = localStorage.getItem("");
    if (localValue == null) return [];

    return JSON.parse(localValue);
  });

  // useEffect(() => {
  //   localStorage.setItem("GUESS", JSON.stringify(wordleGuess));
  // }, [wordleGuess]);

  // const [history, setHistory] = useState<any>((currentWord: string) => {
  //   if (currentWord === word) {
  //     return currentWord;
  //   } else {
  //     return word;
  //   }
  // });

  console.log(history, word);

  function onHintOne() {
    const letterHint = wordCopy[Math.floor(Math.random() * wordCopy.length)];
    const letterIndex = word.indexOf(letterHint);

    setWordCopy((currentCopy: string[]) => {
      return currentCopy.filter((letter, index) => letterIndex != index);
    });

    if (hintCount[0] > 0) {
      hintOne.push([letterIndex, letterHint]);
      displayHintOne(wordleGuessList.length, letterIndex);
      const remaining = hintCount.map((c, i) => {
        if (i === 0 && c > 0) {
          return c - 1;
        } else {
          return c;
        }
      });
      setHintCount(remaining);
    }
    console.log(wordCopy, letterHint);
  }

  function onHintTwo() {
    letterArrCopy;
    if (hintCount[1] > 0) {
      for (var i = 0; i < 3; i++) {
        const ltrToRemove =
          letterArrCopy[Math.floor(Math.random() * letterArrCopy.length)];

        const tile = document.getElementById("wordle-tile-" + ltrToRemove);
        tile?.classList.add("not-included");
        letterArrCopy.splice(letterArrCopy.indexOf(ltrToRemove), 1);
        const remaining = hintCount.map((c, i) => {
          if (i === 1 && c > 0) {
            return c - 1;
          } else {
            return c;
          }
        });
        setHintCount(remaining);
      }
    }
  }

  function displayHintOne(guessNumber: number, guessLetterIndex: number) {
    console.log(guessNumber, guessLetterIndex);
    for (var i = 0; i < hintOne.length; i++) {
      const index = hintOne[i][0];
      const letter = hintOne[i][1];
      const cell = document.getElementById(
        "wordle-cell-" + guessNumber + "-" + index
      );
      cell?.setAttribute("placeholder", letter);
      (index === guessLetterIndex || guessLetterIndex === 0) &&
        cell?.classList.add("hint");
    }
  }

  // Tile Events
  const onWordleTileClick = (tile: string, text: string) => {
    let tileCol = wordleGuess.length;

    if (
      tile != "wordle-backspace" &&
      wordleGuess.length != 5 &&
      wordleGuessList.length < 6
    ) {
      setWordleGuess((currentGuess: string[]) => {
        return [...currentGuess, text];
      });
    } else if (tile === "wordle-backspace") {
      setWordleGuess((currentGuess: string[]) => {
        return currentGuess.filter(
          (letter, index) => index != wordleGuess.length - 1
        );
      });
      tileCol = wordleGuess.length - 1;
    }
    const cell = document.getElementById(
      "wordle-cell-" + wordleGuessList.length + "-" + tileCol
    );

    cell?.setAttribute("value", text === "backspace" ? "" : text);
    tile != "wordle-backspace"
      ? cell?.classList.remove("hint")
      : displayHintOne(wordleGuessList.length, tileCol);
  };

  const onClickSubmit = () => {
    const guess = wordleGuess.join("");

    if (wordleGuessList.length < 6) {
      setWordleGuessList((currentGuessList: string[]) => {
        return [...currentGuessList, guess];
      });
      // wordleGuessList.push(guess);
      displayHintOne(wordleGuessList.length + 1, 0);
    }

    for (var i = 0; i < 5; i++) {
      const cell = document.getElementById(
        "wordle-cell-" + wordleGuessList.length + "-" + i
      );
      const tile = document.getElementById("wordle-tile-" + wordleGuess[i]);
      if (word.includes(wordleGuess[i]) === true) {
        // add a function that will check
        if (word[i] === wordleGuess[i]) {
          cell?.classList.add("right-place");
          tile?.classList.add("right-place");
          wordCopy.splice(wordCopy.indexOf(wordleGuess[i]), 1);
        } else {
          cell?.classList.add("wrong-place");
          tile?.classList.add("wrong-place");
        }
      } else {
        cell?.classList.add("not-included");
        tile?.classList.add("not-included");
        letterArrCopy.splice(letterArrCopy.indexOf(wordleGuess[i]), 1);
      }
      cell?.classList.remove("hint");
    }

    if (guess === word) {
      for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 5; j++) {
          const cell = document.getElementById("wordle-cell-" + i + "-" + j);
          cell?.removeAttribute("value");
          cell?.removeAttribute("placeholder");
          cell?.classList.remove(
            "right-place",
            "wrong-place",
            "not-included",
            "hint"
          );
        }
      }

      for (var i = 0; i < wordleLetterArr.join().length; i++) {
        const tile = document.getElementById(
          "wordle-tile-" + wordleLetterArr.join()[i]
        );
        tile?.classList.remove("right-place", "wrong-place", "not-included");
      }

      onRoundOver(
        "passed",
        "You're correct! The word is " + word,
        6 - wordleGuessList.length
      );
      setWordleGuessList([]);
    } else if (guess != word && wordleGuessList.length === 6) {
      onRoundOver("failed", "You're wrong! The word is " + word, 0);
    }
    setWordleGuess([]);
  };

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 5; j++) {
      cellRow.push(
        <WordleText
          key={"wordle-cell-" + i + "-" + j}
          id={"wordle-cell-" + i + "-" + j}
          disabled
        />
      );
    }
    cellSet.push(
      <Stack
        direction="row"
        useFlexGap
        flexWrap="wrap"
        spacing={0.5}
        key={"wordle-cell-row" + i}
        className="d-flex align-items-center justify-content-center"
      >
        {cellRow}
      </Stack>
    );
    cellRow = [];
  }
  // console.log(wordleGuess, wordleGuess.length);

  return (
    <>
      <Box className="default-box-style" sx={{ height: "3%" }}>
        <Typography variant="subtitle1">guess the word</Typography>
      </Box>
      <Box className="default-box-style" sx={{ height: "55%" }}>
        <Stack direction="column" useFlexGap flexWrap="wrap" spacing={0.5}>
          {cellSet}
        </Stack>
      </Box>
      <Box className="default-box-style" sx={{ height: "25%" }}>
        <Stack
          direction="column"
          useFlexGap
          flexWrap="wrap"
          spacing={1.5}
          sx={{ justifyContent: "center" }}
        >
          {wordleLetterArr.map((tilerow, index) => (
            <Stack
              key={"wordle-tile-row" + index}
              direction="row"
              useFlexGap
              flexWrap="wrap"
              spacing={0.5}
              sx={{ justifyContent: "center" }}
            >
              {tilerow.map((letter) => (
                <WordleTile
                  key={"wordle-tile-" + letter}
                  id={"wordle-tile-" + letter}
                  onClick={() => onWordleTileClick("wordle-" + letter, letter)}
                >
                  {letter}
                </WordleTile>
              ))}
              {index === 2 && (
                <WordleTile
                  key={"wordle-tile-backspace"}
                  id={"wordle-tile-backspace"}
                  style={{ width: "50px" }}
                  onClick={() =>
                    onWordleTileClick("wordle-backspace", "backspace")
                  }
                >
                  <Backspace />
                </WordleTile>
              )}
            </Stack>
          ))}
        </Stack>
      </Box>
      <Box className="default-box-style" sx={{ height: "15%" }}>
        <Stack direction="row" useFlexGap flexWrap="wrap" spacing={2}>
          <WordleHint
            style={{ backgroundColor: "var(--color-hunyadiyellow)" }}
            onClick={() => onHintOne()}
            disabled={hintCount[0] === 0}
          >
            <ButtonBadge>{hintCount[0]}</ButtonBadge>
            <TrackChanges fontSize="large" />
          </WordleHint>
          <Button
            variant={"contained"}
            className="submit-btn"
            sx={[
              wordleGuess.length < 5 && {
                backgroundColor: "var(--color-battleshipgray)",
              },
              wordleGuess.length === 5 &&
                wordArr.includes(wordleGuess.join("")) === true && {
                  backgroundColor: blue[400],
                },
              wordleGuess.length === 5 &&
                wordArr.includes(wordleGuess.join("")) !== true && {
                  backgroundColor: red[400],
                },
            ]}
            onClick={() => onClickSubmit()}
            disabled={
              wordleGuess.length < 5 ||
              (wordleGuess.length === 5 &&
                wordArr.includes(wordleGuess.join("")) !== true)
            }
          >
            {wordleGuess.length === 5 &&
            wordArr.includes(wordleGuess.join("")) !== true
              ? "INVALID"
              : "SUBMIT"}
          </Button>
          <WordleHint
            style={{ backgroundColor: "var(--color-pistachio)" }}
            onClick={() => onHintTwo()}
            disabled={hintCount[1] === 0}
          >
            <ButtonBadge>{hintCount[1]}</ButtonBadge>
            <SavedSearch fontSize="large" />
          </WordleHint>
        </Stack>
      </Box>
    </>
  );
};
