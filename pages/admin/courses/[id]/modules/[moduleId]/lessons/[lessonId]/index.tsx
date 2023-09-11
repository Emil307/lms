import React from "react";
import { ReactElement } from "react";
import { GetServerSidePropsContext } from "next";
import { dehydrate } from "@tanstack/react-query";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { LessonDetailPage } from "@pages/admin/lessons";
import { getSsrInstances, handleAxiosErrorSsr } from "@app/config/ssr";
import { LessonApi } from "@entities/lesson";
import { QueryKeys } from "@shared/constant";
import { NextPageWithLayoutProps } from "@shared/types";

type GetServerSidePropsContextParams = {
    lessonId: string;
};

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//     const { lessonId } = context.params as GetServerSidePropsContextParams;
//
//     const { axios, queryClient } = await getSsrInstances(context);
//
//     const lessonApi = new LessonApi(axios);
//
//     try {
//         const response = await queryClient.fetchQuery([QueryKeys.GET_ADMIN_LESSON, lessonId], () =>
//             lessonApi.getAdminLesson(String(lessonId))
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

const LessonDetail: NextPageWithLayout<NextPageWithLayoutProps> = ({ title }) => {
    return (
        <AdminPage title={title}>
            <LessonDetailPage />
        </AdminPage>
    );
};

LessonDetail.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default LessonDetail;
