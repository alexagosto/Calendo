import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

//TODO: Fix Select option styles (use native select for mobile users)
//TODO: Add validation to the form
//TODO: Update input sizes and styles

const modalVariants = {
    opening: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 500 },
  };

const days = Array.from({ length: 30 }, (_, index) => index + 1);
const months = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
}
const years = Array.from({ length: 10 }, (_, index) => index + 2024);
const hours = Array.from({ length: 24 }, (_, index) => index);

export default function CreateEventDialog({isOpen, day, month, year, from, to, handleDialogVisibility, handleCreateSubmit}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [newDate, setNewDate] = useState(0);
  const [newMonth, setNewMonth] = useState(0);
  const [newYear, setNewYear] = useState(0);
  const [newFrom, setNewFrom] = useState(0);
  const [newTo, setNewTo] = useState(0);
  const [newEvent, setNewEvent] = useState({title: '', description:'', day: 0, month: 0, year: 0, hour: 0 });

  if (!isOpen) {
    return null;
  }

  const handleCloseModal = () => {
    setTitle('');
    setDescription('');
    handleDialogVisibility(false);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleDayChange = (e) => {
    setNewDate(e.target.value);
  }

  const handleMonthChange = (e) => {
    setNewMonth(e.target.value);
  }

  const handleYearChange = (e) => {
    setNewYear(e.target.value);
  }

  const handleFromChange = (e) => {
    setNewFrom(e.target.value);
  }

  const handleToChange = (e) => {
    setNewTo(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setNewEvent({ title: title, description: description, day: newDate, month: newMonth, year: newYear, hour: newHour });
    handleCreateSubmit(newEvent);
  }

    return (
    <div className="fixed inset-0 z-30 flex items-end bg-gray-200 bg-opacity-75">
      <AnimatePresence>
        <motion.div
          initial="hidden"
          animate="opening"
          transition={{ duration: 0.5, ease: "easeOut" }}
          variants={modalVariants}
          exit={{ opacity: 0, y: 500 }}
          className="bg-white rounded-lg shadow-lg p-4 w-full h-3/4"
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                placeholder="Event Title"
                value={title}
                onChange={handleTitleChange}
                className="mt-1 block p-2 w-full rounded-md border-gray-300 shadow-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                placeholder="Event Description"
                value={description}
                onChange={handleDescriptionChange}
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Month
              </label>
              {/* Month */}
              <select
                id="date"
                value={newMonth}
                placeholder={month}
                onChange={handleMonthChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 "
              >
                {Object.keys(months).map((month) => (
                  <option key={month} value={month}>
                    {months[month]}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Day
              </label>
              {/* Day */}
              <select
                id="date"
                value={newDate}
                placeholder={day}
                onChange={handleDayChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {days.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Year
              </label>
              {/* Year */}
              <select
                id="date"
                placeholder={year}
                value={newYear}
                onChange={handleYearChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                From:
              </label>
              <select
                id="time"
                placeholder={from}
                value={newFrom}
                onChange={handleFromChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {hours.map((hour) => (
                  <option key={hour} value={hour}>
                    {`${hour}:00`}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                To:
              </label>
              <select
                id="time"
                placeholder={to}
                value={newTo}
                onChange={handleToChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {hours.map((hour) => (
                  <option key={hour} value={hour}>
                    {`${hour}:00`}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-between">
              <button onClick={() => handleCloseModal()} 
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
              >
                Close
              </button>
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                Create Event
              </button>
            </div>
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
    );
  }