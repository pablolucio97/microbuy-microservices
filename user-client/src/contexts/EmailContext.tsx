"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface IEmailContext {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
}

interface IEmailContextProvider {
  children: ReactNode;
}

const EmailContext = createContext({} as IEmailContext);

export function EmailContextProvider({ children }: IEmailContextProvider) {
  const [email, setEmail] = useState("");

  return <EmailContext value={{ email, setEmail }}>{children}</EmailContext>;
}

export const useEmail = () => {
  return useContext(EmailContext);
};
