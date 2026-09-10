import { SquareTerminal } from "lucide-react";
import { useCommand } from "../context/CommandContext";

export default function Command({ name }) {
  const { handleCommandClick } = useCommand();
  return (
    <span
      onClick={() => handleCommandClick(name)}
      className=" hover:cursor-pointer underline inline-flex gap-1 items-center hover:scale-102"
    >
      {name}
      <SquareTerminal size="1em" className="text-highlight" />
    </span>
  );
}
