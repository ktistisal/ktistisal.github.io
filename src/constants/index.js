export const defaultHistory = {
  type: "output",
  text: ` __      __  .__          __  .__               .__   
|  | ___/  |_|__| _______/  |_|__| ___________  |  |  
|  |/ /\\   __\\  |/  ___/\\   __\\  |/  ___/\\__  \\ |  |  
|    <  |  | |  |\\___ \\  |  | |  |\\___ \\  / __ \\|  |__
|__|_ \\ |__| |__/____  > |__| |__/____  >(____  /____/
     \\/              \\/               \\/      \\/      

  Welcome to my place on the web!
  Type 'help' for a list of available commands.

`,
};

export const helpOutput = {
  type: "output",
  text: `Builtin commands:
  help......Display information about builtin commands
  pwd.......Print the name of the working directory
  whoami....Print the current username
  clear.....Clear the terminal screen`,
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
