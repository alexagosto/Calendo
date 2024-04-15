import React, { useState, useCallback, useMemo } from 'react';
import './App.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import events from './Data/events';

const localizer = momentLocalizer(moment);

function App() {
    const [myEvents, setEvents] = useState(events);

    const handleSelectSlot = useCallback(
        ({ start, end }) => {
            const title = window.prompt('New Event name');
            if (title) {
                setEvents(prev => [...prev, { start, end, title }]);
            }
        },
        [setEvents]
    );

    const handleSelectEvent = useCallback(
        event => window.alert(event.title),
        []
    );


    return (
        <div className="app">
            <header className="header">
                <div className="menu-icon">☰</div>
                <div className="icons">
                    <div className="notification-icon">🔔</div>
                    <div className="profile-icon">👤</div>
                </div>
            </header>
            <main className="main">
                <div className="calendar">
                    <Calendar
                        localizer={localizer}
                        events={myEvents}
                        startAccessor="start"
                        endAccessor="end"
                        defaultView="work_week"
                        views={['work_week']}
                        style={{ height: 800 }}
                        toolbar={false}
                        onSelectEvent={handleSelectEvent}
                        onSelectSlot={handleSelectSlot}
                        selectable
                    />
                </div>
            </main>
        </div>
    );
}

export default App;
