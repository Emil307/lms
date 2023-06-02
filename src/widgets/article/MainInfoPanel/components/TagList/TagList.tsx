import { Badge, Group } from "@mantine/core";
import { ArticleTag } from "@entities/article";
import useStyles from "./TagList.styles";

export interface TagListProps {
    data: ArticleTag[];
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
