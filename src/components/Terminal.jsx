import { useState, useEffect, useRef } from "react";
import CommandContext from "../context/CommandContext";
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
          handleEnter(input);
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

  const parser = (command) => command.trim().split(/\s+/)[0];

  const handleEnter = (input) => {
    const command = parser(input);
    inputRef.current.textContent = "";
    addHistory({ type: "input", text: input });

    if (command === "") {
      return;
    }

    addCommand(input);
    setBuffer("");
    setCommandsIdx(-1);
    runCommand(command);
  };

  const handleCommandClick = (command) => {
    addHistory({ type: "input", text: command });
    addCommand(command);
    runCommand(command);
    inputRef.current?.focus();
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

  const runCommand = (command) => {
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

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!commands.length) return;
    const command = commandsIdx < 0 ? buffer : commands[commandsIdx];
    inputRef.current.textContent = command;
  }, [commandsIdx]);

  return (
    <CommandContext.Provider value={handleCommandClick}>
      <div className="w-full min-w-[56ch] max-w-[80ch] min-h-full pb-[90vh] break-all zoom-70 sm:zoom-100">
        {history.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap wrap-break-word">
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
    </CommandContext.Provider>
  );
}
