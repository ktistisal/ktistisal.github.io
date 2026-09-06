import MyLink from "../components/MyLink";

export const version = "v0.2";

export const defaultHistory = {
  type: "output",
  text: ` __      __  .__          __  .__               .__   
|  | ___/  |_|__| _______/  |_|__| ___________  |  |  
|  |/ /\\   __\\  |/  ___/\\   __\\  |/  ___/\\__  \\ |  |  
|    <  |  | |  |\\___ \\  |  | |  |\\___ \\  / __ \\|  |__
|__|_ \\ |__| |__/____  > |__| |__/____  >(____  /____/
     \\/              \\/               \\/      \\/ ${version}      

  Welcome to my place on the web!
  Type 'help' for a list of available commands.

`,
};

export const helpOutput = {
  type: "output",
  text: `Builtin commands:
  about   → Learn more about me and this site
  findme  → Find me online
  clear   → Clear the terminal screen
  reset   → Reset the terminal
  help    → Display information about builtin commands`,
};

export const pwdOutput = {
  type: "output",
  text: `/home/guest`,
};

export const whoamiOutput = {
  type: "output",
  text: `guest`,
};

export const notFoundOutput = (command) => ({
  type: "output",
  text: `Command '${command}' not found`,
});

export const findMeOutput = {
  type: "output",
  text: (
    <>
      <div>Find me online:</div>
      <MyLink name="linkedin" />
      <MyLink name="github" />
      <MyLink name="leetcode" />
    </>
  ),
};

export const aboutOutput = {
  type: "output",
  text: `
  Hey, I'm Alex! 👋

  I'm a developer who enjoys building things, solving problems, and learning 
  along the way.

  I made this site as a small interactive portfolio, inspired by the simplicity 
  and feel of an actual terminal.
  
  Explore around, or try 'help' to see what you can do.

`,
};
