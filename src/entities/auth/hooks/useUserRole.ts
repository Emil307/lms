import { useSession } from "./useSession";

export const useUserRole = () => {
    const { user } = useSession();

    return user?.roles[0];
};
