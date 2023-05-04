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

    //STATIC_PAGE
    GET_PUBLIC_OFFER = "GET_PUBLIC_OFFER",
    GET_CONTACTS = "GET_CONTACTS",
    GET_ABOUT = "GET_ABOUT",
    GET_FAQ = "GET_FAQ",
    GET_MAIN_BANNER = "GET_MAIN_BANNER",

    //STORAGE
    GET_UPLOADED_FILE = "GET_UPLOADED_FILE",
    GET_UPLOADED_FILES = "GET_UPLOADED_FILES",
    GET_UPLOADED_FILE_RESOURCE = "GET_UPLOADED_FILE_RESOURCE",

    //COURSE
    GET_MY_COURSES = "GET_MY_COURSES",
    GET_TEACHERS = "GET_TEACHERS",
    GET_COURSE_PROGRAM = "GET_COURSE_PROGRAM",
    GET_COURSE_PROGRAM_LESSONS = "GET_COURSE_PROGRAM_LESSONS",
    GET_COURSE_REVIEWS = "GET_COURSE_REVIEWS",
    GET_COURSE_SETS = "GET_COURSE_SETS",
    GET_COURSE_SET = "GET_COURSE_SET",
    GET_ADMIN_COURSE_RESOURCES = "GET_ADMIN_COURSE_RESOURCES",
    GET_ADMIN_COURSES = "GET_ADMIN_COURSES",

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
    GET_ARTICLE_CATEGORIES = "GET_ARTICLE_CATEGORIES",
    GET_ARTICLE_FILTERS = "GET_ARTICLE_FILTERS",
    GET_ARTICLE_COURSES = "GET_ARTICLE_COURSES",
    GET_ADMIN_ARTICLES = "GET_ADMIN_ARTICLES",
    GET_ADMIN_ARTICLE = "GET_ADMIN_ARTICLE",
    GET_ADMIN_ARTICLE_RESOURCE = "GET_ADMIN_ARTICLE_RESOURCE",
    GET_ADMIN_ARTICLE_MATERIALS = "GET_ADMIN_ARTICLE_MATERIALS",

    //ARTICLE_PACKAGES
    GET_ARTICLE_PACKAGES = "GET_ARTICLE_PACKAGES",
    GET_ARTICLES_FROM_ARTICLE_PACKAGE = "GET_ARTICLES_FROM_ARTICLE_PACKAGE",
    GET_ADMIN_ARTICLE_PACKAGES = "GET_ADMIN_ARTICLE_PACKAGES",
    GET_ADMIN_ARTICLE_PACKAGE = "GET_ADMIN_ARTICLE_PACKAGE",
    GET_ADMIN_ARTICLE_PACKAGE_RESOURCE = "GET_ADMIN_ARTICLE_PACKAGE_RESOURCE",
    GET_ADMIN_ARTICLES_FROM_ARTICLE_PACKAGE = "GET_ADMIN_ARTICLES_FROM_ARTICLE_PACKAGE",

    //CATEGORY
    GET_ADMIN_CATEGORIES = "GET_ADMIN_CATEGORIES",
    GET_ADMIN_SUBCATEGORIES = "GET_ADMIN_SUBCATEGORIES",
    GET_ADMIN_CATEGORY = "GET_ADMIN_CATEGORY",

    //STATIC_REVIEW
    GET_ADMIN_STATIC_REVIEWS = "GET_ADMIN_STATIC_REVIEWS",
    GET_ADMIN_STATIC_REVIEW = "GET_ADMIN_STATIC_REVIEW",

    //ADVANTAGE
    GET_ADVANTAGES = "GET_ADVANTAGES",
    GET_ADVANTAGE = "GET_ADVANTAGE",

    // AUTHORS
    GET_AUTHORS = "GET_AUTHORS",
    GET_AUTHOR = "GET_AUTHOR",
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
    UPDATE_ACTIVITY_USER = "UPDATE_ACTIVITY_USER",
    CHANGE_USER_PASSWORD = "CHANGE_USER_PASSWORD",

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
    UPDATE_UPLOADED_FILES = "UPDATE_UPLOADED_FILES",
    DELETE_UPLOADED_FILE = "DELETE_UPLOADED_FILE",
    UPDATE_ACTIVITY_UPLOADED_FILE = "UPDATE_ACTIVITY_UPLOADED_FILE",

    //ARTICLE_PACKAGES
    CREATE_ARTICLE_PACKAGE = "CREATE_ARTICLE_PACKAGE",
    UPDATE_ARTICLE_PACKAGE = "UPDATE_ARTICLE_PACKAGE",
    DELETE_ARTICLE_PACKAGE = "DELETE_ARTICLE_PACKAGE",
    UPDATE_ACTIVITY_ARTICLE_PACKAGE = "UPDATE_ACTIVITY_ARTICLE_PACKAGE",
    DELETE_ARTICLE_FROM_ARTICLE_PACKAGE = "DELETE_ARTICLE_FROM_ARTICLE_PACKAGE",

    //CATEGORY
    DELETE_CATEGORY = "DELETE_CATEGORY",
    UPDATE_CATEGORY = "UPDATE_CATEGORY",
    CREATE_CATEGORY = "CREATE_CATEGORY",
    UPDATE_ACTIVITY_CATEGORY = "UPDATE_ACTIVITY_CATEGORY",

    //STATIC_REVIEW
    CREATE_STATIC_REVIEW = "CREATE_STATIC_REVIEW",
    UPDATE_STATIC_REVIEW = "UPDATE_STATIC_REVIEW",
    DELETE_STATIC_REVIEW = "DELETE_STATIC_REVIEW",
    ACTIVATE_STATIC_REVIEW = "ACTIVATE_STATIC_REVIEW",
    DEACTIVATE_STATIC_REVIEW = "DEACTIVATE_STATIC_REVIEW",

    //ADVANTAGE
    CREATE_ADVANTAGE = "CREATE_ADVANTAGE",
    UPDATE_ADVANTAGE = "UPDATE_ADVANTAGE",
    DELETE_ADVANTAGE = "DELETE_ADVANTAGE",

    //AUTHORS
    CREATE_AUTHOR = "CREATE_AUTHOR",
    UPDATE_AUTHOR = "UPDATE_AUTHOR",
    DELETE_AUTHOR = "DELETE_AUTHOR",
    UPDATE_ACTIVITY_AUTHOR = "UPDATE_ACTIVITY_AUTHOR",

    //ARTICLE
    CREATE_ARTICLE = "CREATE_ARTICLE",
    UPDATE_ARTICLE = "UPDATE_ARTICLE",
    DELETE_ARTICLE = "DELETE_ARTICLE",
    UPDATE_ACTIVITY_ARTICLE = "UPDATE_ACTIVITY_ARTICLE",
    DELETE_ARTICLE_MATERIAL = "DELETE_ARTICLE_MATERIAL",
}
