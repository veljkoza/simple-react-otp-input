import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import "./styles.scss";

interface IOtpInputProps {
  noOfInputs: number;
  numbersOnly?: boolean;
  hiddenInput?: boolean;
  value: string;
  customInputClass?: string;
  customContainerClass?: string;
  onChange: (newCode: string) => void;
}

function OtpInput({
  noOfInputs,
  numbersOnly,
  hiddenInput,
  value,
  onChange,
  customInputClass,
  customContainerClass,
}: IOtpInputProps) {
  const codeContainer = useRef<any>();
  const pressedKey = useRef<string>();
  const [code, setCode] = useState("    ");
  useEffect(() => {
    if (!value) {
      const emptyCode = " ".repeat(noOfInputs);
      setCode(emptyCode);
    }
  }, [noOfInputs, value]);

  const updateCode = (newCode: string) => {
    onChange(newCode);
    setCode(newCode);
  };

  const rulesPassed = useCallback(
    (codeChar: string) => {
      const isNumber = /^[0-9]+$/i.test(codeChar);
      if (numbersOnly && !isNumber) {
        return false;
      }

      return true;
    },
    [numbersOnly]
  );

  const replaceOneChar = (char: number | string, index: number) => {
    const newCode =
      code.substring(0, index) + char + code.substring(index + 1, code.length);
    return newCode;
  };

  const focusInputFieldAt = (index: number) => {
    const { current } = codeContainer;
    current.children[index].focus();
  };

  const handleKeyDown = (e: any) => {
    pressedKey.current = e.nativeEvent.inputType;
  };

  const handleChange = (id: number, e: any) => {
    if (
      e.nativeEvent.data === " " ||
      (!rulesPassed(e.nativeEvent.data) &&
        pressedKey.current !== "deleteContentBackward")
    ) {
      e.preventDefault();
      return;
    }

    let newChar;
    if (pressedKey.current === "deleteContentBackward") {
      newChar = " ";
      if (code.charAt(id - 1)) {
        // console.log(codeContainer.current, 'before')
        focusInputFieldAt(id - 1);
      }
    } else {
      newChar = e.nativeEvent.data;
      if (code.charAt(id + 1)) {
        focusInputFieldAt(id + 1);
      }
    }
    const newCode = replaceOneChar(newChar, id);

    if (newCode.includes("null")) return;
    updateCode(newCode);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    if (!rulesPassed(e.clipboardData.getData("Text"))) {
      e.preventDefault();
      return;
    }
    updateCode(e.clipboardData.getData("Text").substring(0, noOfInputs));
  };

  const getInputType = useCallback(
    (i: number) => {
      if (hiddenInput && code.charAt(i) !== " ") return "password";
      if (numbersOnly) return "tel";
      return "text";
    },
    [numbersOnly, hiddenInput, code]
  );

  const getInputFieldConfig = useCallback(
    (i: number) => {
      return {
        key: i,
        type: getInputType(i),
        value: code.charAt(i),
        onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => {
          handlePaste(e);
        },
        onInput: (e: React.FormEvent<HTMLInputElement>) => {
          handleKeyDown(e);
        },
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          handleChange(i, e);
        },
        onFocus: (e: React.ChangeEvent<HTMLInputElement>) => {
          e.target.select();
        },
      };
    },
    [customInputClass, code, hiddenInput, numbersOnly]
  );
  const renderDefaultInput = (i: number) => {
    return (
      <input
        className={customInputClass || "default-input-style"}
        {...getInputFieldConfig(i)}
      />
    );
  };

  const renderInput = (i: number) => {
    return renderDefaultInput(i);
  };

  return (
    <>
      <div
        className={customContainerClass || "code-container"}
        ref={codeContainer}
        id="code-container"
      >
        {[...Array(noOfInputs)].map((_temp, i) => renderInput(i))}
      </div>
    </>
  );
}

export default OtpInput;
