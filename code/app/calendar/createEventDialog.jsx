import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

//TODO: Add more validation to the form

const modalVariants = {
    opening: { opacity: 1, y: '0%' },
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
  const [newDate, setNewDate] = useState(day);
  const [newMonth, setNewMonth] = useState(month);
  const [newYear, setNewYear] = useState(year);
  const [newFrom, setNewFrom] = useState(from);
  const [newTo, setNewTo] = useState(to);
  const [newGroup, setNewGroup] = useState('none');

  // Log the state of the dialog for development purposes
  // TODO: Remove this useEffect hook
  useEffect(() => {
    if (isOpen) {
      setNewDate(day);
      setNewMonth(month);
      setNewYear(year);
      setNewFrom(from);
      setNewTo(to);
    }
    console.log("createEventDialog useEffect activated!");
  }, [isOpen, day, month, year, from, to]);

  if (!isOpen) {
    return null;
  }

  const handleCloseModal = () => {
    setTitle('');
    setDescription('');
    setNewGroup('none');
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

  const handleGroupChange = (e) => {
    setNewGroup(e.target.value);
  }

  const handleSubmit = (e) => {
    if (!isOpen) {
      return; // Prevent form submission if the dialog is closed
    }
    e.preventDefault();
    if (!title) {
      alert("Please add a title!");
      return;
    }
    let event = { title: title, description: description, day: newDate, month: newMonth, year: newYear, from: newFrom, to: newTo, group: newGroup};
    handleCreateSubmit(event);
    handleCloseModal();
  }

    return (
    <div className="fixed inset-0 z-30 flex items-end bg-gray-200 bg-opacity-75">
        <motion.div
          initial="hidden"
          animate="opening"
          transition={{ duration: 0.5, ease: "easeOut" }}
          variants={modalVariants}
          className="bg-white shadow-lg p-2 w-full h-full text-lg"
        >
          <form
          className="flex flex-col gap-2" 
          onSubmit={handleSubmit}
          >
            {/* Cancel and Submit buttons */}
            <div className="flex justify-between">
              <button onClick={() => handleCloseModal()} 
              className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
              >
                Close
              </button>
              <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                Save
              </button>
            </div>
            <div className="mb-4">
              <input
                type="text"
                id="title"
                placeholder="Event Title"
                value={title}
                onChange={handleTitleChange}
                className="mt-1 block p-2 w-full border-b border-gray-300 text-md"
              />
            </div>

            <div className="mb-4">
              <textarea
                id="description"
                placeholder="Event Description"
                value={description}
                onChange={handleDescriptionChange}
                className="mt-1 p-2 block w-full border-b border-gray-300 text-xs"
              ></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Month
              </label>
              {/* Month */}
              <select
                id="month"
                value={newMonth}
                placeholder={month}
                onChange={handleMonthChange}
                className="mt-1 block w-full border-b border-gray-300"
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
                id="day"
                value={newDate}
                placeholder={day}
                onChange={handleDayChange}
                className="mt-1 block w-full border-b border-gray-300"
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
                id="year"
                placeholder={year}
                value={newYear}
                onChange={handleYearChange}
                className="mt-1 block w-full border-b border-gray-300"
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
                id="from"
                placeholder={from}
                value={newFrom}
                onChange={handleFromChange}
                className="mt-1 block w-full border-b border-gray-300"
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
                id="to"
                placeholder={`${to}:00`}
                value={newTo}
                onChange={handleToChange}
                className="mt-1 block w-full border-b border-gray-300"
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
                Group:
              </label>
              <select
                id="to"
                value={newGroup}
                onChange={handleGroupChange}
                className="mt-1 block w-full border-b border-gray-300"
              >
                <option value="none">None</option>
                <option value="Group 1">Group 1</option>
              </select>
            </div>
          </form>
        </motion.div>
    </div>
    );
  }