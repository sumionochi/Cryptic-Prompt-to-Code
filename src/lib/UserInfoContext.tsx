import { createContext } from "react";

interface UserDetail {
  name: string;
  email?: string;
}

interface UserInfoContextType {
  userDetail: UserDetail | undefined;
  setUserDetail: (userDetail: UserDetail) => void;
}

export const UserInfoContext = createContext<UserInfoContextType>({
  userDetail: undefined,
  setUserDetail: () => {},
});