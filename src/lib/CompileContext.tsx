import { createContext } from "react";

interface CompileState {
    type: string;
    timeStamp: number;
  }

interface CompileContextType {
    compile: CompileState | null;
    setCompile: (value: CompileState) => void;
}

export const CompileContext = createContext<CompileContextType>({
    compile: null,
    setCompile: () => {},
  });