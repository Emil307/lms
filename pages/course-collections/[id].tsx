import React from "react";
import { ReactElement } from "react";
import { GetServerSidePropsContext } from "next";
import { dehydrate } from "@tanstack/react-query";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { CourseCollectionDetailsPage } from "@pages/courseCollections";
import { GetServerSidePropsContextParams, NextPageWithLayoutProps } from "@shared/types";
import { getSsrInstances, handleAxiosErrorSsr } from "@app/config/ssr";
import { CourseCollectionApi } from "@entities/courseCollection";
import { EntityNames, QueryKeys } from "@shared/constant";
import { UserPage } from "@components/UserPage";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { id } = context.params as GetServerSidePropsContextParams;

    const { axios, queryClient } = await getSsrInstances(context);

    const courseCollectionApi = new CourseCollectionApi(axios);

    try {
        const response = await queryClient.fetchQuery([QueryKeys.GET_COURSE_COLLECTION, [EntityNames.COURSE_COLLECTION, EntityNames.COURSE], id], () =>
            courseCollectionApi.getCourseCollection({ id })
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

const CourseCollectionDetails: NextPageWithLayout<NextPageWithLayoutProps> = ({ title }) => {
    return (
        <UserPage title={title}>
            <CourseCollectionDetailsPage />
        </UserPage>
    );
};

CourseCollectionDetails.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default CourseCollectionDetails;
