import { GetAdminSubCategoriesRequest } from "@entities/category";
import { CreateCourseFormValues } from "@entities/course";
import { EntityNames, FilterTypes, QueryKeys } from "@shared/constant";
import { InvalidateQueriesKey } from "@shared/types";

export const initialParams: Omit<GetAdminSubCategoriesRequest, "filter"> = {
    page: 1,
    perPage: 10,
    paginate: false,
};

export const radioGroupValues = [
    { id: "1", label: "Тип скидки – “%”", value: "percentage" },
    { id: "2", label: "Тип скидки – “₽”", value: "currency" },
];

export const initialValues: CreateCourseFormValues = {
    cover: null,
    name: "",
    category: "",
    subCategory: "",
    shortDescription: "",
    description: "",
    duration: "",
    price: "0",
    isInteractive: false,
    isActive: true,
    isPopular: false,
    hasAuthors: false,
    authorIds: [],
    hasTeachers: false,
    teacherIds: [],
    tagIds: [],
    hasDiscount: false,
    discount: {
        type: "percentage",
        amount: "",
        startingDate: null,
        finishingDate: null,
    },
};

export const keysInvalidateQueries: InvalidateQueriesKey[] = [
    { queryKey: [QueryKeys.GET_ADMIN_COURSES] },
    { queryKey: [QueryKeys.GET_COURSES] },
    { queryKey: [QueryKeys.GET_COURSES_INFINITE] },
    //ресурсы/фильтра
    { queryKey: [QueryKeys.GET_ADMIN_COURSE_RESOURCES] },
    { queryKey: [QueryKeys.GET_COURSE_RESOURCES] },
    { queryKey: [QueryKeys.GET_ADMIN_ARTICLE_RESOURCES_CREATE] },
    {
        queryKey: [
            QueryKeys.GET_ADMIN_COURSE_COLLECTION_RESOURCES,
            [EntityNames.COURSE_COLLECTION, EntityNames.COURSE],
            { type: FilterTypes.MANIPULATION },
        ],
    },
    {
        queryKey: [
            QueryKeys.GET_ADMIN_COURSE_REVIEW_RESOURCES,
            [EntityNames.COURSE_REVIEW, EntityNames.COURSE],
            { type: FilterTypes.MANIPULATION },
        ],
    },
    {
        queryKey: [
            QueryKeys.GET_ADMIN_GROUP_FILTERS,
            [EntityNames.GROUP, EntityNames.COURSE, EntityNames.USER],
            { type: FilterTypes.MANIPULATION },
        ],
    },
    {
        queryKey: [
            QueryKeys.GET_ADMIN_LESSON_HOMEWORK_ANSWERS_RESOURCES,
            [EntityNames.LESSON_HOMEWORK, EntityNames.COURSE, EntityNames.STUDENT],
            { type: FilterTypes.MANIPULATION },
        ],
    },
    { queryKey: [QueryKeys.GET_ADMIN_TRANSACTION_CREATE_RESOURCES] },
    { queryKey: [QueryKeys.GET_ADMIN_TRANSACTION_CREATE_ENTITIES] },
    { queryKey: [QueryKeys.GET_TRANSACTIONS_FILTERS] },
    { queryKey: [QueryKeys.GET_ADMIN_STUDENT_REPORT_FILTERS] },
    { queryKey: [QueryKeys.GET_ADMIN_STUDENT_REPORT_ENTITIES] },
    { queryKey: [QueryKeys.GET_ADMIN_TRANSACTION_REPORT_FILTERS] },
    { queryKey: [QueryKeys.GET_ADMIN_TRANSACTION_REPORT_ENTITIES] },
];
