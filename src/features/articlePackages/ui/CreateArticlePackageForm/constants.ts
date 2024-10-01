import { InvalidateQueriesKey } from "@shared/types";
import { QueryKeys } from "@shared/constant";
import { CreateArticlePackageFormValidation } from "./types";

export const initialValues: CreateArticlePackageFormValidation = {
    isActive: true,
    name: "",
    description: "",
    price: "",
    categories: [],
    tags: [],
    hasDiscount: false,
    discount: {
        type: "percentage",
        amount: "",
        startingDate: null,
        finishingDate: null,
    },
};

export const radioGroupValues = [
    { id: "1", label: "Тип скидки – “%”", value: "percentage" },
    { id: "2", label: "Тип скидки – “₽”", value: "currency" },
];

export const keysInvalidateQueries: InvalidateQueriesKey[] = [
    { queryKey: [QueryKeys.GET_ADMIN_ARTICLE_PACKAGES] },
    //ресурсы/фильтра
    { queryKey: [QueryKeys.GET_ADMIN_ARTICLE_PACKAGE_FILTERS] },
    { queryKey: [QueryKeys.GET_ADMIN_TRANSACTION_CREATE_RESOURCES] },
    { queryKey: [QueryKeys.GET_ADMIN_TRANSACTION_CREATE_ENTITIES] },
    { queryKey: [QueryKeys.GET_TRANSACTIONS_FILTERS] },
    { queryKey: [QueryKeys.GET_ADMIN_STUDENT_REPORT_FILTERS] },
    { queryKey: [QueryKeys.GET_ADMIN_STUDENT_REPORT_ENTITIES] },
    { queryKey: [QueryKeys.GET_ADMIN_TRANSACTION_REPORT_FILTERS] },
    { queryKey: [QueryKeys.GET_ADMIN_TRANSACTION_REPORT_ENTITIES] },
];
