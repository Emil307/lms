import { useEffect, useState } from "react";
import { useSession } from "@entities/auth/hooks";
import { useMedia } from "@shared/utils";
import { HeaderPublicUser, HeaderSkeleton, HeaderUser } from "./components";

const HeaderUserWrapper = () => {
    const [firstRender, setFirstRender] = useState(false);
    const { user, isFetchingUser } = useSession();

    const isTablet = useMedia("md");

    useEffect(() => {
        setFirstRender(true);
    }, []);

    if (!firstRender || isFetchingUser) {
        return <HeaderSkeleton />;
    }

    const isAuthorized = !!user?.id;

    if (isAuthorized) {
        return <HeaderUser isTablet={isTablet} />;
    }

    return <HeaderPublicUser isTablet={isTablet} />;
};

export default HeaderUserWrapper;
