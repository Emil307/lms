import { Box, Title } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs } from "@shared/ui";
import { useDetailUser } from "@entities/user";
import { UpdateUserForm } from "@features/users";
import { TRouterQueries } from "@shared/types";
import { getFullNameFromProfile } from "@shared/utils";
import { getBreadCrumbsItems } from "./utils";

const UserUpdatePage = () => {
    const router = useRouter();
    const { id } = router.query as TRouterQueries;

    const { data: userData } = useDetailUser(id);
    const userName = getFullNameFromProfile(userData?.profile);

    const handleCloseForm = () => router.push("/admin/users");

    return (
        <Box>
            <BreadCrumbs items={getBreadCrumbsItems({ userName, id })} mb={8} />
            <Title order={1} color="dark" mb={24}>
                {userName}
            </Title>
            <UpdateUserForm data={userData} onClose={handleCloseForm} />
        </Box>
    );
};

export default UserUpdatePage;
