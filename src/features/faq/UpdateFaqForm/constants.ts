import { UpdateFaqRequest } from "@entities/staticPage";

export const initialValues: UpdateFaqRequest = {
    question: "",
    answer: "",
    isActive: true,
    isStatic: false,
};
