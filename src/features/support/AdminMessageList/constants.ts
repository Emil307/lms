import { TDefaultRequestParams } from "@shared/types";

export const initialParams: TDefaultRequestParams = {
    page: 1,
    perPage: 10,
    sort: {
        id: "desc",
    },
};
