import { TProfile } from "@shared/types";

export const getFullNameFromProfile = (data: TProfile | undefined) => {
    let fullName = "";
    if (!data) {
        return fullName;
    }
    const { firstName, lastName, patronymic } = data;
    if (lastName) {
        fullName = lastName;
    }
    fullName += ` ${firstName}`;
    if (patronymic) {
        fullName += ` ${patronymic}`;
    }
    return fullName;
};
