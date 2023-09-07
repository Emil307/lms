import { FileText, PlayCircle } from "react-feather";
import { FileTypeCard } from "@features/materials";

export const fileTypeCards: FileTypeCard[] = [
    {
        id: 0,
        title: "Добавить видео",
        icon: <PlayCircle />,
        type: "video",
        fileFormats: ["mp4", "avi", "mpg"],
        description: "mp4, avi, mpg (не более 10 файлов за раз, размер не более 1Мb)",
    },
    {
        id: 1,
        title: "Добавить файлы",
        icon: <FileText />,
        type: "document",
        fileFormats: ["pdf", "doc", "docx", "mp4", "jpeg", "jpg", "png", "mpg"],
        description: "jpg, png, pdf, doc, docx, mp4, mpg (не более 10 файлов за раз, размер не более 1Мb)",
    },
];
