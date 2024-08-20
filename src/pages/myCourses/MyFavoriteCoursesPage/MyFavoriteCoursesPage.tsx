import React from "react";
import { List as CourseList } from "@features/courses";
import { breadCrumbsItems } from "./constants";
import { Header } from "./components";

const HeaderSlot = (props: any) => {
    return <Header {...props} breadCrumbsItems={breadCrumbsItems} />;
};

const MyFavoriteCoursesPage = () => {
    return <CourseList perPage={9} withPagination isFavorite headerSlot={HeaderSlot} />;
};

export default MyFavoriteCoursesPage;
