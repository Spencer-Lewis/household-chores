import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Chore } from '../types'
import ChoreProgressBar from './ChoreProgressBar'

interface ChoreComponentProps {
	chore: Chore
	onEdit: (chore: Chore) => void
}

const ChoreComponent: React.FC<ChoreComponentProps> = ({ chore, onEdit }) => {
	const handleEdit = () => {
		onEdit(chore)
		setChoreEditedCount(choreEditedCount + 1)
	}

	const [choreEditedCount, setChoreEditedCount] = useState(0)

	return (
		<div className='relative rounded-md bg-gray-700 p-4 shadow-md transition duration-300 ease-in-out hover:bg-gray-600 hover:shadow-lg'>
			<button
				className='absolute top-0 right-0 mt-2 mr-2 rounded-md px-2 py-1 text-sm text-white hover:bg-green-700 focus:outline-none'
				onClick={handleEdit}
			>
				<FontAwesomeIcon icon={faPencilAlt} />
			</button>
			<h3 className='mb-2 text-lg font-semibold text-white'>{chore.name}</h3>
			<ChoreProgressBar
				recurrence={chore.recurrence}
				frequencyUnit={chore.unit}
				dueDate={chore.dueDate}
			/>
		</div>
	)
}

export default ChoreComponent
