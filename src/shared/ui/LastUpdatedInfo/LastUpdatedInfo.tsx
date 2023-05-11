import { Flex, Text } from "@mantine/core";
import dayjs from "dayjs";
import Link from "next/link";
import { LastUpdated } from "@shared/types";
import useStyles from "./LastUpdatedInfo.styles";

export interface LastUpdatedInfoProps {
    data?: LastUpdated | null;
}

const LastUpdatedInfo = ({ data }: LastUpdatedInfoProps) => {
    const { classes } = useStyles();
    const fio = [data?.user?.profile.firstName, data?.user?.profile.lastName].join(" ");

    return (
        <Flex className={classes.root}>
            <Text>Изменение:</Text>
            <Text className={classes.date}>{data?.date ? dayjs(data.date).format("DD.MM.YYYY HH:mm") : "-"}</Text>
            <Link className={classes.userInfo} href={{ pathname: "/admin/users/[id]", query: { id: String(data?.user?.id) } }}>
                {fio}
            </Link>
        </Flex>
    );
};

export default LastUpdatedInfo;
