import { createContext } from "react";

interface UserDetail {
  id:string;
  name: string;
  email?: string;
  picture?: string;
  uid?: string;
}

interface UserInfoContextType {
  userDetail: UserDetail | undefined;
  setUserDetail: (userDetail: UserDetail | undefined) => void;
}

export const UserInfoContext = createContext<UserInfoContextType>({
  userDetail: undefined,
  setUserDetail: () => {},
});