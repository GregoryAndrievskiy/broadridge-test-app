import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Typography } from '@material-ui/core';

type classesType = {
    isCompleted: boolean,
}

type TableStatusType = {
    data: {
        value: string,
    },
};

const useStyles = makeStyles(theme => ({
    root: {
        fontSize: '14px',
        lineHeight: '24px',
        borderRadius: '2px',
        color: theme.palette.common.white,
        textTransform: 'capitalize',
        backgroundColor: (p: classesType) => p.isCompleted ? '#4CAF50' : '#2096F3',
    },
}));

const StatusCell = ({ data }: TableStatusType) => {
    const text = data.value;
    const isCompleted = text === 'completed';

    const classes = useStyles({ isCompleted });

    return (
        <Typography classes={classes}>
            {text}
        </Typography>
    );
};

export { StatusCell };
