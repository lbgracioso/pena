import React, { useState } from "react";

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
                    <th>Tipo</th>
                    <th>Nome</th>
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                {[...authors.map(a => ({ type: "author", name: a })),
                    ...publishers.map(p => ({ type: "publisher", name: p })),
                    ...genres.map(g => ({ type: "genre", name: g }))]
                    .map((item, index) => (
                        <tr key={index}>
                            <td>{item.type}</td>
                            <td>{item.name}</td>
                            <td>
                                <button onClick={() => handleRemoveManagerEntry(item.type, item.name)}>Remover</button>
                            </td>
                        </tr>
                    ))}
                <tr>
                    <td>
                        <select value={newManagerEntry.type} onChange={(e) => setNewManagerEntry({ ...newManagerEntry, type: e.target.value })}>
                            <option value="">Selecione</option>
                            <option value="author">Autor</option>
                            <option value="publisher">Editora</option>
                            <option value="genre">Gênero</option>
                        </select>
                    </td>
                    <td>
                        <input type="text" value={newManagerEntry.name} onChange={(e) => setNewManagerEntry({ ...newManagerEntry, name: e.target.value })} />
                    </td>
                    <td>
                        <button onClick={handleAddManagerEntry}>Adicionar</button>
                    </td>
                </tr>
                </tbody>
            </table>
        )
    );
};

export default ManagerTable;
