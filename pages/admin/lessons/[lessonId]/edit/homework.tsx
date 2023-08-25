import React from "react";
import { ReactElement } from "react";
import { GetServerSidePropsContext } from "next";
import { dehydrate } from "@tanstack/react-query";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { UpdateLessonHomeworkPage } from "@pages/admin/lessons";
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

    const response = await queryClient.fetchQuery([QueryKeys.GET_ADMIN_LESSON, lessonId], () => lessonApi.getAdminLesson(lessonId));

    return {
        props: {
            dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
            title: response.name,
        },
    };
}

const UpdateHomework: NextPageWithLayout<NextPageWithLayoutProps> = ({ title }) => {
    return (
        <AdminPage title={title}>
            <UpdateLessonHomeworkPage />
        </AdminPage>
    );
};

UpdateHomework.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default UpdateHomework;
