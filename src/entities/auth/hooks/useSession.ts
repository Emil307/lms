import { useContext } from "react";
import { SessionContext } from "@app/providers/SessionProvider";

export const useSession = () => {
    const { user, isFetchingUser } = useContext(SessionContext);
    return { user, isFetchingUser };
};
