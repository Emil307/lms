import React, { ReactElement } from "react";
import { GetServerSidePropsContext } from "next";
import { dehydrate } from "@tanstack/react-query";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { CourseDetailsPage } from "@pages/courses";
import { UserPage } from "@components/UserPage";
import { GetServerSidePropsContextParams, NextPageWithLayoutProps } from "@shared/types";
import { getSsrInstances, handleAxiosErrorSsr } from "@app/config/ssr";
import { CourseApi } from "@entities/course";
import { EntityNames, QueryKeys } from "@shared/constant";
export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { id } = context.params as GetServerSidePropsContextParams;

    const { axios, queryClient } = getSsrInstances(context);

    const courseApi = new CourseApi(axios);

    try {
        const response = await queryClient.fetchQuery(
            [
                QueryKeys.GET_COURSE,
                [
                    EntityNames.COURSE,
                    EntityNames.COURSE_MODULE,
                    EntityNames.GROUP,
                    EntityNames.LESSON,
                    EntityNames.LESSON_HOMEWORK,
                    EntityNames.LESSON_TEST,
                    EntityNames.CATEGORY,
                    EntityNames.TAG,
                    EntityNames.USER,
                    EntityNames.COURSE_REVIEW,
                ],
                id,
            ],
            () => courseApi.getCourse({ id })
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
        <UserPage title={title}>
            <CourseDetailsPage />
        </UserPage>
    );
};

CourseDetails.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default CourseDetails;
