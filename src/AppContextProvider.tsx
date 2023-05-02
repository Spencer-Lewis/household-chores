import { createContext, useState, useEffect } from 'react'
import { fetchRooms, fetchTasks } from 'api/choresServiceApiClient'
import { Room, Task } from 'types'

type AppContextValue = {
	rooms: Room[]
	tasks: Task[]
}

// Create a new context
const AppContext = createContext<AppContextValue | undefined>(undefined)

function AppContextProvider({ children }) {
	const [rooms, setRooms] = useState<Room[]>([])
	const [tasks, setTasks] = useState<Task[]>([])

	useEffect(() => {
		const fetchData = async () => {
			const parsedRooms = await fetchRooms()
			setRooms(parsedRooms)

			const parsedTasks = await fetchTasks()
			setTasks(parsedTasks)
		}
		fetchData()
	}, [])

	// Pass rooms and tasks as values to the context provider
	const values = {
		rooms,
		tasks,
		setRooms,
		setTasks
	}

	return <AppContext.Provider value={values}>{children}</AppContext.Provider>
}

export default AppContextProvider
export { AppContext }
