import React, { createContext, ReactNode } from "react";
import { useMe, User } from "@entities/auth";

export type SessionContextType = {
    user?: User;
    isFetchingUser: boolean;
};

export const SessionContext = createContext<SessionContextType>({ user: undefined, isFetchingUser: false });

export interface SessionProviderProps {
    children: ReactNode;
}

const SessionProvider = ({ children }: SessionProviderProps) => {
    const { data, isFetching: isFetchingUser } = useMe();

    return <SessionContext.Provider value={{ user: data, isFetchingUser }}>{children}</SessionContext.Provider>;
};

export default SessionProvider;
