import { parse, format } from 'date-fns';

export const formatTime = (time: string) => {
    const parsedTime = parse(time, 'HH:mm', new Date());
    return format(parsedTime, 'hh:mm a');
};
