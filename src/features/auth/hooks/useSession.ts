import { useContext } from "react";
import { SessionContext } from "@app/providers/SessionProvider";

export const useSession = () => {
    const { user } = useContext(SessionContext);
    return { user };
};
