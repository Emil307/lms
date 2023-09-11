import React from "react";
import { ReactElement } from "react";
import { GetServerSidePropsContext } from "next";
import { dehydrate } from "@tanstack/react-query";
import { CoursePackageDetailPage } from "@pages/coursePackages";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { getSsrInstances, handleAxiosErrorSsr } from "@app/config/ssr";
import { GetServerSidePropsContextParams, NextPageWithLayoutProps } from "@shared/types";
import { CoursePackageApi } from "@entities/coursePackage";
import { QueryKeys } from "@shared/constant";
import { UserPage } from "@components/UserPage";

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//     const { id } = context.params as GetServerSidePropsContextParams;
//
//     const { axios, queryClient } = await getSsrInstances(context);
//
//     const coursePackageApi = new CoursePackageApi(axios);
//
//     try {
//         const response = await queryClient.fetchQuery([QueryKeys.GET_COURSE_PACKAGE, id], () => coursePackageApi.getCoursePackage(id));
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

const CoursePackageDetail: NextPageWithLayout<NextPageWithLayoutProps> = ({ title }) => {
    return (
        <UserPage title={title}>
            <CoursePackageDetailPage />
        </UserPage>
    );
};

CoursePackageDetail.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default CoursePackageDetail;
