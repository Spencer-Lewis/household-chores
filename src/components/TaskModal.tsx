import React, { useState, useEffect } from 'react'
import { Task } from 'types'

interface TaskModalProps {
	isOpen: boolean
	onClose: () => void
	onSaveTask: (task: Task, taskId?: number) => void
	task: Task | null
}

const TaskModal: React.FC<TaskModalProps> = ({
	isOpen,
	onClose,
	onSaveTask,
	task
}) => {
	const [taskName, setTaskName] = useState('')
	const [taskContact, setTaskContact] = useState('')
	const [taskDescription, setTaskDescription] = useState('')

	const handleSaveTask = () => {
		if (taskName.trim() === '') {
			return
		}

		let newTask: Task = {
			name: taskName
		}
		if (taskContact) newTask.contact = taskContact
		if (taskDescription) newTask.description = taskDescription
		onSaveTask(newTask, task?._id)
		onClose()
	}

	useEffect(() => {
		// Populate form fields with chore details when editing an existing chore
		if (task) {
			setTaskName(task.name)
			setTaskContact(task.contact || '')
			setTaskDescription(task.description || '')
		} else {
			setTaskName('')
			setTaskContact('')
			setTaskDescription('')
		}
	}, [task])

	return (
		<div
			className={`fixed top-0 left-0 right-0 bottom-0 z-10 bg-gray-800 bg-opacity-50 ${
				isOpen ? 'block' : 'hidden'
			}`}
		>
			<div className='mx-auto mt-12 w-96 rounded-md bg-gray-700 p-4 shadow-md'>
				<h2 className='mb-4 text-2xl font-semibold text-white'>Add Task</h2>
				<form>
					<div className='mb-4'>
						<label
							htmlFor='taskName'
							className='mb-1 block font-medium text-white'
						>
							Task Name
						</label>
						<input
							type='text'
							id='taskName'
							className='w-full rounded-md border-gray-300 bg-gray-800 px-3 py-2 text-white focus:border-blue-500 focus:outline-none'
							value={taskName}
							onChange={e => setTaskName(e.target.value)}
						/>
						<label
							htmlFor='taskContact'
							className='mb-1 block font-medium text-white'
						>
							Contact
						</label>
						<input
							type='text'
							id='taskContact'
							className='w-full rounded-md border-gray-300 bg-gray-800 px-3 py-2 text-white focus:border-blue-500 focus:outline-none'
							value={taskContact}
							onChange={e => setTaskContact(e.target.value)}
						/>
						<label
							htmlFor='taskDescription'
							className='mb-1 block font-medium text-white'
						>
							Description
						</label>
						<textarea
							id='taskDescription'
							className='w-full rounded-md border-gray-300 bg-gray-800 px-3 py-2 text-white focus:border-blue-500 focus:outline-none'
							value={taskDescription}
							onChange={e => setTaskDescription(e.target.value)}
						/>
					</div>
					<div className='flex justify-end'>
						<button
							type='button'
							className='mr-2   rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-700'
							onClick={handleSaveTask}
						>
							Add
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

export default TaskModal
