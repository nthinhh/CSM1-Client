class RowService {
    columns;
    nameOfId;

    constructor(columns, nameOfId)
    {
        this.columns = columns;
        this.nameOfId = nameOfId;
    }

    getModel = () => {
        let model = {};
        for (let i in this.columns) model[this.columns[i].field] = "";
        return model;
    };

    convertCurrentRow = (currentRow) => {
        let row = {};
        for (let i in currentRow) {
            for (let j in this.getModel()) {
                if (currentRow[i][j] !== undefined)
                    row[j] = currentRow[i][j].value;
            }
        }
        return row;
    };

    convertRow = (row, isOpen) => {
        let newRow = {};
        newRow[row[this.nameOfId]] = {};
        for (let i in row) {
            newRow[row[this.nameOfId]][i] = {};
            newRow[row[this.nameOfId]][i].value = row[i];
        }
        if (isOpen) newRow[row[this.nameOfId]].toolbar = { value: undefined };
        return newRow;
    };
}

export default RowService;