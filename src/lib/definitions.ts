export interface IEvent {
    id: number;
    start: string;
    duration: number;
}

export interface ILayoutEvent {
    id: number;
    startTime: string,
    endTime: string,
    start: number;
    end: number;
    duration: number;
    top: number;
    left: number;
    width: number;
    height: number;
}