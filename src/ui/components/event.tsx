import { ILayoutEvent } from "../../lib/definitions";
import { THEME } from "../theme";

const Event: React.FC<{ event: ILayoutEvent }> = ({ event }) => {
    return (
        <div
            style={{
                position: 'absolute',
                top: `${event.top}%`,
                left: `${event.left}%`,
                width: `${event.width}%`,
                height: `${event.height}%`,
                backgroundColor: THEME.event.backgroundColor,
                border: THEME.event.border,
                boxSizing: 'border-box',
                padding: THEME.event.padding,
                overflow: 'hidden',
            }}
        >
            <span >{event.startTime} - {event.endTime}</span>
        </div>
    );
};


export default Event;