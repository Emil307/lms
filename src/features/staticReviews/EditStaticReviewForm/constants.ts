import { UpdateAdminStaticReviewRequest } from "@entities/staticReview";

export const initialValues: UpdateAdminStaticReviewRequest = {
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
