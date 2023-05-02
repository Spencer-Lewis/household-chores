import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Task } from '../types'

interface TaskComponentProps {
	task: Task
	onEdit: (task: Task) => void
	onCheckmarkClick: (task: Task) => void
}

const TaskComponent: React.FC<TaskComponentProps> = ({
	task,
	onEdit,
	onCheckmarkClick
}) => {
	const handleEdit = () => {
		setSelectedForCompletion(false)
		onEdit(task)
		setTaskEditedCount(taskEditedCount + 1)
	}

	const [taskEditedCount, setTaskEditedCount] = useState(0)
	const [selectedForCompletion, setSelectedForCompletion] = useState(false)

	const handleSelectForCompletion = () => {
		setSelectedForCompletion(!selectedForCompletion)
	}

	return (
		<div
			onClick={() => handleSelectForCompletion()}
			className='relative rounded-md bg-gray-700 p-4 shadow-md transition duration-300 ease-in-out hover:bg-gray-600 hover:shadow-lg'
		>
			<span
				className={`absolute bottom-1 right-1 ${
					selectedForCompletion ? '' : 'hidden'
				}`}
			>
				<button
					type='button'
					className='rounded-full p-2'
					onClick={e => onCheckmarkClick(task)}
				>
					<FontAwesomeIcon
						icon={faCheckCircle}
						className='text-2xl text-green-500'
					/>
					<span className='pointer-events-none absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-green-500 opacity-0'></span>
				</button>
			</span>
			<button
				className='absolute top-0 right-0 mt-2 mr-2 rounded-md px-2 py-1 text-sm text-white hover:bg-green-700 focus:outline-none'
				onClick={handleEdit}
			>
				<FontAwesomeIcon icon={faPencilAlt} />
			</button>
			<h3 className='mb-2 text-lg font-semibold text-white'>{task.name}</h3>
			{task.contact ? (
				<h6 className='text-gray-400'>contact: {task.contact}</h6>
			) : null}
			{task.description ? (
				<p className='text-gray-400;' style={{ whiteSpace: 'pre-wrap' }}>
					{task.description}
				</p>
			) : null}
		</div>
	)
}

export default TaskComponent
