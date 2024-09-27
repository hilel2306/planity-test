
import './App.css';
import events from './input.json'
import { eventsSortedByStartTime, groupOverlappingEvents, IEvent } from './lib/utils';

const CALENDAR_START = 9; // 09:00 AM
const CALENDAR_END = 21; // 09:00 PM
const TOTAL_MINUTES = (CALENDAR_END - CALENDAR_START) * 60;

const parseTime = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes - CALENDAR_START * 60;
};

type EventProps = {
  event: IEvent
  height: number
  width: number
  left: number
  top: number
}

const Event = ({ event, height, width, left, top }: EventProps) => {
  return (
    <div
      key={event.id}
      style={{
        backgroundColor: 'lightblue',
        border: '1px solid blue',
        position: 'absolute',
        height: `${height}%`,
        width: `${width}%`,
        left: `${left}%`,
        top: `${top}%`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <span >{event.id}</span>
      <span style={{ margin: 6 }}>{event.start}</span>
      <span>{`${event.duration} min`}</span>
    </div>
  )
}


function App() {
  const sortedEvents = eventsSortedByStartTime(events)
  const overlapsEvents = groupOverlappingEvents(sortedEvents)

  return (
    <div className="App" style={{ position: 'relative', height: '100vh', width: '100%' }}>
      {overlapsEvents.map((group, index) => {
        return group.map((element, idx) => {
          const height = (element.duration / TOTAL_MINUTES) * 100
          const width = (100 / group.length)
          const left = (idx / group.length) * 100
          const top = (parseTime(element.start) / TOTAL_MINUTES) * 100;
          return (
            <Event key={element.id} event={element} height={height} width={width} left={left} top={top} />
          )
        })
      })}

    </div>
  );
}

export default App;
