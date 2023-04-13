import { Chore } from '../types'

const isChoreDueToday = (chore: Chore): boolean => {
	const today = new Date()
	const dueDate = new Date(chore.dueDate)

	// Set time of day to 0 for both today and dueDate
	today.setHours(0, 0, 0, 0)
	dueDate.setHours(0, 0, 0, 0)

	// Compare the dueDate to today's date, and check if it's on or before today
	return dueDate <= today
}

export default isChoreDueToday
