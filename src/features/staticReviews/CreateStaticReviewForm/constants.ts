import { CreateAdminStaticReviewRequest } from "@entities/staticReview";

export const initialValues: CreateAdminStaticReviewRequest = {
    isActive: false,
    content: "",
    firstName: "",
    lastName: "",
    position: "",
    quote: "",
    preview: null,
    avatar: null,
    video: null,
    authorIsActive: false,
};
