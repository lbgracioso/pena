import {useState} from "react";
import {RowData} from "../../types/types.ts";
import TableActions from "./TableActions.tsx";
import ManagerTable from "./ManagerTable.tsx";
import TableRow from "./TableRow.tsx";
import "../../css/Table.css"
import {useTranslation} from "react-i18next";

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
                        <th>{t("Book")}</th>
                        <th>{t("Author")}</th>
                        <th>{t("Publisher")}</th>
                        <th>{t("Genre")}</th>
                        <th>{t("Volume")}</th>
                        <th>{t("Read")}</th>
                        <th>{t("Actions")}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((row, rowIndex) => (
                        <TableRow key={rowIndex} row={row} rowIndex={rowIndex} authors={authors} publishers={publishers} genres={genres} setData={setData} data={data} />
                    ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default Table;
