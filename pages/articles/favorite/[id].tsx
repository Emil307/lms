import React, { ReactElement } from "react";
import { GetServerSidePropsContext } from "next";
import { dehydrate } from "@tanstack/react-query";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { FavoriteArticleDetailsPage } from "@pages/articles";
import { GetServerSidePropsContextParams, NextPageWithLayoutProps } from "@shared/types";
import { getSsrInstances, handleAxiosErrorSsr } from "@app/config/ssr";
import { ArticleApi } from "@entities/article";
import { ArticleTypes, EntityNames, QueryKeys } from "@shared/constant";
import { UserPage } from "@components/UserPage";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { id } = context.params as GetServerSidePropsContextParams;

    const { axios, queryClient } = getSsrInstances(context);

    const articleApi = new ArticleApi(axios);

    try {
        const response = await queryClient.fetchQuery(
            [
                QueryKeys.GET_ARTICLE,
                [EntityNames.ARTICLE, EntityNames.CATEGORY, EntityNames.TAG, EntityNames.MATERIAL],
                ArticleTypes.FAVORITE,
                id,
            ],
            () => articleApi.getFavoriteArticle({ id })
        );

        if (!response.data.isAvailable) {
            return {
                redirect: {
                    destination: "/articles?tab=favorite",
                    permanent: false,
                },
            };
        }

        return {
            props: {
                dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
                title: response.data.name,
            },
        };
    } catch (error) {
        return handleAxiosErrorSsr(error);
    }
}

const FavoriteArticleDetails: NextPageWithLayout<NextPageWithLayoutProps> = ({ title }) => {
    return (
        <UserPage title={title}>
            <FavoriteArticleDetailsPage />
        </UserPage>
    );
};

FavoriteArticleDetails.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default FavoriteArticleDetails;
