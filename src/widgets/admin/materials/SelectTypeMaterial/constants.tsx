import { FileText, PlayCircle } from "react-feather";
import { IMaterialTypeCard } from "@features/materials";

export const materialTypeCards: IMaterialTypeCard[] = [
    {
        id: 0,
        title: "Добавить видео",
        icon: <PlayCircle />,
        type: "video",
        fileFormats: ["mp4", "avi", "mpg"],
        description: "mp4, avi, mpg. До 64Мb (не более 10 файлов за раз)",
    },
    {
        id: 1,
        title: "Добавить файлы",
        icon: <FileText />,
        type: "document",
        fileFormats: ["pdf", "doc", "docx", "mp4", "jpeg", "jpg", "png", "mpg", "xls", "xlsx"],
        description: "jpg, png, pdf, doc, docx, mp4, mpg, xlsx. До 8Мb (не более 10 файлов за раз)",
    },
];
