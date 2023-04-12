import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Chore, FrequencyUnit, Room } from '../types';

interface ChoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (chore: Chore, choreId?: number) => void;
  onDelete: (choreId: number) => void; // Add onDelete prop
  chore: Chore | null;
  room: Room;
}

const ChoreModal: React.FC<ChoreModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete, // Add onDelete prop
  chore,
  room,
}) => {
  const [choreName, setChoreName] = useState(chore?.name || '');
  const [choreRecurrence, setChoreRecurrence] = useState(chore?.recurrence || 1);
  const [choreUnit, setChoreUnit] = useState(chore?.unit || FrequencyUnit.Days);
  const [choreDueDate, setChoreDueDate] = useState(
    chore?.dueDate ? new Date(chore?.dueDate) : new Date()
  );

  useEffect(() => {
    // Populate form fields with chore details when editing an existing chore
    if (chore) {
      setChoreName(chore.name);
      setChoreRecurrence(chore.recurrence);
      setChoreUnit(chore.unit);
      setChoreDueDate(chore.dueDate);
    } else {
      setChoreName('');
      setChoreRecurrence(1);
      setChoreUnit(FrequencyUnit.Days);
      setChoreDueDate(new Date());
    }
  }, [chore]);

  const handleSave = () => {
    const updatedChore: Chore = {
      id: chore?.id || Math.random(),
      name: choreName,
      recurrence: choreRecurrence,
      unit: choreUnit,
      dueDate: new Date(choreDueDate),
    };

    onSave(updatedChore, chore?.id);
    onClose();
  };

  const handleDelete = () => {
    if (chore) {
      onDelete(chore.id);
      onClose();
    }
  };

  return (
      <div
        className={`fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 z-10 ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="bg-gray-700 w-96 mx-auto mt-12 p-4 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-white">{chore ? 'Edit Chore' : 'Add Chore'} - {room.name}</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="choreName" className="block text-white font-medium mb-1">
                Chore Name
              </label>
              <input
                type="text"
                id="choreName"
                className="text-white w-full bg-gray-800 border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
                value={choreName}
                onChange={(e) => setChoreName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="choreRecurrence" className="block text-white font-medium mb-1">
                Recurrence
              </label>
              <input
                type="number"
                id="choreRecurrence"
                className="text-white w-full bg-gray-800 border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
                value={choreRecurrence}
                onChange={(e) => setChoreRecurrence(Number(e.target.value))}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="choreUnit" className="block text-white font-medium mb-1">
                Unit
              </label>
              <select
                id="choreUnit"
                className="text-white w-full bg-gray-800 border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
                value={choreUnit}
                onChange={(e) => setChoreUnit(e.target.value as FrequencyUnit)}
              >
                <option value={FrequencyUnit.Days}>Days</option>
                <option value={FrequencyUnit.Weeks}>Weeks</option>
                <option value={FrequencyUnit.Months}>Months</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="choreDueDate" className="block text-white font-medium mb-1">
                Due Date
              </label>
              <DatePicker
                id="choreDueDate"
                className="w-full px-4 py-2 mt-2 text-white bg-gray-800 rounded-md" // Update className for input field
                selected={choreDueDate}
                onChange={(date: Date) => setChoreDueDate(date)}
                dateFormat="MMMM d, yyyy"
                placeholderText="Select a date"
                popperClassName="bg-gray-800 text-white" // Update popperClassName for calendar
                calendarStyle={{ // Set custom calendar styles
                  backgroundColor: 'rgb(55, 65, 81)', // Dark background color
                  color: '#fff', // White text color
                  border: 'none', // Remove border
                }}
              />
            </div>
            <div className="flex">
              {chore?.id ? <button
                type="button"
                className="hover:text-red-700 text-red-500 px-4 py-2 rounded-md mr-2"
                onClick={handleDelete}
              >
                <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
              </button> : null}
              <div className="flex-grow">

              </div>
              <button
                type="button"
                className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-md mr-2"
                onClick={handleSave}
              >
                {chore ? 'Save' : 'Add'}
              </button>
              <button
                type="button"
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default ChoreModal;
