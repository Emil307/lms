import React from "react";
import { List as CourseList } from "@features/courses";
import { breadCrumbsItems } from "./constants";
import { Header } from "./components";

const MyFavoriteCoursesPage = () => {
    return (
        <CourseList
            perPage={9}
            withPagination
            isFavorite
            headerSlot={(props) => <Header {...props} breadCrumbsItems={breadCrumbsItems} />}
        />
    );
};

export default MyFavoriteCoursesPage;
