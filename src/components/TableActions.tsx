import React from "react";
import FileManager from "./FileManager";

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

    const handleSave = () => {
        const jsonData = {
            livros: data.map((row) => ({
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

    return (
        <div className="manager">
            <button onClick={onAddRow}>Adicionar linha</button>
            <button onClick={handleSave}>Salvar</button>
            <FileManager
                setData={setData}
                setAuthors={setAuthors}
                setPublishers={setPublishers}
                setGenres={setGenres}
            />
            <button onClick={handleToggleVisibility}>Gerenciar autores, editoras e gêneros</button>
        </div>
    );
};

export default TableActions;
