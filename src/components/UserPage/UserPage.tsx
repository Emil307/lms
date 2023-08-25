import Head from "next/head";
import React, { PropsWithChildren } from "react";

export interface UserPageProps {
    title?: React.ReactNode;
    permission?: string;
}

function UserPage({ children, title }: PropsWithChildren<UserPageProps>) {
    const titleValue = title ? `${title} | Галерея бизнеса` : "Галерея бизнеса";
    return (
        <>
            <Head>
                <title>{titleValue}</title>
            </Head>
            {children}
        </>
    );
}

export default UserPage;
