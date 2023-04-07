import React, { createContext, ReactNode } from "react";
import { useMe, User } from "@entities/auth";

export type SessionContextType = {
    user?: User;
};

export const SessionContext = createContext<SessionContextType>({ user: undefined });

export interface SessionProviderProps {
    children: ReactNode;
}

const SessionProvider = ({ children }: SessionProviderProps) => {
    const { data } = useMe();

    return <SessionContext.Provider value={{ user: data }}>{children}</SessionContext.Provider>;
};

export default SessionProvider;
