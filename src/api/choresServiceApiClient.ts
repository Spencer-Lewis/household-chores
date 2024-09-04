import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	query,
	Timestamp,
	updateDoc,
	writeBatch
} from 'firebase/firestore'
import { FrequencyUnit } from 'types'
import { db } from '../firebaseConfig' // Ensure this path points to your firebase.js file

// Fetch all rooms
export const fetchRooms = async () => {
	try {
		const roomsCollection = collection(db, 'rooms')
		const roomSnapshot = await getDocs(roomsCollection)
		return roomSnapshot.docs.map(doc => {
			const data = doc.data()
			return {
				id: doc.id,
				...data
				// Convert timestamps to Date objects
			}
		})
	} catch (error) {
		console.error('Failed to fetch room data', error)
	}
}

// Fetch one room by ID
export const fetchRoom = async roomId => {
	try {
		const roomDoc = doc(db, 'rooms', roomId)
		const roomSnapshot = await getDoc(roomDoc)
		if (roomSnapshot.exists()) {
			const data = roomSnapshot.data()
			return {
				id: roomSnapshot.id,
				...data
				// Convert timestamps to Date objects
				// chores: data.chores.map(chore => ({
				//   ...chore,
				//   dueDate: chore.dueDate ? chore.dueDate.toDate() : null
				// }))
			}
		} else {
			throw new Error('Room not found')
		}
	} catch (error) {
		console.error('Failed to fetch room data', error)
	}
}

// Create room
export const createRoom = async roomData => {
	try {
		const roomsCollection = collection(db, 'rooms')
		const roomRef = await addDoc(roomsCollection, roomData)
		return { id: roomRef.id, ...roomData }
	} catch (error) {
		console.error('Failed to create room', error)
	}
}

const deleteChores = async roomId => {
	const choresCollection = collection(db, 'rooms', roomId, 'chores')
	const choreQuery = query(choresCollection)
	const choreSnapshot = await getDocs(choreQuery)

	const batch = writeBatch(db)
	choreSnapshot.forEach(doc => {
		batch.delete(doc.ref)
	})

	await batch.commit()
}

// Delete room and all its associated chores
export const deleteRoom = async roomId => {
	try {
		// Start a batch operation
		const batch = writeBatch(db)

		// Delete all chores associated with the room
		await deleteChores(roomId)

		// Delete the room document
		const roomDoc = doc(db, 'rooms', roomId)
		batch.delete(roomDoc)

		// Commit the batch
		await batch.commit()

		console.log('Room and all associated chores deleted successfully')
	} catch (error) {
		console.error('Failed to delete room', error)
	}
}

// Update chore completion and due date
export const updateChoreCompleted = async (roomId, chore) => {
	try {
		const choreDoc = doc(db, 'rooms', roomId, 'chores', chore.id)
		const newDueDate = calculateNewDueDate(chore)
		chore.dueDate = Timestamp.fromDate(newDueDate) // Convert Date to Firestore Timestamp
		await updateDoc(choreDoc, chore)
		return chore
	} catch (error) {
		console.error('Failed to update chore', error)
	}
}

// Helper function to calculate the new due date for a chore
const calculateNewDueDate = chore => {
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
			newDueDate.setMonth(currentDate.getMonth() + chore.recurrence)
			break
		default:
			break
	}
	return newDueDate
}

// Fetch all chore subdocuments for a room
export const getChoresForRoom = async roomId => {
	try {
		const choresCollection = collection(db, 'rooms', roomId, 'chores')
		const choresSnapshot = await getDocs(choresCollection)
		return choresSnapshot.docs.map(doc => {
			const data = doc.data()
			return {
				id: doc.id,
				...data,
				// Convert timestamps to Date objects
				dueDate: data.dueDate ? data.dueDate.toDate() : null
			}
		})
	} catch (error) {
		console.error('Failed to fetch chores for room', error)
		throw error // Propagate the error
	}
}

// Update a chore in a room
export const updateChore = async (roomId, chore) => {
	try {
		const choreDoc = doc(db, 'rooms', roomId, 'chores', chore.id)
		chore.dueDate = chore.dueDate ? Timestamp.fromDate(chore.dueDate) : null // Convert Date to Firestore Timestamp
		await updateDoc(choreDoc, chore)
	} catch (error) {
		console.error('Failed to update chore', error)
	}
}

// Create a chore within a room
export const createChore = async (roomId, chore) => {
	try {
		const choresCollection = collection(db, 'rooms', roomId, 'chores')
		chore.dueDate = chore.dueDate ? Timestamp.fromDate(chore.dueDate) : null // Convert Date to Firestore Timestamp
		const choreRef = await addDoc(choresCollection, chore)
		return { id: choreRef.id, ...chore }
	} catch (error) {
		console.error('Failed to create chore', error)
	}
}

// Delete a chore from a room
export const deleteChore = async (roomId, choreId) => {
	try {
		const choreDoc = doc(db, 'rooms', roomId, 'chores', choreId)
		await deleteDoc(choreDoc)
	} catch (error) {
		console.error('Failed to delete chore', error)
	}
}

// Fetch all tasks
export const fetchTasks = async () => {
	try {
		const tasksCollection = collection(db, 'tasks')
		const tasksSnapshot = await getDocs(tasksCollection)
		return tasksSnapshot.docs.map(doc => ({
			id: doc.id,
			...doc.data()
		}))
	} catch (error) {
		console.error('Failed to fetch tasks', error)
	}
}

// Fetch one task by ID
export const fetchTask = async taskId => {
	try {
		const taskDoc = doc(db, 'tasks', taskId)
		const taskSnapshot = await getDoc(taskDoc)
		if (taskSnapshot.exists()) {
			return { id: taskSnapshot.id, ...taskSnapshot.data() }
		} else {
			throw new Error('Task not found')
		}
	} catch (error) {
		console.error('Failed to fetch task', error)
	}
}

// Create task
export const createTask = async taskData => {
	try {
		const tasksCollection = collection(db, 'tasks')
		const taskRef = await addDoc(tasksCollection, taskData)
		return { id: taskRef.id, ...taskData }
	} catch (error) {
		console.error('Failed to create task', error)
	}
}

// Update task
export const updateTask = async (taskId, taskData) => {
	try {
		const taskDoc = doc(db, 'tasks', taskId)
		await updateDoc(taskDoc, taskData)
	} catch (error) {
		console.error('Failed to update task', error)
	}
}

// Delete task
export const deleteTask = async taskId => {
	try {
		const taskDoc = doc(db, 'tasks', taskId)
		await deleteDoc(taskDoc)
	} catch (error) {
		console.error('Failed to delete task', error)
	}
}
