import { CALENDAR_START, TOTAL_MINUTES } from "./constants";
import { ILayoutEvent } from "./definitions";

export const parseTime = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return (hours * 60 + minutes - CALENDAR_START * 60) / TOTAL_MINUTES * 100;
};

export const isAnOverlap = (a: ILayoutEvent, b: ILayoutEvent) => {
    return a.end > b.start && a.start < b.end;
};

export function calculateEndTime(start: string, duration: number): string {
    const [startHours, startMinutes] = start.split(':').map(Number);
    const startInMinutes = startHours * 60 + startMinutes;
    const endInMinutes = startInMinutes + duration;
    const endHours = Math.floor(endInMinutes / 60) % 24;
    const endMinutes = endInMinutes % 60;
    return `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
}