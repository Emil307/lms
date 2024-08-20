import React, { ReactElement } from "react";
import { GetServerSidePropsContext } from "next";
import { dehydrate } from "@tanstack/react-query";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { ArticleDetailsPage } from "@pages/articles";
import { getSsrInstances, handleAxiosErrorSsr } from "@app/config/ssr";
import { ArticleApi } from "@entities/article";
import { EntityNames, QueryKeys } from "@shared/constant";
import { GetServerSidePropsContextParams, NextPageWithLayoutProps } from "@shared/types";
import { UserPage } from "@components/UserPage";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { id } = context.params as GetServerSidePropsContextParams;

    const { axios, queryClient } = getSsrInstances(context);

    const articleApi = new ArticleApi(axios);

    try {
        const response = await queryClient.fetchQuery(
            [QueryKeys.GET_ARTICLE, [EntityNames.ARTICLE, EntityNames.CATEGORY, EntityNames.TAG, EntityNames.MATERIAL], id],
            () => articleApi.getArticle({ id })
        );

        if (!response.isAvailable) {
            return {
                redirect: {
                    destination: "/articles",
                    permanent: false,
                },
            };
        }
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

const ArticleDetails: NextPageWithLayout<NextPageWithLayoutProps> = ({ title }) => {
    return (
        <UserPage title={title}>
            <ArticleDetailsPage />
        </UserPage>
    );
};

ArticleDetails.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default ArticleDetails;
