import React, { createContext, ReactNode, useMemo } from "react";
import { useMe, User } from "@entities/auth";

export type SessionContextType = {
    user?: User;
    isFetchingUser: boolean;
};

export const SessionContext = createContext<SessionContextType>({
    user: undefined,
    isFetchingUser: false,
});

export interface SessionProviderProps {
    children: ReactNode;
}

const SessionProvider = ({ children }: SessionProviderProps) => {
    const { data: user, isFetching: isFetchingUser } = useMe();

    const contextValue = useMemo(() => ({ user, isFetchingUser }), [user, isFetchingUser]);

    return <SessionContext.Provider value={contextValue}>{children}</SessionContext.Provider>;
};

export default SessionProvider;
