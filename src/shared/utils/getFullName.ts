type TData = {
    firstName?: string;
    lastName?: string | null;
    patronymic?: string | null;
};

type TParams = {
    data?: TData;
    startWithLastName?: boolean;
    hidePatronymic?: boolean;
};

export const getFullName = ({ data, startWithLastName, hidePatronymic }: TParams) => {
    const fullName = [];
    if (!data) {
        return "";
    }
    const { firstName, lastName, patronymic} = data;
    if (startWithLastName) {
        fullName.push(lastName);
        fullName.push(firstName);
    } else {
        fullName.push(firstName);
        fullName.push(lastName);
    }
    if (!hidePatronymic && patronymic) {
        fullName.push(patronymic);
    }
    return fullName.filter((part) => !!part).join(" ");
};
