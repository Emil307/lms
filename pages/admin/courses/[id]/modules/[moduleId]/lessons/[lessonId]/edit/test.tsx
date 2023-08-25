import React from "react";
import { ReactElement } from "react";
import { GetServerSidePropsContext } from "next";
import { dehydrate } from "@tanstack/react-query";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { UpdateLessonTestPage } from "@pages/admin/lessons";
import { getSsrInstances } from "@app/config/ssr";
import { LessonApi } from "@entities/lesson";
import { QueryKeys } from "@shared/constant";
import { NextPageWithLayoutProps } from "@shared/types";

type GetServerSidePropsContextParams = {
    lessonId: string;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { lessonId } = context.params as GetServerSidePropsContextParams;

    const { axios, queryClient } = await getSsrInstances(context);

    const lessonApi = new LessonApi(axios);

    const response = await queryClient.fetchQuery([QueryKeys.GET_ADMIN_LESSON, lessonId], () => lessonApi.getAdminLesson(String(lessonId)));

    return {
        props: {
            dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
            title: response.name,
        },
    };
}

const UpdateTest: NextPageWithLayout<NextPageWithLayoutProps> = ({ title }) => {
    return (
        <AdminPage title={title}>
            <UpdateLessonTestPage />
        </AdminPage>
    );
};

UpdateTest.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default UpdateTest;
