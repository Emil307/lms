import { AdminAuthor } from "@entities/author";
import { AuthorInfoCardFields } from "./types";

export const getAuthorInfoCardFields = (data?: AdminAuthor): AuthorInfoCardFields => ({
    fio: [data?.lastName, data?.firstName, data?.patronymic].join(" "),
});
