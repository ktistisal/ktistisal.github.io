import { useContext, useState } from "react";
import CommandContext from "../context/CommandContext";

import { CircleUserRound, AtSign, MessageCircleMore } from "lucide-react";

export default function ContactForm() {
  const { setBlockIO } = useContext(CommandContext);
  const [messageLength, setMessageLength] = useState(0);
  const [nameLength, setNameLength] = useState(0);
  const [emailValid, setEmailValid] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [emailLength, setEmailLength] = useState(0);
  const [result, setResult] = useState("");

  const access_key = "6c2852f4-7bae-4177-835f-0b46ecf36418";

  const minName = 3;
  const maxName = 40;
  const maxEmail = 254;
  const minMsg = 30;
  const maxMsg = 3000;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!e.currentTarget.checkValidity()) {
      return;
    }

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", access_key);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setResult("success");
        setDisabled(true);
        setBlockIO(false);
      } else {
        setResult("failure");
      }
    } catch {
      setResult("failure");
    }
  };

  const handleCancel = () => {
    setResult("canceled");
    setDisabled(true);
    setBlockIO(false);
  };

  return (
    <div className="w-[50ch]">
      <br />
      <div className="font-bold">{" Send me a message!"}</div>
      <br />
      <form
        onSubmit={handleSubmit}
        onInvalid={(e) => e.preventDefault()}
        className="pl-[1.5em]"
      >
        <fieldset disabled={disabled}>
          <div className="flex items-start gap-2 mb-6">
            <CircleUserRound
              className="text-foreground mt-1.5 shrink-0"
              size="1.5em"
            />
            <div className="w-full">
              <input
                name="name"
                type="text"
                minLength={minName}
                maxLength={maxName}
                placeholder="Enter your name"
                required
                autoComplete="off"
                onChange={(e) => setNameLength(e.target.value.length)}
                className="outline-none border-b p-1 w-full border-primary"
              />
              <div className="flex justify-between text-[0.7em]">
                <div className="text-secondary">
                  {nameLength > 0 &&
                    nameLength < minName &&
                    `Name must be at least ${minName} characters`}
                </div>

                <div
                  className={
                    nameLength < minName ? "text-secondary" : "text-highlight"
                  }
                >
                  {nameLength}/{maxName}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2 mb-6">
            <AtSign className="text-foreground mt-1.5 shrink-0" size="1.5em" />
            <div className="w-full">
              <input
                name="email"
                type="text"
                maxLength={maxEmail}
                pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                placeholder="Enter your email"
                required
                autoComplete="off"
                onChange={(e) => {
                  setEmailLength(e.target.value.length);
                  setEmailValid(e.currentTarget.checkValidity());
                }}
                className="outline-none border-b p-1 w-full border-primary"
              />
              <div className="flex justify-between text-[0.7em]">
                <div className="text-secondary">
                  {emailLength > 0 &&
                    !emailValid &&
                    "Please enter a valid email"}
                </div>

                <div
                  className={!emailValid ? "text-secondary" : "text-highlight"}
                >
                  ●
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2 mb-6">
            <MessageCircleMore
              className="text-foreground mt-1.5 shrink-0"
              size="1.5em"
            />
            <div className="w-full">
              <textarea
                name="message"
                placeholder="Write your message"
                required
                minLength={minMsg}
                maxLength={maxMsg}
                autoComplete="off"
                onChange={(e) => setMessageLength(e.target.value.length)}
                className="outline-none border-r border-b p-1 w-full border-primary field-sizing-content resize-none"
              />
              <div className="flex justify-between text-[0.7em]">
                <div className="text-secondary">
                  {messageLength > 0 &&
                    messageLength < minMsg &&
                    `Message must be at least ${minMsg} characters`}
                </div>

                <div
                  className={
                    messageLength < minMsg ? "text-secondary" : "text-highlight"
                  }
                >
                  {messageLength}/{maxMsg}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            {result === "failure" && (
              <div className="font-bold text-secondary">
                Failed to send message. Please try again
              </div>
            )}

            {result === "canceled" && (
              <div className="font-bold text-secondary">Canceled</div>
            )}

            {result === "success" ? (
              <div className="font-bold text-highlight">
                Message successfully sent!
              </div>
            ) : result === "canceled" ? null : (
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  disabled={disabled}
                  onClick={handleCancel}
                  className="hover:font-bold hover:scale-102 hover:cursor-pointer text-secondary disabled:hover:scale-0"
                >
                  [ Cancel ]
                </button>

                <button
                  type="submit"
                  disabled={disabled}
                  className="hover:font-bold hover:scale-102 hover:cursor-pointer text-highlight disabled:hover:scale-0"
                >
                  [ Send ]
                </button>
              </div>
            )}
          </div>
        </fieldset>
      </form>
      <br />
    </div>
  );
}
