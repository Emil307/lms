import React from "react";
import { ReactElement } from "react";
import { useRouter } from "next/router";
import { AdminLayout } from "@app/layouts";
import { AdminPage } from "@components/AdminPage";
import { UpdateLessonPage } from "@pages/admin/lessons";
import { NextPageWithLayout } from "@shared/utils/types";
import { NextPageWithLayoutProps } from "@shared/types";
import { useAdminLesson } from "@entities/lesson";
import { Loader } from "@shared/ui";
import { CustomPage500 } from "@pages/errors";

const UpdateLesson: NextPageWithLayout<NextPageWithLayoutProps> = () => {
    const router = useRouter();
    const { lessonId } = router.query;

    const { data, isLoading, error } = useAdminLesson(lessonId as string);

    if (isLoading) return <Loader />;
    if (error) return <CustomPage500 />;

    return (
        <AdminPage title={data.name}>
            <UpdateLessonPage />
        </AdminPage>
    );
};

UpdateLesson.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default UpdateLesson;
