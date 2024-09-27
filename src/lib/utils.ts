

export const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return (hours - 9) * 60 + minutes;
}

export interface IEvent {
    id: number,
    start: string,
    duration: number
}

export const eventsSortedByStartTime = (events: IEvent[]) => {
    return events.sort((a, b) => {
        const startA = timeToMinutes(a.start);
        const startB = timeToMinutes(b.start);
        return startA - startB;
    });
}

const calculateEventTimes = (events: IEvent[]) => {
    return events.map(event => ({
        ...event,
        startTime: timeToMinutes(event.start),
        endTime: timeToMinutes(event.start) + event.duration,
    }));
};

export const groupOverlappingEvents = (events: IEvent[]) => {
    const eventTimes = calculateEventTimes(events);
    const groups: IEvent[][] = [];

    for (let i = 0; i < eventTimes.length; i++) {
        const currentEvent = eventTimes[i];
        let group = [currentEvent];

        for (let j = i + 1; j < eventTimes.length; j++) {
            const nextEvent = eventTimes[j];


            if (currentEvent.endTime > nextEvent.startTime && currentEvent.startTime < nextEvent.endTime) {
                group.push(nextEvent);
            } else {
                break;
            }
        }
        console.log("🚀 ~ groupOverlappingEvents ~ group:", group)



        groups.push(group);
        i += group.length - 1;
    }

    return groups;
};