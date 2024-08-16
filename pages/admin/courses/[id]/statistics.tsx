import React from "react";
import { ReactElement } from "react";
import { useRouter } from "next/router";
import { AdminLayout } from "@app/layouts";
import { AdminPage } from "@components/AdminPage";
import { CourseStatisticsPage } from "@pages/admin/courses";
import { NextPageWithLayout } from "@shared/utils";
import { useAdminCourse } from "@entities/course";
import { Loader } from "@shared/ui";
import { CustomPage500 } from "@pages/errors";

const CourseStatistics: NextPageWithLayout<{ title: string }> = () => {
    const router = useRouter();
    const { id } = router.query;

    const { data, isLoading, error } = useAdminCourse(id as string);

    if (isLoading) return <Loader />;
    if (error) return <CustomPage500 />;

    return (
        <AdminPage title={data.name}>
            <CourseStatisticsPage />
        </AdminPage>
    );
};

CourseStatistics.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default CourseStatistics;
