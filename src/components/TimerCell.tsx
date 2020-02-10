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

const TimerCell = ({ data }: CellDataType) => {
    const { expire } = data.data;

    const expireDate = new Date(expire).getTime();
    const currentDate = new Date().getTime();

    const left = expireDate - currentDate;

    const [timeLeft, setTimeLeft] = React.useState(left > 0 ? left : 0);

    let inSeconds = Math.round(timeLeft / 1000);

    const hoursCut = Math.round(inSeconds % (3600));
    let hours = Math.round((inSeconds - hoursCut) / (3600));

    inSeconds -= hours * 3600;

    if (inSeconds < 0) {
        inSeconds += 3600;
        hours = hours > 0 ? hours - 1 : 0;
    }

    const hoursString = hours.toString().padStart(2, '0');

    const minutesCut =  Math.round((inSeconds / 60) % 60);
    let minutes =  Math.round((inSeconds - minutesCut) / 60);

    inSeconds -= minutes * 60;

    if (inSeconds < 0) {
        inSeconds += 60;
        minutes = minutes > 0 ? minutes - 1 : 0;
    }

    const minutesString = minutes.toString().padStart(2, '0');

    const secondsString =  inSeconds.toString().padStart(2, '0');

    const timerString = `${hoursString}:${minutesString}:${secondsString}`;

    React.useEffect(() => {
        if (timeLeft === 0) return;

        const intervalId = setInterval(() => {
            const updateTime = timeLeft > 1000 ? timeLeft - 1000 : 0;
            setTimeLeft(updateTime);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft]);

    return <span>{timerString}</span>;
};

export { TimerCell };
