import React, { useState } from "react";
import {useTranslation} from "react-i18next";

interface ManagerTableProps {
    isVisible: boolean;
    authors: string[];
    publishers: string[];
    genres: string[];
    setAuthors: React.Dispatch<React.SetStateAction<string[]>>;
    setPublishers: React.Dispatch<React.SetStateAction<string[]>>;
    setGenres: React.Dispatch<React.SetStateAction<string[]>>;
}

const ManagerTable: React.FC<ManagerTableProps> = ({ isVisible, authors, publishers, genres, setAuthors, setPublishers, setGenres }) => {
    const [newManagerEntry, setNewManagerEntry] = useState({ type: "", name: "" });

    const {t} = useTranslation();
    const handleAddManagerEntry = () => {
        if (!newManagerEntry.name.trim()) return;

        switch (newManagerEntry.type) {
            case "author":
                setAuthors([...authors, newManagerEntry.name]);
                break;
            case "publisher":
                setPublishers([...publishers, newManagerEntry.name]);
                break;
            case "genre":
                setGenres([...genres, newManagerEntry.name]);
                break;
        }
        setNewManagerEntry({ type: "", name: "" });
    };

    const handleRemoveManagerEntry = (type: string, name: string) => {
        if (type === "author") setAuthors(authors.filter(a => a !== name));
        if (type === "publisher") setPublishers(publishers.filter(p => p !== name));
        if (type === "genre") setGenres(genres.filter(g => g !== name));
    };

    return (
        isVisible && (
            <table className="table">
                <thead>
                <tr>
                    <th>{t("Type")}</th>
                    <th>{t("Name")}</th>
                    <th>{t("Actions")}</th>
                </tr>
                </thead>
                <tbody>
                {[...authors.map(a => ({ type: t("Author"), name: a })),
                    ...publishers.map(p => ({ type: t("Publisher"), name: p })),
                    ...genres.map(g => ({ type: t("Genre"), name: g }))]
                    .map((item, index) => (
                        <tr key={index}>
                            <td>{item.type}</td>
                            <td>{item.name}</td>
                            <td>
                                <button onClick={() => handleRemoveManagerEntry(item.type, item.name)}>{t("Delete")}</button>
                            </td>
                        </tr>
                    ))}
                <tr>
                    <td>
                        <select value={newManagerEntry.type} onChange={(e) => setNewManagerEntry({ ...newManagerEntry, type: e.target.value })}>
                            <option value="">{t("Select")}</option>
                            <option value="author">{t("Author")}</option>
                            <option value="publisher">{t("Publisher")}</option>
                            <option value="genre">{t("Genre")}</option>
                        </select>
                    </td>
                    <td>
                        <input type="text" value={newManagerEntry.name} onChange={(e) => setNewManagerEntry({ ...newManagerEntry, name: e.target.value })} />
                    </td>
                    <td>
                        <button onClick={handleAddManagerEntry}>{t("Add")}</button>
                    </td>
                </tr>
                </tbody>
            </table>
        )
    );
};

export default ManagerTable;
