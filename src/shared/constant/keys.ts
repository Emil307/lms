export enum QueryKeys {
    //AUTH
    GET_ME = "GET_ME",

    //ROLE
    GET_ROLES = "GET_ROLES",

    //USER
    GET_USERS = "GET_USERS",
    GET_STUDENTS = "GET_STUDENTS",
    GET_USER = "GET_USER",
    GET_ADMIN_USERS_FILTERS = "GET_ADMIN_USERS_FILTERS",
    GET_ADMIN_USERS_CREATE_OPTIONS = "GET_ADMIN_USERS_CREATE_OPTIONS",

    //STATIC_PAGE
    GET_PUBLIC_OFFER = "GET_PUBLIC_OFFER",
    GET_CONTACTS = "GET_CONTACTS",
    GET_ABOUT = "GET_ABOUT",
    GET_FAQ = "GET_FAQ",

    //COURSE
    GET_MY_COURSES = "GET_MY_COURSES",
    GET_TEACHERS = "GET_TEACHERS",
    GET_COURSE_PROGRAM = "GET_COURSE_PROGRAM",
    GET_COURSE_PROGRAM_LESSONS = "GET_COURSE_PROGRAM_LESSONS",
    GET_COURSE_REVIEWS = "GET_COURSE_REVIEWS",
    GET_COURSE_SETS = "GET_COURSE_SETS",
    GET_COURSE_SET = "GET_COURSE_SET",

    //GROUP
    GET_ADMIN_GROUPS = "GET_ADMIN_GROUPS",
    GET_ADMIN_GROUP = "GET_ADMIN_GROUP",
    GET_GROUP_SCHEDULES = "GET_GROUP_SCHEDULES",

    //STUDENT
    GET_ADMIN_STUDENTS_FILTERS = "GET_ADMIN_STUDENTS_FILTERS",

    //TAG
    GET_ADMIN_TAGS = "GET_ADMIN_TAGS",
    GET_ADMIN_TAG = "GET_ADMIN_TAG",

    //ARTICLE
    GET_ARTICLES = "GET_ARTICLES",
    GET_ARTICLE_PACKAGES = "GET_ARTICLE_PACKAGES",
    GET_ARTICLE_CATEGORIES = "GET_ARTICLE_CATEGORIES",
    GET_ARTICLE_FILTERS = "GET_ARTICLE_FILTERS",
    GET_ARTICLE_COURSES = "GET_ARTICLE_COURSES",

    //CATEGORY
    GET_ADMIN_CATEGORIES = "GET_ADMIN_CATEGORIES",
    GET_ADMIN_SUBCATEGORIES = "GET_ADMIN_SUBCATEGORIES",
    GET_ADMIN_CATEGORY = "GET_ADMIN_CATEGORY",
}

export enum MutationKeys {
    //AUTH
    AUTHENTICATE_ME = "AUTHENTICATE_ME",
    SIGN_UP = "SIGN_UP",
    UPDATE_ME = "UPDATE_ME",
    CHANGE_PASSWORD = "CHANGE_PASSWORD",

    //USER
    UPDATE_USER = "UPDATE_USER",
    DELETE_USER = "DELETE_USER",
    CREATE_USER = "CREATE_USER",
    ACTIVATE_USER = "ACTIVATE_USER",
    DEACTIVATE_USER = "DEACTIVATE_USER",

    //GROUP
    CREATE_GROUP = "CREATE_GROUP",
    UPDATE_GROUP = "UPDATE_GROUP",
    DELETE_GROUP = "DELETE_GROUP",
    ACTIVATE_GROUP = "ACTIVATE_GROUP",
    DEACTIVATE_GROUP = "DEACTIVATE_GROUP",
    ADD_SCHEDULE_TO_GROUP = "ADD_SCHEDULE_TO_GROUP",
    DELETE_SCHEDULE_FROM_GROUP = "DELETE_SCHEDULE_FROM_GROUP",

    //TAG
    DELETE_TAG = "DELETE_TAG",
    UPDATE_TAG = "UPDATE_TAG",
    CREATE_TAG = "CREATE_TAG",

    //STORAGE
    UPLOAD_FILE = "UPLOAD_FILE",

    //CATEGORY
    DELETE_CATEGORY = "DELETE_CATEGORY",
    UPDATE_CATEGORY = "UPDATE_CATEGORY",
    CREATE_CATEGORY = "CREATE_CATEGORY",
    ACTIVATE_CATEGORY = "ACTIVATE_CATEGORY",
    DEACTIVATE_CATEGORY = "DEACTIVATE_CATEGORY",
}
