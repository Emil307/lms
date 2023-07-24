export const isMenuItemDenied = (accessRoles: number[], userRole?: number) => {
    if (!userRole) {
        return true;
    }

    if (accessRoles.length && !accessRoles.includes(userRole)) {
        return true;
    }

    return false;
};
