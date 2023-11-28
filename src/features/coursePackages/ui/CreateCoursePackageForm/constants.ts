import { InvalidateQueriesKey } from "@shared/types";
import { QueryKeys } from "@shared/constant";
import { CreateCoursePackageFormValidation } from "./types";

export const initialValues: CreateCoursePackageFormValidation = {
    isActive: false,
    name: "",
    price: "",
    description: "",
    hasDiscount: false,
    cover: null,
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
    { queryKey: [QueryKeys.GET_ADMIN_COURSE_PACKAGES] },
    //ресурсы/фильтра
    { queryKey: [QueryKeys.GET_ADMIN_TRANSACTIONS_FILTERS] },
    { queryKey: [QueryKeys.GET_ADMIN_TRANSACTION_CREATE_RESOURCES] },
    { queryKey: [QueryKeys.GET_ADMIN_TRANSACTION_CREATE_ENTITIES] },
    { queryKey: [QueryKeys.GET_TRANSACTIONS_FILTERS] },
    { queryKey: [QueryKeys.GET_ADMIN_STUDENT_REPORT_FILTERS] },
    { queryKey: [QueryKeys.GET_ADMIN_STUDENT_REPORT_ENTITIES] },
    { queryKey: [QueryKeys.GET_ADMIN_TRANSACTION_REPORT_FILTERS] },
    { queryKey: [QueryKeys.GET_ADMIN_TRANSACTION_REPORT_ENTITIES] },
];
