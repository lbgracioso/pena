import './css/Table.css';
import {useRef, useState} from "react";

function Table() {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    type RowData = Record<string, string | number | boolean>;

    type EditCell = {
        row: number;
        column: keyof RowData;
    } | null;

    const [data, setData] = useState<RowData[]>([
        {
            livro: "Um livro qualquer",
            autor: "lbgracioso",
            editora: "Pena",
            genero: "Exemplo",
            volume: "1",
            lido: false,
        }
    ]);

    const [editCell, setEditCell] = useState<EditCell>(null);
    const handleEdit = (rowIndex: number, column: keyof RowData, value: string) => {
        const newData = [...data];
        newData[rowIndex][column] = value;
        setData(newData);
    };

    const handleAddRow = () => {
        const newRow = {
            livro: "",
            autor: "",
            editora: "",
            genero: "",
            volume: "",
            lido: false,
        }

        setData([...data, newRow]);
    }

    const handleReadedChange = (rowIndex: number) => {
        const newData = [...data];
        newData[rowIndex].lido = !newData[rowIndex].lido;
        setData(newData);
    };

    const handleRemoveRow = (rowIndex: number) => {
        const newData = data.filter((_, index) =>  index != rowIndex);
        setData(newData);
    }

    const handleSave = () => {
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], {type: 'application/json'});
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'library.json';
        link.click();
    }

    const handleLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            try {
                const loadedData = JSON.parse(reader.result as string);
                setData(loadedData);
            } catch (error) {
                console.error("Erro ao carregar o arquivo JSON", error);
                alert("O arquivo não está no formato JSON válido.");
            }
        };
        reader.readAsText(file);

        if (fileInputRef.current) {
            fileInputRef.current.value = '';  // Limpa o campo de arquivo
        }
    }

    return (
        <>
            <div className="manager">
                <button onClick={handleAddRow}>Adicionar linha</button>
                <button onClick={handleSave}>Salvar</button>
                <label htmlFor="file-input" className="file-label">Carregar arquivo</label>
                <input
                    id="file-input"
                    type="file"
                    accept=".json"
                    ref={fileInputRef}
                    onChange={handleLoad}
                />
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th>Livro</th>
                    <th>Autor</th>
                    <th>Editora</th>
                    <th>Gênero</th>
                    <th>Volume</th>
                    <th>Lido</th>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {Object.keys(row).map((column, colIndex) => (
                            <td key={colIndex}
                                onClick={() => {
                                    if (column !== "lido") {
                                        setEditCell({ row: rowIndex, column: column as keyof RowData });
                                    }
                                }}
                            >
                                {editCell && editCell.row === rowIndex && editCell.column === column ? (
                                    <input
                                        type="text"
                                        value={row[column]}
                                        autoFocus
                                        onBlur={() => setEditCell(null)} // Save if lose focus
                                        onChange={(e) => handleEdit(rowIndex, column, e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") setEditCell(null); // Save if press Enter
                                        }}/>
                                ) : column ===  'lido' ? (
                                    <input
                                        type="checkbox"
                                        checked={row[column] as boolean}
                                        onChange={() => handleReadedChange(rowIndex)}
                                    />
                                ) : (
                                    row[column]
                                )}
                            </td>
                        ))}
                        <td>
                            <button
                                onClick={() => handleRemoveRow(rowIndex)}
                                className="remove-row-btn">Remover</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}

export default Table;
