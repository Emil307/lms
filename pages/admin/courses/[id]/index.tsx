import React from "react";
import { ReactElement } from "react";
import { GetServerSidePropsContext } from "next";
import { dehydrate } from "@tanstack/react-query";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { CourseDetailsPage } from "@pages/admin/courses";
import { EntityNames, QueryKeys } from "@shared/constant";
import { CourseApi } from "@entities/course";
import { getSsrInstances, handleAxiosErrorSsr } from "@app/config/ssr";
import { GetServerSidePropsContextParams, NextPageWithLayoutProps } from "@shared/types";

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

const CourseDetails: NextPageWithLayout<NextPageWithLayoutProps> = ({ title }) => {
    return (
        <AdminPage title={title}>
            <CourseDetailsPage />
        </AdminPage>
    );
};

CourseDetails.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default CourseDetails;
