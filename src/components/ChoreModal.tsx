import { useState } from 'react';
import { Chore, FrequencyUnit } from '../types';

const ChoreModal = ({
  isOpen,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (chore: Chore) => void;
}) => {
  const [choreName, setChoreName] = useState('');
  const [choreFrequency, setChoreFrequency] = useState(1);
  const [choreUnit, setChoreUnit] = useState(FrequencyUnit.Days);

  const handleSave = () => {
    const newChore: Chore = {
      id: Date.now().toString(),
      name: choreName,
      frequency: choreFrequency,
      unit: choreUnit,
    };
    onSave(newChore);
    setChoreName('');
    setChoreFrequency(1);
    setChoreUnit(FrequencyUnit.Days);
    onClose();
  };

  return (
    <div
      className={`${
        isOpen ? 'block' : 'hidden'
      } fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center`}
    >
      <div className="bg-white w-96 rounded-md p-6">
        <h2 className="text-2xl font-bold mb-4">Add Chore</h2>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="choreName">
            Chore Name:
          </label>
          <input
            type="text"
            id="choreName"
            className="border border-gray-300 rounded-md p-2 w-full"
            value={choreName}
            onChange={(e) => setChoreName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="choreFrequency">
            Frequency:
          </label>
          <input
            type="number"
            id="choreFrequency"
            className="border border-gray-300 rounded-md p-2 w-full"
            value={choreFrequency}
            onChange={(e) => setChoreFrequency(Number(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="choreUnit">
            Unit:
          </label>
          <select
            id="choreUnit"
            className="border border-gray-300 rounded-md p-2 w-full"
            value={choreUnit}
            onChange={(e) => setChoreUnit(e.target.value as FrequencyUnit)}
          >
            {Object.values(FrequencyUnit).map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md mr-2"
            onClick={handleSave}
          >
            Save Chore
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChoreModal;
