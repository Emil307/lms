type TProps = {
    firstName?: string;
    lastName?: string | null;
    patronymic?: string | null;
};

export const getSurnameWithInitials = (data: TProps | undefined) => {
    let fullName = "";
    if (!data) {
        return fullName;
    }
    const { firstName, lastName, patronymic } = data;
    if (lastName) {
        fullName = lastName;
    }
    if (firstName) {
        fullName += ` ${firstName[0].toUpperCase()}.`;
    }
    if (patronymic) {
        fullName += ` ${patronymic[0].toUpperCase()}.`;
    }
    return fullName;
};
