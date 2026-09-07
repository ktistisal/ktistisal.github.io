import { SquareArrowOutUpRight } from "lucide-react";

const links = {
  linkedin: {
    text: "  LinkedIn.. ",
    url: "https://www.linkedin.com/in/ktistisal/",
    url2: "linkedin.com/in/ktistisal",
  },
  github: {
    text: "  GitHub.... ",
    url: "https://github.com/ktistisal/",
    url2: "github.com/ktistisal",
  },
  leetcode: {
    text: "  LeetCode.. ",
    url: "https://leetcode.com/u/ktistisal/",
    url2: "leetcode.com/u/ktistisal",
  },
};

export default function MyLink({ name }) {
  return (
    <div>
      {links[name].text}
      <a
        href={links[name].url}
        target="_blank"
        rel="noopener noreferrer"
        referrerPolicy="no-referrer"
        className="underline inline-flex items-center gap-1 hover:scale-102"
      >
        {links[name].url2}
        <SquareArrowOutUpRight size="1em" className="text-highlight" />
      </a>
    </div>
  );
}
