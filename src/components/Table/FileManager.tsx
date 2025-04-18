import React, { useRef } from "react";
import { RowData } from "../../types/types.ts";
import {useTranslation} from "react-i18next";
import {generateId} from "../../utils/utils.ts";

const FileManager = ({
                         setData,
                         setAuthors,
                         setPublishers,
                         setGenres
                     }: {
    setData: React.Dispatch<React.SetStateAction<RowData[]>>;
    setAuthors: React.Dispatch<React.SetStateAction<string[]>>;
    setPublishers: React.Dispatch<React.SetStateAction<string[]>>;
    setGenres: React.Dispatch<React.SetStateAction<string[]>>;
}) =>
{
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const {t} = useTranslation();
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = () => {
            try {
                const data = JSON.parse(reader.result as string);
                const booksWithId: RowData[] = (data.livros || []).map((livro: any) => ({
                    ...livro,
                    id: livro.id ?? generateId()
                }));

                setData(booksWithId);
                setAuthors(data.autores || []);
                setPublishers(data.editoras || []);
                setGenres(data.generos || []);
            } catch (error) {
                console.error("Erro ao carregar o arquivo:", error);
                alert("Falha ao carregar o arquivo. Verifique se ele está no formato correto.");
            }
        };

        reader.onerror = (error) => {
            console.error("Erro ao ler o arquivo:", error);
            alert("Erro ao ler o arquivo.");
        };

        reader.readAsText(file);
    };

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <>
            <button type="button" onClick={triggerFileInput}>{t("LoadFile")}</button>
            <input
                ref={fileInputRef}
                id="file-input"
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
            />
        </>
    );
};

export default FileManager;
