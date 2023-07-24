import { Flex } from "@mantine/core";
import dayjs from "dayjs";
import Link from "next/link";
import { LastUpdated } from "@shared/types";
import { getFullName } from "@shared/utils";
import useStyles from "./LastUpdatedInfo.styles";
import { Paragraph } from "../Typography";

export interface LastUpdatedInfoProps {
    data?: LastUpdated | null;
}

const LastUpdatedInfo = ({ data }: LastUpdatedInfoProps) => {
    const { classes } = useStyles();
    const fio = getFullName({ data: data?.user?.profile, hidePatronymic: true });

    return (
        <Flex className={classes.root}>
            <Paragraph variant="text-small-m" color="gray45">
                Изменение:
            </Paragraph>
            <Paragraph variant="text-small-m" className={classes.date}>
                {data?.date ? dayjs(data.date).format("DD.MM.YYYY HH:mm") : "-"}
            </Paragraph>
            <Link className={classes.userInfo} href={{ pathname: "/admin/users/[id]", query: { id: String(data?.user?.id) } }}>
                {fio}
            </Link>
        </Flex>
    );
};

export default LastUpdatedInfo;
