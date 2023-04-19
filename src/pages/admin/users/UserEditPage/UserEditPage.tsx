import { Box, Title } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs } from "@shared/ui";
import { useDetailUser } from "@entities/user";
import { EditUserForm } from "@features/users";
import { getBreadCrumbsItems } from "./utils";
import { TRouterQueries } from "@shared/types";

const UserEditPage = () => {
    const router = useRouter();
    const { id } = router.query as TRouterQueries;

    const { data: userData } = useDetailUser(id);

    const userName = `${userData?.firstName} ${userData?.lastName}`;

    const handleCloseForm = () => router.push("/admin/users");

    return (
        <Box>
            <BreadCrumbs items={getBreadCrumbsItems({ userName, id })} mb={8} />
            <Title order={1} color="dark" mb={24}>
                {userName}
            </Title>
            <EditUserForm data={userData} onClose={handleCloseForm} />
        </Box>
    );
};

export default UserEditPage;
