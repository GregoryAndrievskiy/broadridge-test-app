import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import './App.css';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

import { data } from '../data';
import { getTasks, updateTasks, deleteTask } from '../api';

import { Grid } from './Grid';
import { AddTask } from "./AddTask";
import { TaskDetails } from "./TaskDetails";


const theme = createMuiTheme({
    zIndex: {
        modal: 1600,
    },

    palette: {
        primary: {
            light: '#3b79a3',
            main: '#0B588C',
            dark: '#073d62',
            contrastText: '#fff',
        },

        secondary: {
            light: '#f73378',
            main: '#f50057',
            dark: '#ab003c',
            contrastText: '#000',
        },
    },

    props: {
        MuiButtonBase: {
            disableRipple: true,
        },
    },
});

type RowType = {
    id: number,
    name: string,
    description: string,
    priority: number,
    added: string,
    expire: string,
    status: string,
};

type NewTaskType = {
    id: number,
    name: string,
    description: string,
    priority: number,
    added: string,
    time: number,
    status: string,
};

const App = () => {
    const [gridData, setGridData] = React.useState<RowType[]>([]);

    const history = useHistory();
    const location = useLocation();
    const locationId = location.pathname.substr(1);
    const id = parseInt(locationId, 10) || -1;

    const detailsData = gridData.find(item => item.id === id) || {
        id: -1,
        name: '',
        description: '',
        priority: 1,
        added: '',
        expire: '',
        status: 'active',
    };

    const onSelect = (id: number) => history.push(`/${id === -1 ? '' : id}`);

    const complete = (id: number) => {
        const completedTask = Object.assign({}, gridData.find((task) => task.id === id));
        completedTask.status = 'completed';
        return updateTasks(completedTask);
    };

    const onChange = (data?: RowType) => {
        if (data) {
            const { id, status } = data;

            if (status === 'active') {
                setGridData( complete(id));
            } else if (status === 'completed') {
                setGridData(deleteTask(id));
            }
        }
    };

    const addTask = (values: NewTaskType) => {
        const lastTask = gridData[gridData.length - 1];
        const clonedTask = Object.assign({}, lastTask);

        const now = new Date();

        const ms = now.getTime();
        const newTime = ms + values.time * 60 * 60 * 1000;
        const newDate = new Date(newTime);

        const newTask = {
            id: clonedTask.id + 1,
            name: values.name,
            description: values.description,
            priority: values.priority,
            added: now.toISOString(),
            expire: newDate.toISOString(),
            status: 'active',
        };

        setGridData(updateTasks(newTask));
    };

    const memoDataGrid = React.useMemo(() => (
        <Grid
            gridData={gridData}
            onSelect={onSelect}
            onChange={onChange}
            selectedTaskId={detailsData.id}
        />
    ), [gridData]);

    React.useEffect(() => {
        getTasks(setGridData);
    });

    return (
        <ThemeProvider theme={theme}>
            <AddTask onSubmit={addTask} />
            {memoDataGrid}
            <TaskDetails
                data={detailsData}
                onChange={onChange}
                onClose={() => onSelect(-1)}
            />
        </ThemeProvider>
    );
};

export { App };
