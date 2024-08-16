import React from "react";
import { ReactElement } from "react";
import { useRouter } from "next/router";
import { AdminLayout } from "@app/layouts";
import { AdminPage } from "@components/AdminPage";
import { CourseModuleDetailPage } from "@pages/admin/courses";
import { NextPageWithLayout } from "@shared/utils/types";
import { NextPageWithLayoutProps } from "@shared/types";
import { useCourseModule } from "@entities/courseModule";
import { Loader } from "@shared/ui";
import { CustomPage500 } from "@pages/errors";

const CourseModuleDetail: NextPageWithLayout<NextPageWithLayoutProps> = () => {
    const router = useRouter();
    const { id: courseId, moduleId } = router.query;

    const { data, isLoading, error } = useCourseModule(
        courseId && moduleId ? { courseId: courseId as string, moduleId: moduleId as string } : { courseId: "", moduleId: "" }
    );

    if (isLoading) return <Loader />;
    if (error) return <CustomPage500 />;

    return (
        <AdminPage title={data.name}>
            <CourseModuleDetailPage />
        </AdminPage>
    );
};

CourseModuleDetail.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default CourseModuleDetail;
