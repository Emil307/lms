import React from "react";
import { ReactElement } from "react";
import { GetServerSidePropsContext } from "next";
import { dehydrate } from "@tanstack/react-query";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { CourseModuleDetailPage } from "@pages/admin/courses";
import { getSsrInstances, handleAxiosErrorSsr } from "@app/config/ssr";
import { CourseModuleApi } from "@entities/courseModule";
import { EntityNames, QueryKeys } from "@shared/constant";
import { NextPageWithLayoutProps } from "@shared/types";

type GetServerSidePropsContextParams = {
    moduleId: string;
    id: string;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { moduleId, id: courseId } = context.params as GetServerSidePropsContextParams;

    const { axios, queryClient } = await getSsrInstances(context);

    const courseModuleApi = new CourseModuleApi(axios);

    try {
        const response = await queryClient.fetchQuery(
            [
                QueryKeys.GET_ADMIN_COURSE_MODULE,
                [EntityNames.COURSE_MODULE, EntityNames.COURSE, EntityNames.LESSON, EntityNames.USER],
                moduleId,
            ],
            () => courseModuleApi.getCourseModule({ courseId: String(courseId), moduleId: String(moduleId) })
        );

        return {
            props: {
                dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
                title: response.name,
            },
        };
    } catch (error) {
        return handleAxiosErrorSsr(error);
    }
}

const CourseModuleDetail: NextPageWithLayout<NextPageWithLayoutProps> = ({ title }) => {
    return (
        <AdminPage title={title}>
            <CourseModuleDetailPage />
        </AdminPage>
    );
};

CourseModuleDetail.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default CourseModuleDetail;
