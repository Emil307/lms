import { Box } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Heading } from "@shared/ui";
import { useDetailUser } from "@entities/user";
import { UpdateUserForm } from "@features/users";
import { TRouterQueries } from "@shared/types";
import { getFullName } from "@shared/utils";
import { getBreadCrumbsItems } from "./utils";

const UpdateUserPage = () => {
    const router = useRouter();
    const { id } = router.query as TRouterQueries;

    const { data: userData } = useDetailUser(id);
    const userName = getFullName({ data: userData?.profile });

    const handleCloseForm = () => router.push("/admin/users");

    return (
        <Box>
            <BreadCrumbs items={getBreadCrumbsItems({ userName, id })} mb={8} />
            <Heading mb={24}>{userName}</Heading>
            <UpdateUserForm data={userData} onClose={handleCloseForm} />
        </Box>
    );
};

export default UpdateUserPage;
