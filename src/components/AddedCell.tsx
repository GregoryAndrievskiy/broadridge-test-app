import React from 'react';

type RowType = {
    id: number,
    name: string,
    description: string,
    priority: number,
    added: string,
    expire: string,
    status: string,
};

type CellDataType = {
    data: {
        data: RowType,
    },
}

const AddedCell = ({ data }: CellDataType) => {
    const { added } = data.data;
    const date = new Date(added);

    return <span>{date.toLocaleDateString('en', { month: '2-digit', day: '2-digit', year: 'numeric' })}</span>;
};

export { AddedCell };
