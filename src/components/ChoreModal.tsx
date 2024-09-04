import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { Chore, FrequencyUnit, Room } from '../types'

interface ChoreModalProps {
	isOpen: boolean
	onClose: () => void
	onSave: (chore: Chore, choreId?: number) => void
	onDelete: (choreId: number) => void // Add onDelete prop
	chore: Chore | null
	room: Room
}

const ChoreModal: React.FC<ChoreModalProps> = ({
	isOpen,
	onClose,
	onSave,
	onDelete, // Add onDelete prop
	chore,
	room
}) => {
	const [choreName, setChoreName] = useState(chore?.name || '')
	const [choreRecurrence, setChoreRecurrence] = useState(chore?.recurrence || 1)
	const [choreUnit, setChoreUnit] = useState(chore?.unit || FrequencyUnit.Days)
	const [choreDueDate, setChoreDueDate] = useState(
		chore?.dueDate ? new Date(chore?.dueDate) : new Date()
	)

	useEffect(() => {
		// Populate form fields with chore details when editing an existing chore
		if (chore) {
			setChoreName(chore.name)
			setChoreRecurrence(chore.recurrence)
			setChoreUnit(chore.unit)
			setChoreDueDate(chore.dueDate)
		} else {
			setChoreName('')
			setChoreRecurrence(1)
			setChoreUnit(FrequencyUnit.Days)
			setChoreDueDate(new Date())
		}
	}, [chore])

	const handleSave = () => {
		const updatedChore: Chore = {
			name: choreName,
			recurrence: choreRecurrence,
			unit: choreUnit,
			dueDate: new Date(choreDueDate),
			roomName: room.name
		}

		onSave(updatedChore, chore?.id)
		onClose()
	}

	const handleDelete = () => {
		if (chore) {
			onDelete(chore.id || 1)
			onClose()
		}
	}

	return (
		<div
			className={`fixed top-0 left-0 right-0 bottom-0 z-10 bg-gray-800 bg-opacity-50 ${
				isOpen ? 'block' : 'hidden'
			}`}
		>
			<div className='mx-auto mt-12 w-96 rounded-md bg-gray-700 p-4 shadow-md'>
				<h2 className='mb-4 text-2xl font-semibold text-white'>
					{chore ? 'Edit Chore' : 'Add Chore'} - {room.name}
				</h2>
				<form>
					<div className='mb-4'>
						<label
							htmlFor='choreName'
							className='mb-1 block font-medium text-white'
						>
							Chore Name
						</label>
						<input
							type='text'
							id='choreName'
							className='w-full rounded-md border-gray-300 bg-gray-800 px-3 py-2 text-white focus:border-blue-500 focus:outline-none'
							value={choreName}
							onChange={e => setChoreName(e.target.value)}
						/>
					</div>
					<div className='mb-4'>
						<label
							htmlFor='choreRecurrence'
							className='mb-1 block font-medium text-white'
						>
							Recurrence
						</label>
						<input
							type='number'
							id='choreRecurrence'
							className='w-full rounded-md border-gray-300 bg-gray-800 px-3 py-2 text-white focus:border-blue-500 focus:outline-none'
							value={choreRecurrence}
							onChange={e => setChoreRecurrence(Number(e.target.value))}
						/>
					</div>
					<div className='mb-4'>
						<label
							htmlFor='choreUnit'
							className='mb-1 block font-medium text-white'
						>
							Unit
						</label>
						<select
							id='choreUnit'
							className='w-full rounded-md border-gray-300 bg-gray-800 px-3 py-2 text-white focus:border-blue-500 focus:outline-none'
							value={choreUnit}
							onChange={e => setChoreUnit(e.target.value as FrequencyUnit)}
						>
							<option value={FrequencyUnit.Days}>Days</option>
							<option value={FrequencyUnit.Weeks}>Weeks</option>
							<option value={FrequencyUnit.Months}>Months</option>
						</select>
					</div>
					<div className='mb-4'>
						<label
							htmlFor='choreDueDate'
							className='mb-1 block font-medium text-white'
						>
							Due Date
						</label>
						<DatePicker
							id='choreDueDate'
							className='mt-2 w-full rounded-md bg-gray-800 px-4 py-2 text-white' // Update className for input field
							selected={choreDueDate}
							onChange={(date: Date) => setChoreDueDate(date)}
							dateFormat='MMMM d, yyyy'
							placeholderText='Select a date'
							popperClassName='bg-gray-800 text-white' // Update popperClassName for calendar
							calendarStyle={{
								// Set custom calendar styles
								backgroundColor: 'rgb(55, 65, 81)', // Dark background color
								color: '#fff', // White text color
								border: 'none' // Remove border
							}}
						/>
					</div>
					<div className='flex'>
						{chore?.id ? (
							<button
								type='button'
								className='mr-2 rounded-md px-4 py-2 text-red-500 hover:text-red-700'
								onClick={handleDelete}
							>
								<FontAwesomeIcon icon={faTrashAlt} className='mr-2' />
							</button>
						) : null}
						<div className='flex-grow'></div>
						<button
							type='button'
							className='mr-2 rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-700'
							onClick={handleSave}
						>
							{chore ? 'Save' : 'Add'}
						</button>
						<button
							type='button'
							className='rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600'
							onClick={onClose}
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default ChoreModal
