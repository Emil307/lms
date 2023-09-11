import React from "react";
import { ReactElement } from "react";
import { GetServerSidePropsContext } from "next";
import { dehydrate } from "@tanstack/react-query";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { LessonDetailsPage } from "@pages/lessons";
import { getSsrInstances, handleAxiosErrorSsr } from "@app/config/ssr";
import { LessonApi } from "@entities/lesson";
import { QueryKeys } from "@shared/constant";
import { GroupApi } from "@entities/group";
import { NextPageWithLayoutProps } from "@shared/types";
import { UserPage } from "@components/UserPage";

type GetServerSidePropsContextParams = {
    lessonId: string;
    id: string;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { lessonId, id: groupId } = context.params as GetServerSidePropsContextParams;

    const { axios, queryClient } = await getSsrInstances(context);

    const lessonApi = new LessonApi(axios);
    const groupApi = new GroupApi(axios);

    try {
        const responseGroup = await queryClient.fetchQuery([QueryKeys.GET_GROUP, groupId], () => groupApi.getGroup({ id: groupId }));

        const response = await queryClient.fetchQuery([QueryKeys.GET_LESSON, lessonId], () =>
            lessonApi.getLesson({
                id: lessonId,
                courseId: responseGroup.courseId,
            })
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

const LessonDetails: NextPageWithLayout<NextPageWithLayoutProps> = ({ title }) => {
    return (
        <UserPage title={title}>
            <LessonDetailsPage />
        </UserPage>
    );
};

LessonDetails.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default LessonDetails;
