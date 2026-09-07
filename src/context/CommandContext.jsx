import { createContext, useContext } from "react";

const CommandContext = createContext(null);

export function useCommand() {
  return useContext(CommandContext);
}

export default CommandContext;
