import { CreateStudentValidationFormRequest } from "./types";

export const notificationLabels = {
    newHomework: "Уведомлять о домашних заданиях требующих проверки",
    supportMessage: "Уведомлять о новых сообщениях в чате поддержки",
    invoiceForPayment: "Уведомлять о новых сформированных счетах на оплату",
    homeworkChecked: "Уведомлять о проверенных домашних заданиях",
    groupAdded: "Уведомлять о получении доступа к курсу",
};

export const notifications = ["homeworkChecked", "groupAdded", "supportMessage"];

export const initialValues: CreateStudentValidationFormRequest = {
    email: "",
    phone: "",
    password: "",
    passwordConfirmation: "",
    firstName: "",
    lastName: "",
    patronymic: "",
    description: "",
    isActive: false,
    avatar: null,
    additionalImage: null,
    notifications: {
        homeworkChecked: false,
        groupAdded: false,
        supportMessage: false,
    },
};
