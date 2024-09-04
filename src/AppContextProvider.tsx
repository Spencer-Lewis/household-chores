import {
	createChore as apiCreateChore,
	deleteChore as apiDeleteChore,
	updateChore as apiUpdateChore,
	updateChoreCompleted as apiUpdateChoreCompleted,
	fetchRooms,
	fetchTasks,
	getChoresForRoom
} from 'api/choresServiceApiClient'
import { createContext, useEffect, useState } from 'react'
import { Chore, Room, Task } from 'types'

type AppContextValue = {
	rooms: Room[]
	tasks: Task[]
	chores: Chore[]
	setRooms: (rooms: Room[]) => void
	setTasks: (tasks: Task[]) => void
	setChores: (chores: Chore[]) => void
	updateRoom: (updatedRoom: Room) => void
	updateTask: (updatedTask: Task) => void
	updateChore: (updatedChore: Chore) => void
	markChoreCompleted: (roomId: string, chore: Chore) => void
	createChore: (roomId: string, chore: Chore) => void
	deleteChore: (roomId: string, choreId: string) => void
}

// Create a new context
const AppContext = createContext<AppContextValue | undefined>(undefined)

function AppContextProvider({ children }) {
	const [rooms, setRooms] = useState<Room[]>([])
	const [tasks, setTasks] = useState<Task[]>([])
	const [chores, setChores] = useState<Chore[]>([])

	useEffect(() => {
		const fetchData = async () => {
			const parsedRooms = await fetchRooms()
			setRooms(parsedRooms)

			const choresPromises = parsedRooms.map(room => getChoresForRoom(room.id))
			const allChores = (await Promise.all(choresPromises)).flat()
			setChores(allChores)

			const parsedTasks = await fetchTasks()
			setTasks(parsedTasks)
		}
		fetchData()
	}, [])

	const updateRoom = (updatedRoom: Room) => {
		setRooms(prevRooms =>
			prevRooms.map(room => (room.id === updatedRoom.id ? updatedRoom : room))
		)
	}

	const updateTask = (updatedTask: Task) => {
		setTasks(prevTasks =>
			prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task))
		)
	}

	const convertTimestampsToDates = (chore: Chore): Chore => {
		// Convert Firestore Timestamp fields to JavaScript Date objects
		return {
			...chore,
			dueDate: chore.dueDate ? chore.dueDate.toDate() : null
		}
	}

	const createChore = async (roomId: string, chore: Chore) => {
		try {
			// Create the chore using the API
			const createdChore = await apiCreateChore(roomId, chore)

			// Convert Timestamp fields to Date objects
			const convertedChore = convertTimestampsToDates(createdChore)

			// Update the state with the newly created chore
			setChores(prevChores => [
				...prevChores,
				convertedChore // Use the converted chore
			])
		} catch (error) {
			console.error('Failed to create chore', error)
		}
	}

	const updateChore = async (roomId: string, updatedChore: Chore) => {
		try {
			await apiUpdateChore(roomId, updatedChore) // Call API to update chore

			// Convert Timestamp fields to Date objects for the updated chore
			const convertedChore = convertTimestampsToDates(updatedChore)

			// Update the state with the updated chore
			setChores(prevChores =>
				prevChores.map(chore =>
					chore.id === convertedChore.id ? convertedChore : chore
				)
			)
		} catch (error) {
			console.error('Failed to update chore', error)
		}
	}

	const markChoreCompleted = async (roomId: string, chore: Chore) => {
		try {
			const updatedChore = await apiUpdateChoreCompleted(roomId, chore)

			// Convert Timestamp fields to Date objects for the updated chore
			const convertedChore = convertTimestampsToDates(updatedChore)

			// Update the state with the marked as completed chore
			setChores(prevChores =>
				prevChores.map(prevChore =>
					prevChore.id === convertedChore.id
						? {
								...prevChore,
								isCompleted: true,
								dueDate: convertedChore.dueDate
						  }
						: prevChore
				)
			)
		} catch (error) {
			console.error('Failed to mark chore as completed', error)
		}
	}

	const deleteChore = async (roomId: string, choreId: string) => {
		try {
			await apiDeleteChore(roomId, choreId)
			setChores(prevChores =>
				prevChores?.filter(prevChore => prevChore.id !== choreId)
			)
		} catch (error) {
			console.error('Failed to mark chore as completed', error)
		}
	}
	// Pass rooms, tasks, chores, and update functions as values to the context provider
	const values = {
		rooms,
		tasks,
		chores,
		setRooms,
		setTasks,
		setChores,
		updateRoom,
		updateTask,
		updateChore,
		markChoreCompleted,
		deleteChore,
		createChore
	}

	return <AppContext.Provider value={values}>{children}</AppContext.Provider>
}

export default AppContextProvider
export { AppContext }
