import React from 'react';
import {Paper, TextField, MenuItem, Typography, withStyles } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { CustomButton } from './CustomButton';

type AddForm = {
    onSubmit: any,
    onClose: any,
};

type HandleChangeType = {
    target: {
        value: string,
    },
};

const priorityLevels = [
    { value: 0, label: '' },
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
];

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        width: '420px',
        boxShadow: 'none',
        padding: '16px',
    },

    title: {
        alignSelf: 'flex-start',
        marginBottom: '20px',
    },

    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },

    dense: {
        marginTop: 16,
    },

    menu: {
        width: 200,
        zIndex: 1600,
    },
}));

const FormTextField = withStyles({
    root: {
        borderRadius: '4px',
        margin: '0 0 20px 0',
    },
})(TextField);

const AddForm = ({ onSubmit, onClose }: AddForm) => {
    const classes = useStyles();

    const [values, setValues] = React.useState({
        name: '',
        description: '',
        priority: '',
        time: '',
    });

    const handleChange = (name : string) => (event: HandleChangeType) => {
        const value = name === 'time' ? event.target.value.replace(/[^0-9\.]+/g, '') : event.target.value;
        setValues({ ...values, [name]: value });
    };

    const onSubmitClick = () => {
        onSubmit(values);
        onClose();
    };

    return (
        <Paper className={classes.container}>
            <Typography className={classes.title} variant="h6">Add New Task</Typography>
            <FormTextField
                fullWidth
                id="name"
                label="Name"
                className={classes.textField}
                value={values.name}
                onChange={handleChange('name')}
                margin="normal"
                variant="filled"
                InputProps={{
                    disableUnderline: true,
                }}
            />
            <FormTextField
                fullWidth
                id="description"
                label="Description"
                className={classes.textField}
                value={values.description}
                onChange={handleChange('description')}
                margin="normal"
                variant="filled"
                InputProps={{
                    disableUnderline: true,
                }}
            />
            <FormTextField
                fullWidth
                id="priority"
                select
                label="Priority"
                className={classes.textField}
                value={values.priority}
                onChange={handleChange('priority')}
                SelectProps={{
                    MenuProps: {
                        className: classes.menu,
                    },
                }}
                margin="normal"
                variant="filled"
                InputProps={{
                    disableUnderline: true,
                }}
            >
                {priorityLevels.filter(option => option.value !== -1).map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </FormTextField>
            <FormTextField
                fullWidth
                id="time"
                label="Time to complete (in hours)"
                className={classes.textField}
                value={values.time}
                onChange={handleChange('time')}
                margin="normal"
                variant="filled"
                InputProps={{
                    disableUnderline: true,
                }}
            />
            <CustomButton
                onClick={onSubmitClick}
                text="Add Task"
                disabled={!(values && values.name && values.priority && values.time)}
            />
        </Paper>
    );
};

export { AddForm };
