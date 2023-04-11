import React, { useEffect, useState } from 'react';
import { Chore, FrequencyUnit } from '../types';

interface ChoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (chore: Chore, choreId?: number) => void;
  chore: Chore | null;
}

const ChoreModal: React.FC<ChoreModalProps> = ({ isOpen, onClose, onSave, chore }) => {
  const [choreName, setChoreName] = useState(chore?.name || '');
  const [choreRecurrence, setChoreRecurrence] = useState(chore?.recurrence || 1);
  const [choreUnit, setChoreUnit] = useState(chore?.unit || FrequencyUnit.Days);
  const [choreDueDate, setChoreDueDate] = useState(
    chore?.dueDate ? new Date(chore?.dueDate) : new Date()
  );
  const [choreCompleted, setChoreCompleted] = useState(chore?.completed || false);

  useEffect(() => {
    // Populate form fields with chore details when editing an existing chore
    if (chore) {
      setChoreName(chore.name);
      setChoreRecurrence(chore.recurrence);
      setChoreUnit(chore.unit);
      setChoreDueDate(chore.dueDate);
      setChoreCompleted(chore.completed);
    } else {
      setChoreName('');
      setChoreRecurrence(1);
      setChoreUnit(FrequencyUnit.Days);
      setChoreDueDate(new Date());
      setChoreCompleted(false);
    }
  }, [chore]);

  const handleSave = () => {
    const updatedChore: Chore = {
      id: chore?.id || Math.random(),
      name: choreName,
      recurrence: choreRecurrence,
      unit: choreUnit,
      dueDate: new Date(choreDueDate),
      completed: choreCompleted,
    };

    onSave(updatedChore, chore?.id);
    onClose();
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 z-10 ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      <div className="bg-white w-96 mx-auto mt-12 p-4 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">{chore ? 'Edit Chore' : 'Add Chore'}</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="choreName" className="block text-gray-700 font-medium mb-1">
              Chore Name
            </label>
            <input
              type="text"
              id="choreName"
              className="text-black w-full border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
              value={choreName}
              onChange={(e) => setChoreName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="choreRecurrence" className="block text-gray-700 font-medium mb-1">
              Recurrence
            </label>
            <input
              type="number"
              id="choreRecurrence"
              className="text-black w-full border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
              value={choreRecurrence}
              onChange={(e) => setChoreRecurrence(Number(e.target.value))}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="choreUnit" className="block text-gray-700 font-medium mb-1">
              Unit
            </label>
            <select
              id="choreUnit"
              className="text-black w-full border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
              value={choreUnit}
              onChange={(e) => setChoreUnit(e.target.value as FrequencyUnit)}
            >
              <option value={FrequencyUnit.Days}>Days</option>
              <option
              value={FrequencyUnit.Weeks}
              >Weeks</option>
              <option value={FrequencyUnit.Months}>Months</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="choreDueDate" className="block text-gray-700 font-medium mb-1">
              Due Date
            </label>
            <input
              type="date"
              id="choreDueDate"
              className="text-black w-full border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
              value={choreDueDate.toISOString().substr(0, 10)} // Convert Date object to string in YYYY-MM-DD format
              onChange={(e) => setChoreDueDate(new Date(e.target.value))}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="choreCompleted" className="block text-gray-700 font-medium mb-1">
              Completed
            </label>
            <input
              type="checkbox"
              id="choreCompleted"
              className="mr-2"
              checked={choreCompleted}
              onChange={(e) => setChoreCompleted(e.target.checked)}
            />
            <span>Mark as completed</span>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
              onClick={handleSave}
            >
              {chore ? 'Save' : 'Add'}
            </button>
            <button
              type="button"
              className="bg-gray-300 text-gray-700 ml-2 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none"
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
