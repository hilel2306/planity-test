import React from 'react';
import Calendar from './ui/components/calendar';
import events from './data/input.json'


const App: React.FC = () => {

  return (

    <Calendar events={events} />
  );
};

export default App;