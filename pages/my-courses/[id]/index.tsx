import React, { ReactElement } from "react";
import { GetServerSidePropsContext } from "next";
import { dehydrate } from "@tanstack/react-query";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { MyCourseDetailsPage } from "@pages/myCourses";
import { UserPage } from "@components/UserPage";
import { GetServerSidePropsContextParams, NextPageWithLayoutProps } from "@shared/types";
import { getSsrInstances, handleAxiosErrorSsr } from "@app/config/ssr";
import { GroupApi } from "@entities/group";
import { EntityNames, QueryKeys } from "@shared/constant";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { id } = context.params as GetServerSidePropsContextParams;

    const { axios, queryClient } = getSsrInstances(context);

    const groupApi = new GroupApi(axios);

    try {
        const response = await queryClient.fetchQuery(
            [
                QueryKeys.GET_GROUP,
                [EntityNames.GROUP, EntityNames.COURSE, EntityNames.LESSON, EntityNames.CATEGORY, EntityNames.TAG],
                id,
            ],
            () => groupApi.getGroup({ id })
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

const MyCourseDetails: NextPageWithLayout<NextPageWithLayoutProps> = ({ title }) => {
    return (
        <UserPage title={title}>
            <MyCourseDetailsPage />
        </UserPage>
    );
};

MyCourseDetails.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default MyCourseDetails;
