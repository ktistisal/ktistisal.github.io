import { useState, useEffect, useRef } from "react";
import {
  defaultHistory,
  helpOutput,
  pwdOutput,
  whoamiOutput,
  notFoundOutput,
  findMeOutput,
  aboutOutput,
} from "../constants";
import Prompt from "./Prompt";

export default function Terminal() {
  const [history, setHistory] = useState([defaultHistory]);
  const [commands, setCommands] = useState([]);
  const [commandsIdx, setCommandsIdx] = useState(-1);
  const [buffer, setBuffer] = useState("");

  const inputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (["Enter", "ArrowUp", "ArrowDown"].includes(e.key)) {
      e.preventDefault();
      const input = inputRef.current.textContent;
      switch (e.key) {
        case "Enter":
          handleEnter(input.trim());
          break;
        case "ArrowUp":
          if (commandsIdx === -1) setBuffer(input);
          handleArrowUp();
          break;
        case "ArrowDown":
          handleArrowDown();
          break;
        default:
          break;
      }
    }
  };

  const handleEnter = (command) => {
    inputRef.current.textContent = "";

    addHistory({ type: "input", text: command });

    if (command === "") {
      return;
    }

    addCommand(command);
    setBuffer("");
    setCommandsIdx(-1);

    switch (command) {
      case "help":
        addHistory(helpOutput);
        break;
      case "findme":
        addHistory(findMeOutput);
        break;
      case "about":
        addHistory(aboutOutput);
        break;
      case "pwd":
        addHistory(pwdOutput);
        break;
      case "whoami":
        addHistory(whoamiOutput);
        break;
      case "clear":
        setHistory([]);
        break;
      case "reset":
        handleReset();
        break;
      default:
        addHistory(notFoundOutput(command));
        break;
    }
  };

  const handleArrowUp = () => {
    setCommandsIdx((prev) => Math.min(prev + 1, commands.length - 1));
  };

  const handleArrowDown = () => {
    setCommandsIdx((prev) => Math.max(prev - 1, -1));
  };

  const handleReset = () => {
    setHistory([defaultHistory]);
    setCommands([]);
    setCommandsIdx(-1);
    setBuffer("");
  };

  const addHistory = (entry) => {
    setHistory((prev) => [...prev, entry]);
  };

  const addCommand = (command) => {
    setCommands((prev) => [command, ...prev]);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!commands.length) return;
    const command = commandsIdx < 0 ? buffer : commands[commandsIdx];
    inputRef.current.textContent = command;
  }, [commandsIdx]);

  return (
    <div className="w-full max-w-[80ch] min-h-full pb-[90vh] break-all">
      {history.map((line, index) => (
        <div key={index} className="whitespace-pre-wrap break-all">
          {line.type === "input" ? <Prompt text={line.text} /> : line.text}
        </div>
      ))}
      <Prompt />
      {"\u200B"}
      <span
        ref={inputRef}
        contentEditable
        onBlur={(e) => e.currentTarget.focus()}
        className="outline-none"
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
