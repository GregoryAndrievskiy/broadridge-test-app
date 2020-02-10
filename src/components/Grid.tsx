import React from 'react';
import './App.css';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

import makeStyles from "@material-ui/core/styles/makeStyles";
import { Paper } from '@material-ui/core';
import DataGrid, { Scrolling, Column } from 'devextreme-react/data-grid';

import { Filters } from './Filters';
import { StatusCell } from './StatusCell';
import { TableActionButton } from './TableActionButton';
import { AddedCell } from './AddedCell';
import { TimerCell } from './TimerCell';

const useStyles = makeStyles(theme => ({
    root: {
        boxShadow: theme.shadows[6],
        margin: '0 20px',
        borderRadius: '4px 4px 0 0',
    },
}));

type RowType = {
    id: number,
    name: string,
    description: string,
    priority: number,
    added: string,
    expire: string,
    status: string,
};

type GridType = {
    gridData: RowType[],
    onSelect: (id: number) => void,
    onChange: (data?: RowType) => void,
    selectedTaskId: number,
};

type CellType = {
    columnIndex?: number,
    data?: RowType,
};

type SelectionType = {
    selectedRowsData?: RowType[],
};

type DataType = {
    data: {
        data: RowType,
    },
};

const Grid = (
    {
        gridData,
        onSelect,
        onChange,
        selectedTaskId,
    }: GridType
) => {
    const [firstRender, setFirstRender] = React.useState(true);
    const [filter, setFilter] = React.useState('all');

    const classes = useStyles();

    const onCellClick = ({ columnIndex, data }: CellType) => {
        if (columnIndex === 5) {
            onChange(data);
        }
    };

    const sortByTimeLeft = (rowData: RowType) => {
        const { expire } = rowData;

        const currentDate = new Date().getTime();
        const expireDate = new Date(expire).getTime();

        return (expireDate - currentDate);
    };

    const onSelectionChanged = ({ selectedRowsData }: SelectionType) => {
        setFirstRender(false);
        if (selectedRowsData && selectedRowsData[0]) {
            const data = selectedRowsData[0];
            const selectId = data && data.id ? data.id : -1;
            onSelect(selectId);
        }
    };

    const ClickableActionButton = ({ data: cellData }: DataType) =>  <TableActionButton data={cellData.data} onClick={onChange} />;

    const filteredData = filter === 'all' ? gridData : gridData.filter(item => item.status === filter);

    const selectionProps = firstRender ? { selectedRowKeys: [selectedTaskId] } : {};

    return (
        <Paper classes={classes} >
            <Filters filter={filter} setFilter={setFilter} />
            <DataGrid
                elementAttr={{ id: 'gridContainer' }}
                dataSource={filteredData}
                selection={{ mode: 'single' }}
                showRowLines={true}
                hoverStateEnabled={true}
                keyExpr="id"
                onSelectionChanged={onSelectionChanged}
                onCellClick={onCellClick}
                {...selectionProps}
            >
                <Scrolling
                    mode="virtual"
                />
                <Column
                    caption="Name"
                    dataField="name"
                />
                <Column
                    caption="Priority"
                    dataField="priority"
                    width={72}
                    alignment="center"
                />
                <Column
                    caption="Added"
                    dataField="added"
                    width={104}
                    alignment="center"
                    cellComponent={AddedCell}
                />
                <Column
                    caption="Time to complete"
                    dataField="expire"
                    width={124}
                    alignment="center"
                    cellComponent={TimerCell}
                    calculateSortValue={sortByTimeLeft}
                />
                <Column
                    caption="Status"
                    dataField="status"
                    width={110}
                    alignment="center"
                    cellComponent={StatusCell}
                />
                <Column
                    caption="Action"
                    type="button"
                    dataField="Status"
                    width={104}
                    alignment="center"
                    cellComponent={ClickableActionButton}
                    cssClass="action"
                />
            </DataGrid>
        </Paper>
    );
};

export { Grid };
