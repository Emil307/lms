import React from "react";
import { ReactElement } from "react";
import { GetServerSidePropsContext } from "next";
import { dehydrate } from "@tanstack/react-query";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { EntityNames, QueryKeys } from "@shared/constant";
import { CourseApi } from "@entities/course";
import { getSsrInstances, handleAxiosErrorSsr } from "@app/config/ssr";
import { GetServerSidePropsContextParams, NextPageWithLayoutProps } from "@shared/types";
import { CourseStatisticsPage } from "@pages/admin/courses";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { id } = context.params as GetServerSidePropsContextParams;

    const { axios, queryClient } = await getSsrInstances(context);

    const courseApi = new CourseApi(axios);

    try {
        const response = await queryClient.fetchQuery(
            [
                QueryKeys.GET_ADMIN_COURSE,
                [
                    EntityNames.COURSE,
                    EntityNames.CATEGORY,
                    EntityNames.TAG,
                    EntityNames.USER,
                    EntityNames.AUTHOR,
                    EntityNames.COURSE_REVIEW,
                ],
                id,
            ],
            () => courseApi.getAdminCourse(String(id))
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

const CourseStatistics: NextPageWithLayout<NextPageWithLayoutProps> = ({ title }) => {
    return (
        <AdminPage title={title}>
            <CourseStatisticsPage />
        </AdminPage>
    );
};

CourseStatistics.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default CourseStatistics;
