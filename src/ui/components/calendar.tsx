import React from "react";
import { IEvent, ILayoutEvent } from "../../lib/definitions";
import { CONTAINER_WIDTH, DEFAULT_LEFT_OFFSET, TOTAL_MINUTES } from "../../lib/constants";
import { calculateEndTime, isAnOverlap, parseTime } from "../../lib/utils";
import Event from "./event";

const Calendar: React.FC<{ events: IEvent[] }> = ({ events }) => {
    const layoutEvents = React.useMemo(() => {
        // Convert events to ILayoutEvent format for processing
        const convertedEvents: ILayoutEvent[] = events.map(event => ({
            id: event.id,
            startTime: event.start,
            endTime: calculateEndTime(event.start, event.duration),
            start: parseTime(event.start),
            end: parseTime(event.start) + (event.duration / TOTAL_MINUTES * 100),
            duration: event.duration,
            top: 0,
            left: 0,
            width: 0,
            height: 0,
        }));

        const layOutDay = (events: ILayoutEvent[]): ILayoutEvent[] => {
            let columns: ILayoutEvent[][] = [];  // Store events in columns
            let previousHighestEndValue: number | null = null;  // Track the latest end time
            let result: ILayoutEvent[] = [];  // Store the final result

            // Sort events by start time, then by end time
            events.sort((a, b) => a.start - b.start || b.end - a.end);

            // Internal function to calculate final positions of events
            const renderEvents = (columns: ILayoutEvent[][]) => {
                let left = 0;
                let width = CONTAINER_WIDTH;
                const n = columns.length;

                columns.forEach((column, i) => {
                    left = (i / n) * CONTAINER_WIDTH + DEFAULT_LEFT_OFFSET;
                    column.forEach((event) => {
                        event.height = event.end - event.start;
                        event.top = event.start;
                        event.left = left;
                        event.width = width / n;
                    });
                });

                // Add positioned events to the final result
                result = result.concat(...columns);
            };

            // Process each event for placement
            events.forEach((e) => {
                let isInserted = false;

                // If current event starts after the end of the previous group,
                // render the previous group and start a new group
                if (previousHighestEndValue !== null && e.start >= previousHighestEndValue) {
                    renderEvents(columns);
                    columns = [];
                    previousHighestEndValue = null;
                }

                // Look for an existing column to place the event
                for (let i = 0; i < columns.length; i++) {
                    const lastEventInCurrentColumn = columns[i][columns[i].length - 1]
                    if (!isAnOverlap(lastEventInCurrentColumn, e)) {
                        columns[i].push(e);
                        isInserted = true;
                        break;
                    }
                }

                // If no existing column fits, create a new column
                if (!isInserted) {
                    columns.push([e]);
                }

                // Update the latest end time if necessary
                if (previousHighestEndValue === null || e.end > previousHighestEndValue) {
                    previousHighestEndValue = e.end;
                }
            });

            // Process any remaining events
            if (columns.length) {
                renderEvents(columns);
            }

            return result;
        };

        return layOutDay(convertedEvents);
    }, [events]);

    return (
        <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
            {layoutEvents.map((event) => (
                <Event key={event.id} event={event} />
            ))}
        </div>
    );
};

export default Calendar;