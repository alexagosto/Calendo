'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import CreateEventDialog from './createEventDialog';
import { FaUserGroup } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";

//TODO: Add the ability to add events to the calendar
    //
    //TODO: render multiple hour events
//TODO: Add the ability to view events on the calendar
//TODO: Add the ability to edit events on the calendar
//TODO: Add the ability to delete events on the calendar

//TODO: Add and smooth out calendar swiping animations
//TODO: Fix, more touch friendly navigation buttons
//TODO: Add the ability to navigate to a specific month
//TODO: Implement more touch controls for mobile users


export default function Calendar() {
  // State for the current date
  const [currentDate, setCurrentDate] = useState(new Date());
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [dateStyle, setDateStyle] = useState('hiddenRight');
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedHour, setSelectedHour] = useState(0);
  const [events, setEvents] = useState([]);

  // Function to navigate to the previous 3 days
  const goToPreviousThreeDays = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 3));
    setDateStyle('hiddenLeft');
  };

  // Function to navigate to the next 3 days
  const goToNextThreeDays = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 3));
    setDateStyle('hiddenRight');
  };

  // Function to handle the cell selection
  const handleCellSelection = (day, month, year, hour) => {
    setSelectedDate(day);
    setSelectedMonth(month);
    setSelectedYear(year);
    setSelectedHour(hour);
    setCreateDialogOpen(true);
    console.log("Selected cell:", selectedDate, selectedMonth, selectedYear, selectedHour);
  };

  // Function to handle the visibility of the create event dialog
  const handleDialogVisibility = (isOpen) => {
    setCreateDialogOpen(isOpen);
  }

  // Function to handle submitting the create event form
  const handleCreateSubmit = ( newEvent) => {
    console.log(newEvent);
    // Add the event to the events array
    setEvents([...events, newEvent]);

    // Close the dialog
    setCreateDialogOpen(false);
  }
  
  // Define animation variants
  const animationVariant = {
    hiddenRight: { x: '200%', opacity: 0 },
    hiddenLeft: { x: '-200%', opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  // Render the calendar
  return (
    <div className="w-full h-max bg-white rounded-lg shadow-md">
      {/* Header with navigation buttons */}
      <div className="bg-blue-500 py-4 px-6 sticky top-0 flex justify-between items-center z-10 border-blue-500 border-b">
        <button onClick={goToPreviousThreeDays} className="text-white">&lt;</button>
        <h2 className="text-xl font-bold text-white">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric'})}</h2>
        <button onClick={goToNextThreeDays} className="text-white">&gt;</button>
      </div>

      {/* Table for the calendar */}
      <motion.table
        key={currentDate.toISOString()}
        initial={dateStyle}
        animate="visible"
        variants={animationVariant}
        transition={{ duration: 0.2, ease: "easeOut"}} 
        className="w-full relative border-collapse"
      >
        <thead className='sticky top-[60px] border border-gray-100 z-20'>
          <tr>
            <th className='bg-gray-100'></th> {/* Empty cell at top left */}
            {[0, 1, 2].map((index) => {
              const day = new Date(currentDate);
              day.setDate(day.getDate() + index); // Calculate the date for each day
              return (
                <th key={index} className="bg-gray-100 border text-center p-4">
                  <div className="text-gray-700 font-semibold">{day.toString().split(' ')[0]}</div>
                  <div className="text-lg font-bold mt-2">{day.getDate()}</div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
            <tr key={hour}>
              <td className="bg-gray-100 text-center px-4 pb-4 w-4 border">
                <div className="text-gray-700 font-semibold">{hour}:00</div>
              </td>
              {[0, 1, 2].map((index) => (
                <td 
                key={`${currentDate.getDate() + index}-${currentDate.getMonth()+1}-${currentDate.getFullYear()}-${hour}`} 
                className="border text-center relative"
                onClick={() => handleCellSelection(currentDate.getDate() + index, currentDate.getMonth()+1, currentDate.getFullYear(), hour)}
                >
                  {/* Each cell key is day-month-year-time */}
                  {events.map((event) => {
                    if (
                      event.day === currentDate.getDate() + index &&
                      event.month === currentDate.getMonth()+1 &&
                      event.year === currentDate.getFullYear() &&
                      event.from === hour
                  ) {
                    // Calculate the width of the event div based on the duration
                      const eventHeight = `${(event.to - event.from) * 100}%`;
                      return (
                        <div 
                        key={event.title} 
                        className="absolute flex flex-col top-0 left-1 bg-orange-300 text-white p-1 rounded-lg w-[90%] text-start"
                        style={{ height: eventHeight }}
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("Event clicked:", event);
                          handleEventEdit(event);
                        }}
                        >
                          <div className="flex flex-row font-bold">
                          {event.group != 'none' ? <FaUserGroup /> : <FaUser />}
                          </div>
                          <div className='overflow-hidden'>{event.title}</div>
                        </div>
                      );
                    }
                  }
                  )}
                  
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </motion.table>
        <CreateEventDialog 
          day={selectedDate} 
          month={selectedMonth} 
          year={selectedYear} 
          from={selectedHour}
          to={selectedHour + 1}
          isOpen={createDialogOpen}
          handleDialogVisibility={handleDialogVisibility}
          handleCreateSubmit={handleCreateSubmit}
        /> 
    </div>
  );
}

