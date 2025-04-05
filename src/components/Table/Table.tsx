import {useState} from "react";
import {RowData} from "../../types/types.ts";
import TableActions from "./TableActions.tsx";
import ManagerTable from "./ManagerTable.tsx";
import TableRow from "./TableRow.tsx";
import "../../css/Table.css"
import {useTranslation} from "react-i18next";
import { FaFilter, FaSortUp, FaSortDown } from "react-icons/fa";

const Table = () => {
    const [data, setData] = useState<RowData[]>([
        {book: "Um livro qualquer", author: "lbgracioso", publisher: "Pena", genre: "Exemplo", volume: "1", read: false}
    ]);

    const { t } = useTranslation()
    const [authors, setAuthors] = useState<string[]>(["Example"]);
    const [publishers, setPublishers] = useState<string[]>(["Example"]);
    const [genres, setGenres] = useState<string[]>(["Example"]);
    const [isVisible, setIsVisible] = useState(false);

    const handleAddRow = () => {
        setData([...data, {
            book: "",
            author: authors[0] || "",
            publisher: publishers[0] || "",
            genre: genres[0] || "",
            volume: "",
            read: false
        }]);
    };

    const [filters] = useState<Record<keyof RowData, string>>({
        book: "",
        author: "",
        publisher: "",
        genre: "",
        volume: "",
        read: "all", // "all", "read", "unread"
    });

    const [sortConfig, setSortConfig] = useState<{ key: keyof RowData, direction: "asc" | "desc" } | null>(null);

    const filteredData = data.filter((row) => {
        const matchesBook = !filters.book || row.book === filters.book;
        const matchesVolume = !filters.volume || row.volume === filters.volume;
        const matchesAuthor = !filters.author || row.author === filters.author;
        const matchesPublisher = !filters.publisher || row.publisher === filters.publisher;
        const matchesGenre = !filters.genre || row.genre === filters.genre;
        const matchesRead =
            filters.read === "all" ||
            (filters.read === "read" && row.read) ||
            (filters.read === "unread" && !row.read);

        return matchesBook && matchesVolume && matchesAuthor && matchesPublisher && matchesGenre && matchesRead;
    });


    const sortedData = [...filteredData].sort((a, b) => {
        if (!sortConfig) return 0;
        const { key, direction } = sortConfig;

        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
    });

    const handleSort = (key: keyof RowData) => {
        setSortConfig(prev => {
            if (prev?.key === key) {
                return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
            }
            return { key, direction: "asc" };
        });
    };

    const tableKeys: (keyof RowData)[] = ["book", "author", "publisher", "genre", "volume", "read"];
    const renderHeader = (key: keyof RowData) => {
        const label = t(key.charAt(0).toUpperCase() + key.slice(1));
        const showFilter = key === "read" ? filters[key] !== "all" : Boolean(filters[key]);
        const isSorted = sortConfig?.key === key;
        const sortIcon = isSorted ? (
            sortConfig.direction === "asc" ? (
                <FaSortUp className="filter-icon" />
            ) : (
                <FaSortDown className="filter-icon" />
            )
        ) : null;

        return (
            <th key={key} onClick={() => handleSort(key)}>
                {label}
                {showFilter && <FaFilter className="filter-icon" />}
                {sortIcon}
            </th>
        );
    };

    return (
        <>
            <TableActions
                onAddRow={handleAddRow}
                setIsVisible={setIsVisible}
                data={data}
                authors={authors}
                publishers={publishers}
                genres={genres}
                setData={setData}
                setAuthors={setAuthors}
                setPublishers={setPublishers}
                setGenres={setGenres}
            />
            <ManagerTable isVisible={isVisible} authors={authors} publishers={publishers} genres={genres} setAuthors={setAuthors} setPublishers={setPublishers} setGenres={setGenres} />
            {!isVisible && (
                <table className="table">
                    <thead>
                    <tr>
                        {tableKeys.map((key) => renderHeader(key))}
                        <th>{t("Actions")}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sortedData.map((row, rowIndex) => (
                        <TableRow
                            key={rowIndex}
                            row={row}
                            rowIndex={rowIndex}
                            authors={authors}
                            publishers={publishers}
                            genres={genres}
                            setData={setData}
                            data={data}
                        />
                    ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default Table;
