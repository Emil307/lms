import { FileText, PlayCircle, Image } from "react-feather";

export const getFileIcon = (type: "document" | "video" | "images") => {
    switch (type) {
        case "document":
            return <FileText />;
        case "video":
            return <PlayCircle />;
        case "images":
            // eslint-disable-next-line jsx-a11y/alt-text
            return <Image />;
        default:
            return <FileText />;
    }
};
