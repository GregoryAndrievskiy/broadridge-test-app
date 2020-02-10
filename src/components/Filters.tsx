import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Tabs, Tab } from '@material-ui/core';

type FiltersType = {
    filter: string,
    setFilter: (value: string) => void,
};

const useTabsStyles = makeStyles({
    indicator: {
        backgroundColor: '#1179AC',
    },
});

const useTabStyles = makeStyles({
    root: {
        color: '#8E8E8E',
        fontWeight: 'bold',
    },

    selected: {
        color: '#1179AC',
    },
});

const Filters = ({ filter, setFilter }: FiltersType) => {
    const tabsClasses = useTabsStyles();
    const tabClasses = useTabStyles();

    const onChange = (event: object, value: string) => setFilter(value);

    return (
        <>
            <Tabs
                value={filter}
                onChange={onChange}
                classes={tabsClasses}
                centered
            >
                <Tab
                    label="All"
                    value="all"
                    classes={tabClasses}
                />
                <Tab
                    label="Active"
                    value="active"
                    classes={tabClasses}
                />
                <Tab
                    label="Completed"
                    value="completed"
                    classes={tabClasses}
                />
            </Tabs>
        </>
    );
};

export { Filters };
