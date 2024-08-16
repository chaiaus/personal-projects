import { Box, Button, Grid, Modal, Stack, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { Close, QuestionMark } from "@mui/icons-material/";
import { useEffect, useState } from "react";
import "./style.css";
import styled from "styled-components";
import { Wordle } from "./components/Wordle";
import { CrackTheCode } from "./components/CrackTheCode";
import fileUrl from "./fiveLetterWordsFiltered.txt";

const ButtonOption = styled.button`
  width: 37px;
  height: 37px;
  border-radius: 100%;
  border: 0;
  color: white;
  text-align: center;
  justify-content: center;
  cursor: pointer;
`;
const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "white",
  borderRadius: "20px",
  boxShadow: 24,
  textAlign: "center",
  p: 4,
};
const gameButtons = [
  { id: "WRDLBtn", name: "Wordle", color: "#A5C4E4" },
  { id: "CTCBtn", name: "Crack The Code", color: "#FCE6A2" },
  // { id: "CFBtn", name: "Connect 4", color: "#BBD6AB" },
  // { id: "TTTBtn", name: "Tic-Tac-Toe", color: "#F0D4DB" },
];

let ctcNumArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let shuffledCode: number[] = [];
let xdigits: number[] = [];

// Customized Shuffle function
function shuffleDigits(tgtArr: number[], srcArr: number[]) {
  while (tgtArr.length < srcArr.length) {
    const rndmDigit = srcArr[Math.floor(Math.random() * srcArr.length)];
    tgtArr.includes(rndmDigit) === false && tgtArr.push(rndmDigit);
  }
}

function clueShuffle(srcArr: number[], refArr: number[], digit: number) {
  while (srcArr.indexOf(digit) === refArr.indexOf(digit)) {
    for (let i = srcArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [srcArr[i], srcArr[j]] = [srcArr[j], srcArr[i]];
    }
  }

  return srcArr;
}

function clueShuffle2(tgtArr: number[], refArr: number[][], digit: number[]) {
  while (
    tgtArr.indexOf(digit[0]) === refArr[0].indexOf(digit[0]) ||
    tgtArr.indexOf(digit[0]) === refArr[1].indexOf(digit[0]) ||
    tgtArr.indexOf(digit[1]) === refArr[1].indexOf(digit[1])
  ) {
    for (let i = tgtArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tgtArr[i], tgtArr[j]] = [tgtArr[j], tgtArr[i]];
    }
  }

  return tgtArr;
}

function clueShuffle3(srcArr: number[], refArr: number[], digit: number) {
  while (srcArr.indexOf(digit) != refArr.indexOf(digit)) {
    for (let i = srcArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [srcArr[i], srcArr[j]] = [srcArr[j], srcArr[i]];
    }
  }

  return srcArr;
}

const GamePane = () => {
  const [activeGame, setActiveGame] = useState<boolean | string>(false);
  const [wordleWord, setWordleWord] = useState("");
  const [wordleArr, setWordleArr] = useState<any>([]);
  const loadTextFile = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw res;
    }
    return res.text();
  };

  useEffect(() => {
    loadTextFile(fileUrl)
      .then(function (result) {
        var words = result.split("\n");
        setWordleArr(words);
      })
      .catch(console.error);
  }, []);
  let code: number[] = [];
  const [ctcCode, setCtcCode] = useState<any>([]);
  const [ctcClues, setCtcClues] = useState<any>([]);
  const [gameModal, setGameModal] = useState<any>([false, "status", "text"]);
  const [infoModal, setInfoModal] = useState<any>(false);
  const [score, setScore] = useState(0);
  const handleClose = () => {
    setGameModal([false, "status", "text"]);
    setInfoModal(false);
  };

  function generateWordle() {
    setWordleWord(wordleArr[Math.floor(Math.random() * wordleArr.length)]);
  }

  function generateCrackTheCode() {
    while (code.length < 3) {
      const num = Math.floor(Math.random() * 10);
      if (code.includes(num) === false) {
        code.push(num);
        ctcNumArr.splice(ctcNumArr.indexOf(num), 1);
      }
    }

    // Shuffling code digits for distribution of clues
    shuffleDigits(shuffledCode, code);

    // Shuffling wrong digits for distribution of clues
    shuffleDigits(xdigits, ctcNumArr);

    // Generate Clue No. 1 - 1 digit from code, 2 digits from list
    const clue1 = clueShuffle(
      [shuffledCode[0], xdigits[0], xdigits[1]],
      code,
      shuffledCode[0]
    );

    // Generate Clue No. 2 - 2 digits from list, 1 xdigit from clue 1
    const clue2 = clueShuffle(
      [xdigits[0], xdigits[2], xdigits[3]],
      clue1,
      xdigits[0]
    );

    // Generate Clue No. 3 - the code digit from clue 1, 1 digit from code, 1 digit from list
    const clue3 = clueShuffle2(
      [shuffledCode[0], shuffledCode[1], xdigits[4]],
      [clue1, code],
      [shuffledCode[0], shuffledCode[1]]
    );

    // Generate Clue No. 4 - 1 digit from code, 1 digit from clue 2, 1 digit from list
    const clue4 = clueShuffle3(
      [shuffledCode[2], xdigits[2], xdigits[5]],
      code,
      shuffledCode[2]
    );

    // Generate Clue No. 5 - 1 digit from code, 1 digit from clue 2, 1 digit from list
    const clue5 = clueShuffle2(
      [shuffledCode[1], xdigits[3], xdigits[6]],
      [clue3, code],
      [shuffledCode[1], xdigits[3]]
    );

    setCtcCode(code);
    setCtcClues([clue1, clue2, clue3, clue4, clue5]);
  }

  function setGame(gameId: string, gameName: string) {
    if (gameName === "Wordle") {
      generateWordle();
    }
    if (gameName === "Crack The Code") {
      generateCrackTheCode();
    }
    setActiveGame(gameId);
  }
  console.log(wordleWord, ctcCode);

  function handleQuit() {
    setActiveGame(false);
    setScore(0);
  }

  function handleRoundOver(status: string, text: string, point: number) {
    setGameModal([true, status, text]);
    setScore((currentScore: number) => {
      return (currentScore += point);
    });
  }

  function handleModalButton(status: string) {
    if (status === "passed") {
      // activeGame === "Wordle" ? generateWordle() : generateCrackTheCode();
      if (activeGame === "WRDLBtn") {
        setGame("WRDLBtn", "Wordle");
      } else {
        handleQuit();
      }
    } else {
      handleQuit();
    }
    // status === "passed" ? setGame(activeGame) : handleQuit();
    handleClose();
  }

  const boxScore = (
    <>
      <Box className="default-box-style box-score">
        <Typography variant="h5">score</Typography>
        <Box className="default-box-style sub-box-score">
          <Typography className="score-text">{score}</Typography>
        </Box>
      </Box>
      <Stack direction="row" useFlexGap flexWrap="wrap" spacing={1}>
        <ButtonOption
          style={{
            backgroundColor: "#768DA5",
          }}
          onClick={() => setInfoModal(true)}
          disabled={activeGame === false}
        >
          <QuestionMark sx={{ fontSize: "20px" }} />
        </ButtonOption>
        <ButtonOption
          style={{
            backgroundColor: "#AF6C6D",
          }}
          onClick={() => handleQuit()}
          disabled={activeGame === false}
        >
          <Close sx={{ fontSize: "20px" }} />
        </ButtonOption>
      </Stack>
    </>
  );

  return (
    <>
      <Grid container spacing={3} columns={16} sx={{ height: "52rem" }}>
        <Grid item xs>
          {gameButtons.map((btn) => (
            <Button
              key={btn.id}
              variant={"contained"}
              className="long-btn"
              sx={[
                {
                  backgroundColor: btn.color,
                },
                activeGame != false &&
                  activeGame === btn.id && {
                    backgroundColor: green.A400,
                  },
              ]}
              onClick={() => setGame(btn.id, btn.name)}
              disabled={activeGame != btn.id && activeGame != false && true}
            >
              {btn.name}
            </Button>
          ))}
        </Grid>
        <Grid item xs={6}>
          <Box className="default-box-style game-pane">
            {activeGame === false && (
              <Typography variant="h5">pick a game</Typography>
            )}
            {activeGame === "WRDLBtn" && (
              <Wordle
                word={wordleWord}
                wordArr={wordleArr}
                onRoundOver={handleRoundOver}
              />
            )}
            {activeGame === "CTCBtn" && (
              <CrackTheCode
                code={ctcCode}
                clues={ctcClues}
                onRoundOver={handleRoundOver}
              />
            )}
            {/* {activeGame === "CFBtn" && <ConnectFour />}
          {activeGame === "TTTBtn" && <TicTacToe />} */}
          </Box>
        </Grid>
        <Grid item>{boxScore}</Grid>
      </Grid>

      <Modal
        open={gameModal[0]}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {gameModal[2]}
          </Typography>
          <Button
            variant="contained"
            className="round-over-btn"
            sx={[
              gameModal[1] === "passed" && {
                backgroundColor: "var(--color-pistachio)",
                "&:hover": {
                  backgroundColor: "var(--color-pistachio)",
                },
              },
              gameModal[1] === "failed" && {
                backgroundColor: "var(--color-lightred)",
                "&:hover": {
                  backgroundColor: "var(--color-lightred)",
                },
              },
            ]}
            onClick={() => handleModalButton(gameModal[1])}
          >
            {gameModal[1] === "passed" && activeGame === "Wordle"
              ? "next game"
              : "quit"}
          </Button>
        </Box>
      </Modal>

      {/* <Modal
        open={infoModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className="default-box-style"
          sx={[modalStyle, { width: "50%", height: "70%" }]}
        >
          <Box sx={{ width: "50%" }}>
            <img
              src="./public/wordle-info.jpg"
              alt="Wordle Info Screenshot"
              style={{ height: "200px", width: "50%" }}
            ></img>
          </Box>
          <Box sx={{ width: "50%" }}>
            <Typography variant="body1">
              Yellow Tile - The letter is in the word but is wrongly placed
              <br />
              Green Tile - The letter is in the word and well placed
              <br />
              Gray Tile - The letter is not in the word
              <br />
              Orange Hint - Displays one correct letter
              <br />
              Green Hint - Grays letters in the keyboard tiles that are not in
              the word
            </Typography>
          </Box>
        </Box>
      </Modal> */}
    </>
  );
};

export default GamePane;
