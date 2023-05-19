import { CreateFaqRequest } from "@entities/staticPage";

export const initialValues: CreateFaqRequest = {
    question: "",
    answer: "",
    isActive: false,
    isStatic: false,
};
