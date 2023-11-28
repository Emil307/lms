import React from "react";
import { ReactElement } from "react";
import { dehydrate } from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { UpdateLessonPage } from "@pages/admin/lessons";
import { NextPageWithLayoutProps } from "@shared/types";
import { EntityNames, QueryKeys } from "@shared/constant";
import { LessonApi } from "@entities/lesson";
import { getSsrInstances, handleAxiosErrorSsr } from "@app/config/ssr";

type GetServerSidePropsContextParams = {
    lessonId: string;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { lessonId } = context.params as GetServerSidePropsContextParams;

    const { axios, queryClient } = await getSsrInstances(context);

    const lessonApi = new LessonApi(axios);

    try {
        const response = await queryClient.fetchQuery([QueryKeys.GET_ADMIN_LESSON, [EntityNames.LESSON, EntityNames.USER], lessonId], () =>
            lessonApi.getAdminLesson(lessonId)
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

const UpdateLesson: NextPageWithLayout<NextPageWithLayoutProps> = ({ title }) => {
    return (
        <AdminPage title={title}>
            <UpdateLessonPage />
        </AdminPage>
    );
};

UpdateLesson.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default UpdateLesson;
