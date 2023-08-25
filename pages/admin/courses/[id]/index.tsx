import React from "react";
import { ReactElement } from "react";
import { GetServerSidePropsContext } from "next";
import { dehydrate } from "@tanstack/react-query";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { CourseDetailsPage } from "@pages/admin/courses";
import { QueryKeys } from "@shared/constant";
import { CourseApi } from "@entities/course";
import { getSsrInstances } from "@app/config/ssr";
import { GetServerSidePropsContextParams, NextPageWithLayoutProps } from "@shared/types";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { id } = context.params as GetServerSidePropsContextParams;

    const { axios, queryClient } = await getSsrInstances(context);

    const courseApi = new CourseApi(axios);

    const response = await queryClient.fetchQuery([QueryKeys.GET_ADMIN_COURSE, id], () => courseApi.getAdminCourse(String(id)));

    return {
        props: {
            dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
            title: response.name,
        },
    };
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
