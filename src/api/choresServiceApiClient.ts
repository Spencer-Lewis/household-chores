import { Chore, FrequencyUnit, Room, Task } from 'types'

// LOCAL BACKEND SERVICE URL
const HOST_URL = 'http://localhost:3001'

// DEPLOYED BACKEND SERVICE URL
// const HOST_URL = 'https://chores-service.onrender.com'

// Fetch all rooms
export const fetchRooms = async () => {
	try {
		// Fetch room data from API
		const roomResponse = await fetch(`${HOST_URL}/rooms`)
		const roomsJson = await roomResponse.json()
		const parsedRooms = roomsJson.map(room => {
			let parsedRoom: Room = {
				_id: room._id,
				name: room.name,
				chores: room.chores.map(chore => {
					chore.dueDate = new Date(chore.dueDate)
					return chore
				})
			}
			return parsedRoom
		})
		return parsedRooms
	} catch (error) {
		console.error('Failed to fetch room and chores data', error)
	}
}

// Fetch one room by id
export const fetchRoom = async roomId => {
	// Fetch room data from API
	const roomResponse = await fetch(`${HOST_URL}/rooms/${roomId}`)
	const roomJson = await roomResponse.json()
	const room: Room = {
		_id: roomJson._id,
		name: roomJson.name,
		chores: roomJson.chores.map(chore => {
			chore.dueDate = new Date(chore.dueDate)
			return chore
		})
	}
	return room
}

// Create room
export const createRoom = async (roomData: Room) => {
	const roomResponse = await fetch(`${HOST_URL}/rooms`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(roomData)
	})
	const roomJson = await roomResponse.json()
	roomData._id = roomJson._id
	return roomData
}

// Delete room
export const deleteRoom = async (roomId: any) => {
	return await fetch(`${HOST_URL}/rooms/${roomId}`, {
		method: 'DELETE'
	})
}

// Function to mark a chore as completed
export const updateChoreCompleted = async (chore: Chore, room: Room) => {
	const currentDate = new Date()
	const newDueDate = new Date(currentDate)
	switch (chore.unit) {
		case FrequencyUnit.Days:
			newDueDate.setDate(currentDate.getDate() + chore.recurrence)
			break
		case FrequencyUnit.Weeks:
			newDueDate.setDate(currentDate.getDate() + chore.recurrence * 7)
			break
		case FrequencyUnit.Months:
			newDueDate.setDate(currentDate.getDate() + chore.recurrence * 30)
			break
		default:
			break
	}
	chore.dueDate = newDueDate

	return await fetch(`${HOST_URL}/chores/room/${room._id}/chore/${chore._id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(chore)
	})
}

export const updateChore = async (roomId: any, chore: Chore, choreId: any) => {
	return await fetch(`${HOST_URL}/chores/room/${roomId}/chore/${choreId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(chore)
	})
}

export const createChore = async (roomId: any, chore: Chore) => {
	const createChoreResponse = await fetch(`${HOST_URL}/chores/room/${roomId}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(chore)
	})
	await createChoreResponse.json()
	return chore
}

export const deleteChore = async (roomId: any, choreId: any) => {
	return await fetch(`${HOST_URL}/chores/room/${roomId}/chore/${choreId}`, {
		method: 'DELETE'
	})
}

export const fetchTasks = async () => {
	try {
		// Fetch Tasks from API
		const tasksResponse = await fetch(`${HOST_URL}/tasks`)
		const tasksJson = await tasksResponse.json()
		const parsedTasks = tasksJson.map(task => {
			let parsedTask: Task = {
				_id: task._id,
				name: task.name,
				description: task.description,
				contact: task.contact
			}
			return parsedTask
		})
		return parsedTasks
	} catch (error) {
		console.error('Failed to fetch tasks', error)
	}
}

// Fetch one task by id
export const fetchTask = async taskId => {
	// Fetch task from API
	const taskResponse = await fetch(`${HOST_URL}/tasks/${taskId}`)
	const taskJson = await taskResponse.json()
	const task: Task = {
		_id: taskJson._id,
		name: taskJson.name,
		description: taskJson.description,
		contact: taskJson.contact
	}
	return task
}

// Create task
export const createTask = async (taskData: Task) => {
	const taskResponse = await fetch(`${HOST_URL}/tasks`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(taskData)
	})
	const taskJson = await taskResponse.json()
	taskData._id = taskJson._id
	return taskData
}

// Update task
export const updateTask = async (taskId: any, taskData: Task) => {
	return await fetch(`${HOST_URL}/tasks/${taskId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(taskData)
	})
}

// Delete task
export const deleteTask = async (taskId: any) => {
	return await fetch(`${HOST_URL}/tasks/${taskId}`, {
		method: 'DELETE'
	})
}
