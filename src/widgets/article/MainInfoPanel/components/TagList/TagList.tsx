import { Badge, Group } from "@mantine/core";
import useStyles from "./TagList.styles";

export interface TagListProps {
    data: {
        id: number;
        name: string;
        slug: string;
    }[];
}

const TagList = ({ data }: TagListProps) => {
    const { classes } = useStyles();

    if (!data.length) {
        return null;
    }

    return (
        <Group sx={{ gap: 4 }}>
            {data.map((tag) => (
                <Badge key={tag.id} className={classes.tag}>
                    #{tag.name}
                </Badge>
            ))}
        </Group>
    );
};

export default TagList;
