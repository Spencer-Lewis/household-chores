export enum FrequencyUnit {
	Days = 'days',
	Weeks = 'weeks',
	Months = 'months'
}

// Chore interface to represent a chore
export interface Chore {
	id?: number // unique identifier for the chore
	name: string // name of the chore
	recurrence: number // recurrence frequency of the chore
	unit: FrequencyUnit // recurrence unit of the chore
	dueDate: Date // due date of the chore
	roomName?: string
}

// Room interface to represent a room
export interface Room {
	id?: number // unique identifier for the room
	name: string // name of the room
}

export interface Task {
	id?: number
	name: string
	description?: string
	contact?: string
}

// Main state interface to represent the state of the application
export interface AppState {
	rooms: Room[] // array of rooms in the house
}
