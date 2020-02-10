import { data } from './data';

type RowType = {
    id: number,
    name: string,
    description: string,
    priority: number,
    added: string,
    expire: string,
    status: string,
};

const cloneData = (data: RowType[]) => data.reduce((acc, task) => Object.assign([], [...acc, Object.assign({}, task)]), []);

let storedData: RowType[] = cloneData(data);

const getTasks = (setGridData: (data: RowType[]) => void) => {
    setGridData(storedData);
};

const updateTasks = (userTask: RowType) => {
    const index = storedData.findIndex((task: RowType) => task.id === userTask.id);

    storedData = cloneData(storedData);

    if (index === -1) {
        storedData = [...storedData, userTask];
    } else {
        storedData[index] = { ...userTask };
    }

    return storedData;
};

const deleteTask = (id: number) => {
    storedData = cloneData(storedData.filter(item => item.id !== id));
    return storedData;
};

export { getTasks, updateTasks, deleteTask };
