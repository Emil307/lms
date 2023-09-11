import React from "react";
import { ReactElement } from "react";
import { GetServerSidePropsContext } from "next";
import { dehydrate } from "@tanstack/react-query";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { CourseCollectionDetailsPage } from "@pages/admin/settings";
import { GetServerSidePropsContextParams, NextPageWithLayoutProps } from "@shared/types";
import { getSsrInstances, handleAxiosErrorSsr } from "@app/config/ssr";
import { CourseCollectionApi } from "@entities/courseCollection";
import { QueryKeys } from "@shared/constant";

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//     const { id } = context.params as GetServerSidePropsContextParams;
//
//     const { axios, queryClient } = await getSsrInstances(context);
//
//     const courseCollectionApi = new CourseCollectionApi(axios);
//
//     try {
//         const response = await queryClient.fetchQuery([QueryKeys.GET_ADMIN_COURSE_COLLECTION, id], () =>
//             courseCollectionApi.getAdminCourseCollection({ id })
//         );
//
//         return {
//             props: {
//                 dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
//                 title: response.name,
//             },
//         };
//     } catch (error) {
//         return handleAxiosErrorSsr(error);
//     }
// }

const CourseCollectionDetails: NextPageWithLayout<NextPageWithLayoutProps> = ({ title }) => {
    return (
        <AdminPage title={title}>
            <CourseCollectionDetailsPage />
        </AdminPage>
    );
};

CourseCollectionDetails.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default CourseCollectionDetails;
