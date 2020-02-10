import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Paper, Typography, Fab, Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { AddForm } from './AddForm';
import { PlusIcon, CloseIcon } from './Icons';

type NewTaskType = {
    id: number,
    name: string,
    description: string,
    priority: number,
    added: string,
    time: number,
    status: string,
};

type ActionButtonType = {
    onSubmit: (values: NewTaskType) => void,
};

const useStyles = makeStyles({
    root: {
        height: '74px',
        backgroundColor: 'transparent',
        boxShadow: 'none',
        display: 'flex',
        alignItems: 'center',
        padding: '0 40px',
        fontSize: '24px',
    },
});

const useFabStyles = makeStyles({
    root: {
        margin: '0 20px',
    },
});

const LightTooltip = withStyles(theme => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        boxShadow: theme.shadows[10],
        maxWidth: 'max-content',
        padding: 0,
    },

    arrow: {
        color: theme.palette.common.white,
    },
}))(Tooltip);

const AddTask = ({ onSubmit }: ActionButtonType) => {
    const [open, setOpen] = React.useState(false);

    const classes = useStyles();
    const fabClasses = useFabStyles();

    const handleClose = () => setOpen(false);

    return (
        <Paper classes={classes}>
            <Typography variant="h6">Tasks</Typography>
            <LightTooltip
                interactive
                open={open}
                title={<AddForm onSubmit={onSubmit} onClose={handleClose} />}
                placement="right-start"
                arrow
            >
                <Fab
                    size="small"
                    classes={fabClasses}
                    onClick={() => setOpen(!open)}
                    color="primary"
                >
                    {open ? <CloseIcon /> : <PlusIcon />}
                </Fab>
            </LightTooltip>
        </Paper>
    );
};

export { AddTask };
