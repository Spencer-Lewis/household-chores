import { ChoresDueList } from 'components/ChoresDueList'
import NavBar from 'components/NavBar'
import { useState, useEffect } from 'react'
import { Chore, FrequencyUnit, Room } from 'types'
import isChoreDueToday from 'utils/isChoreDueToday'
import { fetchRooms, updateChoreCompleted } from 'api/choresServiceApiClient'

const HomeDashboard = () => {
	const [rooms, setRooms] = useState<Room[]>([])
	// Get chores that are due today from all rooms
	const choresDueToday = rooms.reduce((acc: Chore[], room: Room) => {
		const choresDue = room.chores.filter(isChoreDueToday)
		return [...acc, ...choresDue]
	}, [])
	// State to keep track of completed chores
	const [completedChores, setCompletedChores] = useState<number>(0)

	// Function to mark a chore as completed
	const markChoreAsCompleted = async (chore: Chore) => {
		const updateRoom = rooms.filter(room => room.name == chore.roomName)
		if (updateRoom.length > 0) {
			const roomToUpdate = updateRoom[0]
			await updateChoreCompleted(chore, roomToUpdate)
			setCompletedChores(completedChores + 1)
		}
	}

	// Function to handle clicking on checkmark button
	const handleCheckmarkClick = (chore: Chore) => {
		markChoreAsCompleted(chore)
	}

	useEffect(() => {
		const getRooms = async () => {
			const parsedRooms: Room[] = await fetchRooms()
			setRooms(parsedRooms)
		}
		getRooms()
	}, [completedChores])

	return (
		<div>
			<div
				className='fixed top-0 left-0 right-0 z-50 py-8'
				style={{ paddingBottom: '60px' }} // Adjust the value to match the height of your NavBar
			>
				<div className='container mx-auto px-4'>
					<h1 className='mb-8 flex justify-center text-4xl font-bold'>
						{choresDueToday.length} Tasks Due
					</h1>
					<div
						className='max-h-[35.5rem] overflow-y-auto'
						style={{ marginBottom: '60px' }} // Adjust the value to match the height of your NavBar
					>
						<ChoresDueList
							choresDueToday={choresDueToday}
							onCheckmarkClick={handleCheckmarkClick}
						/>
					</div>
				</div>
			</div>
			<NavBar />
		</div>
	)
}

export default HomeDashboard
