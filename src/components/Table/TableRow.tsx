import React from "react";
import { RowData } from "../../types/types.ts";
import {useTranslation} from "react-i18next";

interface TableRowProps {
    row: RowData;
    rowIndex: number;
    authors: string[];
    publishers: string[];
    genres: string[];
    setData: React.Dispatch<React.SetStateAction<RowData[]>>;
    data: RowData[];
}

const TableRow: React.FC<TableRowProps> = ({ row, rowIndex, authors, publishers, genres, setData, data }) => {

    const {t} =  useTranslation();

    const handleEdit = <T extends keyof RowData>(column: T, value: RowData[T]) => {
        const newData = [...data];
        newData[rowIndex][column] = value;
        setData(newData);
    };

    const handleReadedChange = () => {
        const newData = [...data];
        newData[rowIndex].read = !newData[rowIndex].read;
        setData(newData);
    };

    const handleRemoveRow = (index: number) => {
        const newData = data.filter((_, i) => i !== index);
        setData(newData);
    };

    return (
        <tr>
            <td>
                <input type="text" value={row.book} onChange={(e) => handleEdit("book", e.target.value)} />
            </td>
            <td>
                <select value={row.author} onChange={(e) => handleEdit("author", e.target.value)}>
                    {authors.map((author, index) => (
                        <option key={index} value={author}>{author}</option>
                    ))}
                </select>
            </td>
            <td>
                <select value={row.publisher} onChange={(e) => handleEdit("publisher", e.target.value)}>
                    {publishers.map((publisher, index) => (
                        <option key={index} value={publisher}>{publisher}</option>
                    ))}
                </select>
            </td>
            <td>
                <select value={row.genre} onChange={(e) => handleEdit("genre", e.target.value)}>
                    {genres.map((genre, index) => (
                        <option key={index} value={genre}>{genre}</option>
                    ))}
                </select>
            </td>
            <td>
                <input type="text" value={row.volume} onChange={(e) => handleEdit("volume", e.target.value)} />
            </td>
            <td>
                <input type="checkbox" checked={row.read} onChange={handleReadedChange} />
            </td>
            <td>
                <button onClick={() => handleRemoveRow(rowIndex)}>{t("Delete")}</button>
            </td>
        </tr>
    );
};

export default TableRow;
