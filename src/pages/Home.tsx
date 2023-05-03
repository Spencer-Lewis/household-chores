import { useContext, useEffect, useState } from 'react'
import { ChoresDueList } from 'components/ChoresDueList'
import { Chore, Room } from 'types'
import isChoreDueToday from 'utils/isChoreDueToday'
import { updateChoreCompleted } from 'api/choresServiceApiClient'
import { AppContext } from '../AppContextProvider'

const HomeDashboard = () => {
	const { rooms, setRooms } = useContext(AppContext)

	const [choresDueToday, setChoresDueToday] = useState<Chore[]>([])

	useEffect(() => {
		const calculateChoresDueToday = () => {
			const dueToday: Chore[] = rooms.reduce((acc: Chore[], room: Room) => {
				const choresDue = room.chores.filter(isChoreDueToday)
				return [...acc, ...choresDue]
			}, [])
			setChoresDueToday(dueToday)
		}
		calculateChoresDueToday()
	}, [rooms])

	const updateRoomsForUpdatedChore = (
		updatedChore: Chore,
		chore: Chore
	): void => {
		const updatedRooms = rooms.map((room: Room) => {
			if (room.name === chore.roomName) {
				const updatedChores = room.chores.map((c: Chore) => {
					if (c._id === updatedChore._id) {
						return updatedChore
					}
					return c
				})
				return {
					...room,
					chores: updatedChores
				}
			}
			return room
		})
		setRooms(updatedRooms)
	}

	const markChoreAsCompleted = async (chore: Chore): Promise<void> => {
		const updateRoom = rooms.filter(
			(room: Room) => room.name === chore.roomName
		)
		if (updateRoom.length > 0) {
			const roomToUpdate = updateRoom[0]
			const updatedChore = await updateChoreCompleted(chore, roomToUpdate)
			if (updatedChore) updateRoomsForUpdatedChore(updatedChore, chore)
		}
	}

	const handleCheckmarkClick = (chore: Chore): void => {
		markChoreAsCompleted(chore)
	}

	return (
		<div>
			<div
				className='fixed top-0 left-0 right-0 z-50 bg-gray-900 py-8'
				style={{ paddingBottom: '60px' }}
			>
				<div className='container mx-auto px-4'>
					<h1 className='mb-8 flex justify-center text-4xl font-bold'>
						<span className='mr-2 text-green-500'>{choresDueToday.length}</span>{' '}
						Chores Due
					</h1>
					<div
						className='max-h-[35.5rem] overflow-y-auto'
						style={{ marginBottom: '60px' }}
					>
						<ChoresDueList
							choresDueToday={choresDueToday}
							onCheckmarkClick={handleCheckmarkClick}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default HomeDashboard
