import { createTask, deleteTask, updateTask } from 'api/choresServiceApiClient'
import TaskComponent from 'components/Task'
import { useContext, useState } from 'react'
import { AppContext } from '../AppContextProvider'
import TaskModal from '../components/TaskModal'
import { Task } from '../types'

const TasksPage = (initialState: any) => {
	const [taskModalOpen, setTaskModalOpen] = useState(false)
	const [selectedTask, setSelectedTask] = useState<Task | null>(null)
	const { tasks, setTasks } = useContext(AppContext)

	const handleDeleteTask = async (taskId: number) => {
		try {
			await deleteTask(taskId)
			const updatedTasks = tasks.filter(task => task.id !== taskId)
			setTasks(updatedTasks)
		} catch (error) {
			console.error('Failed to delete task', error)
		}
	}

	const handleSaveTask = async (task: Task, taskId?: number) => {
		setTaskModalOpen(false)
		try {
			if (taskId != null) {
				await updateTask(taskId, task)
				setTasks(prevTasks =>
					prevTasks.map(prevTask =>
						prevTask.id === taskId ? { ...task, id: taskId } : prevTask
					)
				)
			} else {
				const createdTask = await createTask(task)
				const updatedTasks = [...tasks]
				updatedTasks.push(createdTask)
				setTasks(updatedTasks)
			}
		} catch (error) {
			console.error('Failed to add or update task', error)
		}
	}

	// Function to handle clicking on checkmark button
	const handleCheckmarkClick = (task: Task) => {
		if (task.id) {
			handleDeleteTask(task.id)
		}
	}

	return (
		<div className='min-h-screen bg-gray-900 text-white'>
			<div className='fixed top-0 left-0 right-0 z-50 py-8'>
				<div className='container mx-auto px-4'>
					<h1 className='mb-2 flex justify-center text-4xl font-bold'>
						<span className='mr-2 text-green-500'>{tasks.length}</span>
						Tasks
					</h1>
					<div>
						<div className='mt-4 flex justify-center'>
							<button
								className='font-serif mb-4 rounded-md border-none bg-transparent py-2 px-4 text-lg font-semibold text-green-500 hover:bg-green-500 hover:text-white focus:outline-none'
								onClick={() => {
									setSelectedTask(null) // Reset selectedChore before adding a new chore
									setTaskModalOpen(true)
								}}
							>
								<span className='inline-block animate-pulse'>+</span> Add Task
							</button>
						</div>
					</div>
					<div className='max-h-[33.5rem] overflow-y-auto'>
						<ul className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
							{tasks.length > 0 ? (
								tasks.map(task => (
									<TaskComponent
										key={task.id}
										task={task}
										onEdit={() => {
											setSelectedTask(task)
											setTaskModalOpen(true)
										}}
										onCheckmarkClick={handleCheckmarkClick}
									/>
								))
							) : (
								<li className='flex justify-center text-gray-500'>No tasks</li>
							)}
						</ul>
					</div>
					<TaskModal
						isOpen={taskModalOpen}
						onClose={() => {
							setTaskModalOpen(false)
							setSelectedTask(null)
						}}
						onSaveTask={handleSaveTask}
						task={selectedTask}
					/>
				</div>
			</div>
		</div>
	)
}

export default TasksPage
