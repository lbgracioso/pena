import React, {useEffect, useState} from "react";
import FileManager from "./FileManager.tsx";
import {useTranslation} from "react-i18next";

interface TableActionsProps {
    onAddRow: () => void;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    data: any[];
    authors: string[];
    publishers: string[];
    genres: string[];
    setData: React.Dispatch<React.SetStateAction<any[]>>;
    setAuthors: React.Dispatch<React.SetStateAction<string[]>>;
    setPublishers: React.Dispatch<React.SetStateAction<string[]>>;
    setGenres: React.Dispatch<React.SetStateAction<string[]>>;
}

const TableActions: React.FC<TableActionsProps> = ({
                                                       onAddRow,
                                                       setIsVisible,
                                                       data,
                                                       authors,
                                                       publishers,
                                                       genres,
                                                       setData,
                                                       setAuthors,
                                                       setPublishers,
                                                       setGenres
                                                   }) => {
    const handleToggleVisibility = () => {
        setIsVisible((prev) => !prev);
    };

    const {t} = useTranslation();

    const handleSave = () => {
        const jsonData = {
            livros: data.map((row) => ({
                id: row.id,
                book: row.book,
                author: row.author,
                publisher: row.publisher,
                genre: row.genre,
                volume: row.volume,
                read: row.read
            })),
            autores: authors,
            editoras: publishers,
            generos: genres
        };

        const jsonString = JSON.stringify(jsonData, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'library.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(url);
    };

    const [fix, setFix] = useState(false);

    function setFixed() {
        if (window.scrollY > 1) {
            setFix(true)
        } else {
            setFix(false)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", setFixed);

        return () => {
            window.removeEventListener("scroll", setFixed);
        };
    }, []);


    return (
        <div className={fix ? 'manager fixed' : 'manager'}>
            <button onClick={onAddRow}>{t("AddLine")}</button>
            <button onClick={handleSave}>{t("Save")}</button>
            <FileManager
                setData={setData}
                setAuthors={setAuthors}
                setPublishers={setPublishers}
                setGenres={setGenres}
            />
            <button onClick={handleToggleVisibility}>{t("ManageAuthorsPublishersGenres")}</button>
        </div>
    );
};

export default TableActions;
