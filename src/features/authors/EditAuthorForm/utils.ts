import { Author, UpdateAuthorRequest } from "@entities/author";

export const adaptDataForEditAuthorForm = (author?: Author): Partial<UpdateAuthorRequest> => {
    return {
        firstName: author?.firstName,
        lastName: author?.lastName,
        patronymic: author?.patronymic,
        about: author?.about,
    };
};
