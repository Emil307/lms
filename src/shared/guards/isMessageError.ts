import { AxiosError } from "axios";
import { FormErrorResponse } from "@shared/types";

export const isMessageError = (error: AxiosError | unknown): error is AxiosError<FormErrorResponse> => {
    return (error as AxiosError<FormErrorResponse>).response?.data.message !== undefined;
};
