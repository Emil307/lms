import { UpdateFaqRequest } from "@entities/staticPage";

export const initialValues: UpdateFaqRequest = {
    question: "",
    answer: "",
    isActive: false,
    isStatic: false,
};