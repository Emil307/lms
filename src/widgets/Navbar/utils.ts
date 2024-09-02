import { RoleName } from "@shared/types";

export const isMenuItemDenied = (accessRoles: RoleName[], userRole?: RoleName) => {
    if (!userRole) {
        return true;
    }

    if (accessRoles.length && !accessRoles.includes(userRole)) {
        return true;
    }

    return false;
};
