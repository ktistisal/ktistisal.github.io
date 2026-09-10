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
  availableCommands,
  notFoundArg,
} from "../constants";
import Prompt from "./Prompt";
import ContactForm from "./ContactForm";

export default function Terminal() {
  const [history, setHistory] = useState([defaultHistory]);
  const [commands, setCommands] = useState([]);
  const [commandsIdx, setCommandsIdx] = useState(-1);
  const [buffer, setBuffer] = useState("");
  const [blockIO, setBlockIO] = useState(false);

  const inputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (["Enter", "ArrowUp", "ArrowDown"].includes(e.key)) {
      e.preventDefault();
      const input = inputRef.current?.textContent ?? "";
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

  const parser = (command) => {
    const parts = command.trim().split(/\s+/);
    return {
      command: parts[0] ?? "",
      args: parts.slice(1),
    };
  };

  const handleEnter = (input) => {
    const { command, args } = parser(input);
    if (inputRef.current) {
      inputRef.current.textContent = "";
    }
    addHistory({ type: "input", text: input });

    if (command === "") {
      return;
    }

    addCommand(input);
    setBuffer("");
    setCommandsIdx(-1);
    runCommand(command, args);
  };

  const handleCommandClick = (command) => {
    if (blockIO) return;
    addHistory({ type: "input", text: command });
    addCommand(command);
    runCommand(command, []);
    inputRef.current?.focus({ preventScroll: true });
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
    setBlockIO(false);
    scrollToTop();
  };

  const addHistory = (entry) => {
    setHistory((prev) => [...prev, entry]);
  };

  const addCommand = (command) => {
    setCommands((prev) => [command, ...prev]);
  };

  const runCommand = (command, args) => {
    if (!availableCommands[command]) {
      addHistory(notFoundOutput(command));
      return;
    }
    if (!availableCommands[command].args.length && args.length) {
      addHistory(notFoundArg(command, args[0]));
      return;
    }
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
        scrollToTop();
        break;
      case "reset":
        handleReset();
        break;
      case "contact":
        setBlockIO(true);
        addHistory({
          type: "output",
          text: <ContactForm />,
        });
        break;
      default:
        addHistory(notFoundOutput(command));
        break;
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (!blockIO) {
      inputRef.current?.focus({ preventScroll: true });
    }
  }, [blockIO]);

  useEffect(() => {
    if (!commands.length || !inputRef.current) return;
    const command = commandsIdx < 0 ? buffer : commands[commandsIdx];
    inputRef.current.textContent = command;
  }, [commandsIdx]);

  return (
    <CommandContext.Provider value={{ handleCommandClick, setBlockIO }}>
      <div className="w-full min-w-[56ch] max-w-[80ch] min-h-full pb-[90vh] break-all zoom-70 sm:zoom-100">
        {history.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap wrap-break-word">
            {line.type === "input" ? <Prompt text={line.text} /> : line.text}
          </div>
        ))}
        {!blockIO && (
          <>
            <Prompt />
            {"\u200B"}
            <span
              ref={inputRef}
              contentEditable={!blockIO}
              onBlur={(e) => e.currentTarget.focus({ preventScroll: true })}
              className="outline-none"
              onKeyDown={handleKeyDown}
            />
          </>
        )}
      </div>
    </CommandContext.Provider>
  );
}
