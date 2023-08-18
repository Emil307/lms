export enum QueryKeys {
    //AUTH
    GET_ME = "GET_ME",

    //ROLE
    GET_ROLES = "GET_ROLES",

    //USER
    GET_ADMIN_USERS = "GET_ADMIN_USERS",
    GET_ADMIN_STUDENTS = "GET_ADMIN_STUDENTS",
    GET_ADMIN_STUDENTS_NO_INCLUDED_GROUP = "GET_ADMIN_STUDENTS_NO_INCLUDED_GROUP",
    GET_ADMIN_USER = "GET_ADMIN_USER",
    GET_ADMIN_USERS_FILTERS = "GET_ADMIN_USERS_FILTERS",
    GET_STATIC_USERS = "GET_STATIC_USERS",
    GET_ADMIN_STUDENT_COURSES = "GET_ADMIN_STUDENT_COURSES",
    GET_ADMIN_NO_STUDENT_COURSES = "GET_ADMIN_NO_STUDENT_COURSES",

    //STATIC_PAGE
    GET_PUBLIC_OFFER = "GET_PUBLIC_OFFER",
    GET_CONTACTS = "GET_CONTACTS",
    GET_ABOUT = "GET_ABOUT",
    GET_FAQ = "GET_FAQ",
    GET_ADMIN_FAQ = "GET_ADMIN_FAQ",
    GET_MAIN_BANNER = "GET_MAIN_BANNER",
    GET_MAIN_INDEX = "GET_MAIN_INDEX",

    //STORAGE
    GET_ADMIN_UPLOADED_FILE = "GET_UPLOADED_FILE",
    GET_UPLOADED_FILES = "GET_UPLOADED_FILES",
    GET_UPLOADED_FILE_RESOURCE = "GET_UPLOADED_FILE_RESOURCE",

    //COURSE
    GET_TEACHERS = "GET_TEACHERS",
    GET_COURSE_PROGRAM = "GET_COURSE_PROGRAM",
    GET_COURSE_PROGRAM_LESSONS = "GET_COURSE_PROGRAM_LESSONS",
    GET_COURSES = "GET_COURSES",
    GET_COURSE = "GET_COURSE",
    GET_COURSES_INFINITE = "GET_COURSES_INFINITE",
    GET_COURSE_RESOURCES = "GET_COURSE_RESOURCES",

    GET_ADMIN_COURSE_RESOURCES = "GET_ADMIN_COURSE_RESOURCES",
    GET_ADMIN_COURSES = "GET_ADMIN_COURSES",
    GET_ADMIN_COURSE = "GET_ADMIN_COURSE",
    GET_TEACHER_COURSES = "GET_TEACHER_COURSES",

    //COURSE_MODULE
    GET_ADMIN_COURSE_MODULES = "GET_ADMIN_COURSE_MODULES",
    GET_ADMIN_COURSE_MODULE = "GET_ADMIN_COURSE_MODULE",

    //COURSE_PACKAGE
    GET_COURSE_PACKAGES = "GET_COURSE_PACKAGES",
    GET_COURSE_PACKAGE = "GET_COURSE_PACKAGE",
    GET_ADMIN_COURSE_PACKAGE = "GET_ADMIN_COURSE_PACKAGE",
    GET_ADMIN_COURSE_PACKAGES = "GET_ADMIN_COURSE_PACKAGES",
    GET_ADMIN_COURSE_PACKAGE_RESOURCES = "GET_COURSE_PACKAGE_RESOURCES",
    GET_ADMIN_COURSES_FROM_COURSE_PACKAGE = "GET_ADMIN_COURSES_FROM_COURSE_PACKAGE",

    //COURSE_COLLECTION
    GET_ADMIN_COURSE_COLLECTIONS = "GET_ADMIN_COURSE_COLLECTIONS",
    GET_ADMIN_COURSE_COLLECTION = "GET_ADMIN_COURSE_COLLECTION",
    GET_ADMIN_COURSE_COLLECTION_RESOURCES = "GET_ADMIN_COURSE_COLLECTION_RESOURCES",
    GET_ADMIN_COURSES_FROM_NO_COURSE_COLLECTION = "GET_ADMIN_COURSES_FROM_NO_COURSE_COLLECTION",
    GET_ADMIN_COURSES_FROM_COURSE_COLLECTION = "GET_ADMIN_COURSES_FROM_COURSE_COLLECTION",
    GET_COURSE_COLLECTIONS = "GET_COURSE_COLLECTIONS",
    GET_COURSE_COLLECTION = "GET_COURSE_COLLECTION",
    GET_RANDOM_COURSE_COLLECTION = "GET_RANDOM_COURSE_COLLECTION",

    //LESSON
    GET_ADMIN_LESSONS = "GET_ADMIN_LESSONS",
    GET_ADMIN_LESSONS_FOR_SELECT = "GET_ADMIN_LESSONS_FOR_SELECT",
    GET_ADMIN_LESSON = "GET_ADMIN_LESSON",
    GET_ADMIN_LESSON_MATERIALS = "GET_ADMIN_LESSON_MATERIALS",
    GET_ADMIN_LESSON_MATERIALS_FOR_SELECT = "GET_ADMIN_LESSON_MATERIALS_FOR_SELECT",
    GET_ADMIN_LESSON_TEST = "GET_ADMIN_LESSON_TEST",
    GET_ADMIN_LESSON_HOMEWORK = "GET_ADMIN_LESSON_HOMEWORK",
    GET_ADMIN_LESSON_HOMEWORK_ANSWER = "GET_ADMIN_LESSON_HOMEWORK_ANSWER",
    GET_ADMIN_LESSON_HOMEWORK_ANSWERS = "GET_ADMIN_LESSON_HOMEWORK_ANSWERS",
    GET_ADMIN_LESSON_HOMEWORK_ANSWERS_RESOURCES = "GET_ADMIN_LESSON_HOMEWORK_ANSWERS_RESOURCES",
    GET_ADMIN_LESSON_HOMEWORK_MESSAGES = "GET_ADMIN_LESSON_HOMEWORK_MESSAGES",
    GET_LESSON = "GET_LESSON",
    GET_LESSON_TEST = "GET_LESSON_TEST",
    GET_LESSON_TEST_PASS = "GET_LESSON_TEST_PASS",
    GET_LESSON_HOMEWORK = "GET_LESSON_HOMEWORK",
    GET_LESSON_HOMEWORK_MESSAGES = "GET_LESSON_HOMEWORK_MESSAGES",

    //COURSE_REVIEW
    GET_ADMIN_COURSE_REVIEWS = "GET_ADMIN_COURSE_REVIEWS",
    GET_ADMIN_COURSE_REVIEW = "GET_ADMIN_COURSE_REVIEW",
    GET_ADMIN_COURSE_REVIEW_RESOURCES = "GET_ADMIN_COURSE_REVIEW_RESOURCES",
    GET_COURSE_REVIEWS = "GET_COURSE_REVIEWS",

    //GROUP
    GET_ADMIN_GROUPS = "GET_ADMIN_GROUPS",
    GET_ADMIN_GROUP = "GET_ADMIN_GROUP",
    GET_ADMIN_GROUP_FILTERS = "GET_ADMIN_GROUP_FILTERS",
    GET_ADMIN_GROUP_STUDENTS = "GET_ADMIN_GROUP_STUDENTS",
    GET_ADMIN_GROUP_SCHEDULES = "GET_ADMIN_GROUP_SCHEDULES",
    GET_TEACHER_GROUPS = "GET_TEACHER_GROUPS",
    GET_GROUPS = "GET_GROUPS",
    GET_GROUP = "GET_GROUP",
    GET_GROUPS_COUNTS = "GET_GROUPS_COUNTS",
    GET_GROUP_MODULES = "GET_GROUP_MODULES",
    GET_GROUPS_SCHEDULES = "GET_GROUPS_SCHEDULES",

    //STUDENT
    GET_ADMIN_STUDENTS_FILTERS = "GET_ADMIN_STUDENTS_FILTERS",

    //TAG
    GET_ADMIN_TAGS = "GET_ADMIN_TAGS",
    GET_ADMIN_TAG = "GET_ADMIN_TAG",

    //ARTICLE
    GET_ARTICLES = "GET_ARTICLES",
    GET_ARTICLE = "GET_ARTICLE",
    GET_ARTICLES_FILTERS = "GET_ARTICLES_FILTERS",
    GET_ARTICLE_CATEGORIES = "GET_ARTICLE_CATEGORIES",
    GET_ARTICLE_COURSES = "GET_ARTICLE_COURSES",
    GET_ADMIN_ARTICLE_FILTERS = "GET_ADMIN_ARTICLE_FILTERS",
    GET_ADMIN_ARTICLES = "GET_ADMIN_ARTICLES",
    GET_ADMIN_ARTICLES_INFINITY = "GET_ADMIN_ARTICLES_INFINITY",
    GET_ADMIN_ARTICLE = "GET_ADMIN_ARTICLE",
    GET_ADMIN_ARTICLE_RESOURCES_CREATE = "GET_ADMIN_ARTICLE_RESOURCES_CREATE",
    GET_ADMIN_ARTICLE_MATERIALS = "GET_ADMIN_ARTICLE_MATERIALS",
    GET_ADMIN_NO_ARTICLE_MATERIALS = "GET_ADMIN_NO_ARTICLE_MATERIALS",
    GET_ADMIN_ARTICLE_COURSES = "GET_ADMIN_ARTICLE_COURSES",
    GET_ADMIN_NO_ARTICLE_COURSES = "GET_ADMIN_NO_ARTICLE_COURSES",

    //ARTICLE_PACKAGES
    GET_ARTICLE_PACKAGES = "GET_ARTICLE_PACKAGES",
    GET_ADMIN_ARTICLE_PACKAGES = "GET_ADMIN_ARTICLE_PACKAGES",
    GET_ADMIN_ARTICLE_PACKAGE = "GET_ADMIN_ARTICLE_PACKAGE",
    GET_ADMIN_ARTICLE_PACKAGE_FILTERS = "GET_ADMIN_ARTICLE_PACKAGE_FILTERS",
    GET_ADMIN_ARTICLE_PACKAGE_RESOURCES_CREATE = "GET_ADMIN_ARTICLE_PACKAGE_RESOURCES_CREATE",
    GET_ADMIN_ARTICLES_FROM_ARTICLE_PACKAGE = "GET_ADMIN_ARTICLES_FROM_ARTICLE_PACKAGE",

    //CATEGORY
    GET_ADMIN_CATEGORIES = "GET_ADMIN_CATEGORIES",
    GET_ADMIN_CATEGORY = "GET_ADMIN_CATEGORY",
    GET_ADMIN_SUBCATEGORIES = "GET_ADMIN_SUBCATEGORIES",
    GET_ADMIN_SUBCATEGORIES_PAGINATE = "GET_ADMIN_SUBCATEGORIES_PAGINATE",
    GET_CATEGORY = "GET_CATEGORY",

    //STATIC_REVIEW
    GET_ADMIN_STATIC_REVIEWS = "GET_ADMIN_STATIC_REVIEWS",
    GET_ADMIN_STATIC_REVIEW = "GET_ADMIN_STATIC_REVIEW",
    GET_STATIC_REVIEWS = "GET_STATIC_REVIEWS",

    //ADVANTAGE
    GET_ADMIN_ADVANTAGES = "GET_ADMIN_ADVANTAGES",
    GET_ADVANTAGES = "GET_ADVANTAGES",
    GET_ADVANTAGE = "GET_ADVANTAGE",

    // AUTHORS
    GET_ADMIN_AUTHORS = "GET_ADMIN_AUTHORS",
    GET_ADMIN_AUTHOR = "GET_ADMIN_AUTHOR",

    //SUPPORT
    GET_ADMIN_SUPPORT_CONVERSATIONS = "GET_ADMIN_SUPPORT_CONVERSATIONS",
    GET_ADMIN_SUPPORT_MESSAGES = "GET_ADMIN_SUPPORT_MESSAGES",
    GET_SUPPORT_MESSAGES = "GET_SUPPORT_MESSAGES",

    //NOTIFICATION
    GET_NOTIFICATIONS = "GET_NOTIFICATIONS",
    GET_NEW_NOTIFICATIONS = "GET_NEW_NOTIFICATIONS",

    //TRANSACTION
    GET_ADMIN_TRANSACTIONS = "GET_ADMIN_TRANSACTIONS",
    GET_ADMIN_TRANSACTIONS_FILTERS = "GET_ADMIN_TRANSACTIONS_FILTERS",
    GET_ADMIN_TRANSACTION = "GET_ADMIN_TRANSACTION",
    GET_ADMIN_TRANSACTION_CREATE_RESOURCES = "GET_ADMIN_TRANSACTION_CREATE_RESOURCES",
    GET_ADMIN_TRANSACTION_CREATE_ENTITIES = "GET_ADMIN_TRANSACTION_CREATE_ENTITIES",
    GET_TRANSACTIONS = "GET_TRANSACTIONS",
    GET_TRANSACTIONS_FILTERS = "GET_TRANSACTIONS_FILTERS",

    //EXTERNAL_ICON
    GET_EXTERNAL_ICONS = "GET_EXTERNAL_ICONS",
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
    UPDATE_USER_ACTIVITY = "UPDATE_USER_ACTIVITY",
    UPDATE_USER_STATIC = "UPDATE_USER_STATIC",
    CHANGE_USER_PASSWORD = "CHANGE_USER_PASSWORD",
    ATTACH_COURSES_TO_STUDENT = "ATTACH_COURSES_TO_STUDENT",
    DELETE_STUDENT_COURSES = "DELETE_STUDENT_COURSES",

    //GROUP
    CREATE_ADMIN_GROUP = "CREATE_ADMIN_GROUP",
    UPDATE_ADMIN_GROUP = "UPDATE_ADMIN_GROUP",
    DELETE_ADMIN_GROUP = "DELETE_ADMIN_GROUP",
    UPDATE_GROUP_ACTIVITY = "UPDATE_GROUP_ACTIVITY",
    ATTACH_ADMIN_STUDENTS_TO_GROUP = "ATTACH_ADMIN_STUDENTS_TO_GROUP",
    DELETE_ADMIN_STUDENTS_FROM_GROUP = "DELETE_ADMIN_STUDENTS_FROM_GROUP",
    CREATE_ADMIN_GROUP_SCHEDULE = "CREATE_ADMIN_GROUP_SCHEDULE",
    UPDATE_ADMIN_GROUP_SCHEDULE = "UPDATE_ADMIN_GROUP_SCHEDULE",
    DELETE_ADMIN_GROUP_SCHEDULE = "DELETE_ADMIN_GROUP_SCHEDULE",

    //COURSE
    CREATE_COURSE = "CREATE_COURSE",
    UPDATE_COURSE = "UPDATE_COURSE",
    UPDATE_COURSE_ACTIVITY = "UPDATE_COURSE_ACTIVITY",
    UPDATE_COURSE_TYPE = "UPDATE_COURSE_TYPE",
    UPDATE_COURSE_POPULARITY = "UPDATE_COURSE_POPULARITY",
    UPDATE_PUBLICATION_COURSE = "UPDATE_PUBLICATION_COURSE",
    DELETE_COURSE = "DELETE_COURSE",
    DELETE_FAVORITE_COURSES = "DELETE_FAVORITE_COURSES",
    UPDATE_COURSE_FAVORITE = "UPDATE_COURSE_FAVORITE",

    //COURSE_PACKAGE
    CREATE_COURSE_PACKAGE = "CREATE_COURSE_PACKAGE",
    UPDATE_COURSE_PACKAGE = "UPDATE_COURSE_PACKAGE",
    DELETE_COURSE_PACKAGE = "DELETE_COURSE_PACKAGE",
    UPDATE_COURSE_PACKAGE_ACTIVITY = "UPDATE_COURSE_PACKAGE_ACTIVITY",
    ATTACH_COURSE_TO_COURSE_PACKAGE = "ATTACH_COURSE_TO_COURSE_PACKAGE",
    DELETE_COURSE_FROM_COURSE_PACKAGE = "DELETE_COURSE_FROM_COURSE_PACKAGE",

    //COURSE_COLLECTION
    CREATE_ADMIN_COURSE_COLLECTION = "CREATE_ADMIN_COURSE_COLLECTION",
    UPDATE_ADMIN_COURSE_COLLECTION = "UPDATE_ADMIN_COURSE_COLLECTION",
    DELETE_ADMIN_COURSE_COLLECTION = "DELETE_ADMIN_COURSE_COLLECTION",
    UPDATE_ADMIN_COURSE_COLLECTION_ACTIVITY = "UPDATE_ADMIN_COURSE_COLLECTION_ACTIVITY",
    ATTACH_ADMIN_COURSE_TO_COURSE_COLLECTION = "ATTACH_ADMIN_COURSE_TO_COURSE_COLLECTION",
    DELETE_COURSE_FROM_COURSE_COLLECTION = "DELETE_COURSE_FROM_COURSE_COLLECTION",

    //COURSE_MODULE
    CREATE_COURSE_MODULE = "CREATE_COURSE_MODULE",
    UPDATE_COURSE_MODULE = "UPDATE_COURSE_MODULE",
    UPDATE_COURSE_MODULE_ACTIVITY = "UPDATE_COURSE_MODULE_ACTIVITY",
    DELETE_COURSE_MODULE = "DELETE_COURSE_MODULE",
    ATTACH_LESSON_FROM_COURSE_MODULE = "ATTACH_LESSON_FROM_COURSE_MODULE",
    DETACH_LESSON_FROM_COURSE_MODULE = "DETACH_LESSON_FROM_COURSE_MODULE",
    UPDATE_COURSE_MODULE_ORDER = "UPDATE_COURSE_MODULE_ORDER",

    //LESSON
    CREATE_LESSON = "CREATE_LESSON",
    UPDATE_LESSON = "UPDATE_LESSON",
    UPDATE_LESSON_CONTENT = "UPDATE_LESSON_CONTENT",
    DELETE_LESSON = "DELETE_LESSON",
    FINISH_LESSON = "FINISH_LESSON",
    UPDATE_LESSON_ACTIVITY = "UPDATE_LESSON_ACTIVITY",
    UPDATE_LESSON_ORDER = "UPDATE_LESSON_ORDER",
    ATTACH_MATERIALS_TO_LESSON = "ATTACH_MATERIALS_TO_LESSON",
    DETACH_MATERIALS_FROM_LESSON = "DETACH_MATERIALS_FROM_LESSON",
    UPDATE_LESSON_TEST = "UPDATE_LESSON_TEST",
    UPDATE_ADMIN_LESSON_HOMEWORK = "UPDATE_ADMIN_LESSON_HOMEWORK",
    UPDATE_LESSON_TEST_PASS = "UPDATE_LESSON_TEST_PASS",
    UPDATE_LESSON_HOMEWORK_ANSWER = "UPDATE_LESSON_HOMEWORK_ANSWER",
    UPDATE_LESSON_HOMEWORK_ANSWER_STATUS = "UPDATE_LESSON_HOMEWORK_ANSWER_STATUS",
    CREATE_ADMIN_LESSON_HOMEWORK_MESSAGE = "CREATE_ADMIN_LESSON_HOMEWORK_MESSAGE",
    CREATE_LESSON_HOMEWORK_MESSAGE = "CREATE_LESSON_HOMEWORK_MESSAGE",

    //COURSE_REVIEW
    CREATE_COURSE_REVIEW = "CREATE_COURSE_REVIEW",
    UPDATE_COURSE_REVIEW_PUBLISHING_STATUS = "UPDATE_COURSE_REVIEW_PUBLISHING_STATUS",
    DELETE_COURSE_REVIEW = "DELETE_COURSE_REVIEW",

    //TAG
    DELETE_ADMIN_TAG = "DELETE_ADMIN_TAG",
    UPDATE_ADMIN_TAG = "UPDATE_ADMIN_TAG",
    CREATE_ADMIN_TAG = "CREATE_ADMIN_TAG",

    //STORAGE
    UPLOAD_FILE = "UPLOAD_FILE",
    UPDATE_UPLOADED_FILES = "UPDATE_UPLOADED_FILES",
    DELETE_UPLOADED_FILE = "DELETE_UPLOADED_FILE",
    UPDATE_UPLOADED_FILE_ACTIVITY = "UPDATE_UPLOADED_FILE_ACTIVITY",

    //ARTICLE_PACKAGES
    CREATE_ARTICLE_PACKAGE = "CREATE_ARTICLE_PACKAGE",
    UPDATE_ARTICLE_PACKAGE = "UPDATE_ARTICLE_PACKAGE",
    DELETE_ARTICLE_PACKAGE = "DELETE_ARTICLE_PACKAGE",
    UPDATE_ARTICLE_PACKAGE_ACTIVITY = "UPDATE_ARTICLE_PACKAGE_ACTIVITY",
    ATTACH_ARTICLE_TO_ARTICLE_PACKAGE = "ATTACH_ARTICLE_TO_ARTICLE_PACKAGE",
    DELETE_ARTICLE_FROM_ARTICLE_PACKAGE = "DELETE_ARTICLE_FROM_ARTICLE_PACKAGE",

    //CATEGORY
    DELETE_CATEGORY = "DELETE_CATEGORY",
    UPDATE_CATEGORY = "UPDATE_CATEGORY",
    CREATE_CATEGORY = "CREATE_CATEGORY",
    UPDATE_CATEGORY_ACTIVITY = "UPDATE_CATEGORY_ACTIVITY",

    //STATIC_REVIEW
    CREATE_STATIC_REVIEW = "CREATE_STATIC_REVIEW",
    UPDATE_STATIC_REVIEW = "UPDATE_STATIC_REVIEW",
    DELETE_STATIC_REVIEW = "DELETE_STATIC_REVIEW",
    UPDATE_STATIC_REVIEW_ACTIVITY = "UPDATE_STATIC_REVIEW_ACTIVITY",

    //AUTHORS
    CREATE_AUTHOR = "CREATE_AUTHOR",
    UPDATE_AUTHOR = "UPDATE_AUTHOR",
    DELETE_AUTHOR = "DELETE_AUTHOR",
    UPDATE_AUTHOR_ACTIVITY = "UPDATE_AUTHOR_ACTIVITY",

    //ARTICLE
    CREATE_ARTICLE = "CREATE_ARTICLE",
    UPDATE_ARTICLE = "UPDATE_ARTICLE",
    DELETE_ARTICLE = "DELETE_ARTICLE",
    UPDATE_ARTICLE_ACTIVITY = "UPDATE_ARTICLE_ACTIVITY",
    UPDATE_ARTICLE_RATING = "UPDATE_ARTICLE_RATING",
    UPDATE_ARTICLE_FAVORITE = "UPDATE_ARTICLE_FAVORITE",
    ATTACH_MATERIALS_TO_ARTICLE = "ATTACH_MATERIALS_TO_ARTICLE",
    DELETE_ARTICLE_MATERIAL = "DELETE_ARTICLE_MATERIAL",
    ATTACH_COURSES_TO_ARTICLE = "ATTACH_COURSES_TO_ARTICLE",
    DELETE_ARTICLE_COURSE = "DELETE_ARTICLE_COURSE",

    //MAIN_BANNER
    UPDATE_MAIN_BANNER = "UPDATE_MAIN_BANNER",

    //STATIC_PAGES
    UPDATE_ABOUT = "UPDATE_ABOUT",
    UPDATE_CONTACTS = "UPDATE_CONTACTS",
    UPDATE_PUBLIC_OFFER = "UPDATE_PUBLIC_OFFER",

    //ADVANTAGE
    CREATE_ADVANTAGE = "CREATE_ADVANTAGE",
    UPDATE_ADVANTAGE = "UPDATE_ADVANTAGE",
    DELETE_ADVANTAGE = "DELETE_ADVANTAGE",

    //FAQ
    CREATE_FAQ = "CREATE_FAQ",
    UPDATE_FAQ = "UPDATE_FAQ",
    UPDATE_FAQ_ORDER = "UPDATE_FAQ_ORDER",
    DELETE_FAQ = "DELETE_FAQ",
    UPDATE_FAQ_ACTIVITY = "UPDATE_FAQ_ACTIVITY",

    //NOTIFICATIONS
    UPDATE_NOTIFICATION = "UPDATE_NOTIFICATION",
    UPDATE_ADMIN_NOTIFICATION = "UPDATE_ADMIN_NOTIFICATION",
    READ_ALL_NOTIFICATIONS = "READ_ALL_NOTIFICATIONS",

    //SUPPORT
    CREATE_ADMIN_SUPPORT_MESSAGE = "CREATE_ADMIN_SUPPORT_MESSAGE",
    CREATE_SUPPORT_MESSAGE = "CREATE_SUPPORT_MESSAGE",

    //TRANSACTION
    CREATE_ADMIN_TRANSACTION = "CREATE_ADMIN_TRANSACTION",
    UPDATE_ADMIN_TRANSACTION = "UPDATE_ADMIN_TRANSACTION",
    DELETE_ADMIN_TRANSACTION = "DELETE_ADMIN_TRANSACTION",
}
