import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Paper, Typography, IconButton } from '@material-ui/core'

import { CustomButton } from './CustomButton';
import { CloseIcon } from './Icons';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        width: 'calc(100% - 120px)',
        position: 'absolute',
        bottom: 0,
        margin: '20px 40px',
        padding: '10px 20px',
        boxShadow: theme.shadows[20],
        borderRadius: '4px',
        minHeight: '280px',
        maxWidth: 'calc(1200px - 120px)',
    },

    dateClass: {
        display: 'inline-block',
        color: theme.palette.action.disabled,
        fontWeight: 'bold',
    },

    statusClass: {
        display: 'inline-block',
        textTransform: 'capitalize',
        color: theme.palette.common.white,
        backgroundColor: (p: classesType) => p.isCompleted ? '#4CAF50' : '#2096F3',
        margin: '0 18px',
        padding: '2px 8px',
        borderRadius: '2px',
        fontSize: '12px',
    },

    deleteButtonClass: {
        margin: '0 64px',
    },

    iconButtonClass: {
        position: 'absolute',
        right: 0,
        top: 0,
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

type TaskDetailsType = {
    data: RowType,
    onChange: (data: RowType) => void,
    onClose: () => void,
};

type classesType = {
    isCompleted: boolean,
}

const TaskDetails = ({ data, onChange, onClose }: TaskDetailsType) => {
    const showDetails = data.id !== -1;
    const taskDate = new Date(data.added).toLocaleDateString('en', { month: '2-digit', day: '2-digit', year: 'numeric' });
    const tasName = data.name;
    const taskDescription = data.description;
    const taskStatus = data.status;

    const isCompleted = taskStatus === 'completed';

    const {
        dateClass, statusClass, deleteButtonClass, iconButtonClass, ...classes
    } = useStyles({ isCompleted });

    return (showDetails ? (
        <Paper classes={classes}>
            <div>
                <div>
                    <Typography variant="subtitle1" className={dateClass}>{taskDate}</Typography>
                    <div className={statusClass}>{taskStatus}</div>
                </div>
                <Typography variant="h6">{tasName}</Typography>
                <Typography variant="subtitle2">{taskDescription}</Typography>
            </div>
            <div className={deleteButtonClass}>
                <CustomButton
                    text={isCompleted ? 'Remove' : 'Complete'}
                    onClick={() => onChange(data)}
                />
            </div>
            <IconButton onClick={onClose} className={iconButtonClass}>
                <CloseIcon />
            </IconButton>
        </Paper>
    ) : null);
};

export { TaskDetails };
