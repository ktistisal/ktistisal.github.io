import MyLink from "../components/MyLink";
import Command from "../components/Command";

export const version = "v0.3.0";

export const asciiArt = ` __      __  .__          __  .__               .__   
|  | ___/  |_|__| _______/  |_|__| ___________  |  |  
|  |/ /\\   __\\  |/  ___/\\   __\\  |/  ___/\\__  \\ |  |  
|    <  |  | |  |\\___ \\  |  | |  |\\___ \\  / __ \\|  |__
|__|_ \\ |__| |__/____  > |__| |__/____  >(____  /____/
     \\/              \\/               \\/      \\/ ${version}`;

export const defaultHistory = {
  type: "output",
  text: (
    <>
      <div>{asciiArt}</div>
      <br />
      <div>{"  Welcome to my place on the web!"}</div>
      <div>
        {"  Enter "}
        <Command name="help" />
        {" for a list of available commands."}
      </div>
      <br />
    </>
  ),
};

export const helpOutput = {
  type: "output",
  text: (
    <>
      <br />
      <div className="font-bold">{"Built-in commands:"}</div>
      <div>
        {"  "}
        <Command name="about" />
        {"... Learn more about me and this site"}
      </div>
      <div>
        {"  "}
        <Command name="findme" />
        {".. Find me online"}
      </div>
      <div>
        {"  "}
        <Command name="clear" />
        {"... Clear the terminal screen"}
      </div>
      <div>
        {"  "}
        <Command name="reset" />
        {"... Reset the terminal"}
      </div>
      <div>
        {"  "}
        <Command name="help" />
        {".... Display info about built-in commands"}
      </div>
      <br />
    </>
  ),
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
      <br />
      <div className="font-bold">Find me online:</div>
      <MyLink name="linkedin" />
      <MyLink name="github" />
      <MyLink name="leetcode" />
      <br />
    </>
  ),
};

export const aboutOutput = {
  type: "output",
  text: (
    <>
      <div className="font-bold">{"\n  Hey, I'm Alex! 👋\n\n"}</div>
      {"  I'm a developer from Greece 🇬🇷 who enjoys building\n"}
      {"  things, solving problems and learning along the way.\n\n"}
      {"  I made this site as a small interactive personal\n"}
      {"  website, inspired by the simplicity and feel of an \n"}
      {"  actual terminal.\n\n"}
      {"  Explore around, or try "}
      <Command name="help" />
      {" to see what you can do.\n\n"}
    </>
  ),
};
