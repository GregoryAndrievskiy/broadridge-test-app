import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Button } from '@material-ui/core';

type RowType = {
    id: number,
    name: string,
    description: string,
    priority: number,
    added: string,
    expire: string,
    status: string,
};

type ActionButtonType = {
    data: RowType,
    onClick: (event: any) => void,
};

const useStyles = makeStyles({
    root: {
        padding: 0,
    },

    label: {
        fontSize: '12px',
        lineHeight: '32px',
        fontWeight: 'bold',
    },
});

const TableActionButton = ({ data, onClick }: ActionButtonType) => {
    const classes = useStyles();
    const text = data.status === 'active' ? 'Complete' : 'Delete';

    return (
        <Button
            color="primary"
            size="small"
            classes={classes}
            onClick={() => onClick(data)}
            fullWidth
        >
            {text}
        </Button>
    );
};

export { TableActionButton };
