import ChoreComponent from 'components/Chore'
import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import ChoreModal from '../components/ChoreModal'
import { Chore, Room } from '../types'
import {
	fetchRoom,
	deleteChore,
	updateChore,
	createChore,
	updateChoreCompleted
} from 'api/choresServiceApiClient'
import { AppContext } from '../AppContextProvider'

const RoomDetail: React.FC = (initialState: any) => {
	const { rooms } = useContext(AppContext)
	const { roomId } = useParams<{ roomId: string }>()
	const [choreModalOpen, setChoreModalOpen] = useState(false)
	const [room, setRoom] = useState<Room | null>(null)
	const [selectedChore, setSelectedChore] = useState<Chore | null>(null)

	// Function to handle clicking on checkmark button
	const handleCheckmarkClick = async (chore: Chore) => {
		if (room) {
			await updateChoreCompleted(chore, room)
			setRoom(prevRoom => ({
				...prevRoom,
				chores: prevRoom.chores.map(prevChore =>
					prevChore._id === chore._id
						? { ...prevChore, isCompleted: true }
						: prevChore
				)
			}))
		}
	}

	useEffect(() => {
		const fetchRoomAndChores = async () => {
			let fetchedRoom: Room
			if (rooms && rooms.length > 0) {
				fetchedRoom = rooms.find(room => room._id === roomId) as Room
				setRoom(fetchedRoom)
			}
		}
		fetchRoomAndChores()
	}, [roomId, rooms])

	const handleSaveChore = async (chore: Chore, choreId?: number) => {
		chore.roomName = room?.name
		try {
			// If choreId is provided, update existing chore
			if (choreId != null) {
				await updateChore(roomId, chore, choreId)
				setRoom(prevRoom => ({
					...prevRoom,
					chores: prevRoom.chores.map(prevChore =>
						prevChore._id === choreId ? { ...chore, _id: choreId } : prevChore
					)
				}))
			} else {
				// If choreId is not provided, add new chore
				const createdChore = await createChore(roomId, chore)
				setRoom(prevRoom => ({
					...prevRoom,
					chores: [...prevRoom.chores, createdChore]
				}))
			}
		} catch (error) {
			console.error('Failed to add or update chore', error)
		}
	}

	const handleDeleteChore = async (choreId: number) => {
		try {
			await deleteChore(roomId, choreId)
			setRoom(prevRoom => ({
				...prevRoom,
				chores: prevRoom.chores.filter(chore => chore._id !== choreId)
			}))
		} catch (error) {
			console.error('Failed to delete chore', error)
		}
	}

	if (!room) {
		return <div>Loading...</div>
	}

	return (
		<div className='min-h-screen bg-gray-900 text-white'>
			<div className='py-8'>
				<div className='container mx-auto px-4'>
					<h1 className='mb-2 flex justify-center text-4xl font-bold'>
						{room.name}
					</h1>
					<div>
						<div className='mt-4 flex justify-center'>
							<button
								className='font-serif mb-4 rounded-md border-none bg-transparent py-2 px-4 text-lg font-semibold text-green-500 hover:bg-green-500 hover:text-white focus:outline-none'
								onClick={() => {
									setSelectedChore(null) // Reset selectedChore before adding a new chore
									setChoreModalOpen(true)
								}}
							>
								<span className='inline-block animate-pulse'>+</span> Add Chore
							</button>
						</div>
						<div className='grid max-h-[32rem] grid-cols-1 gap-4 overflow-y-auto md:grid-cols-2 lg:grid-cols-3'>
							{room.chores.map(chore => (
								<ChoreComponent
									chore={chore}
									key={chore._id}
									onEdit={() => {
										setSelectedChore(chore)
										setChoreModalOpen(true)
									}}
									onCheckmarkClick={handleCheckmarkClick}
								/>
							))}
						</div>
						<ChoreModal
							isOpen={choreModalOpen}
							onClose={() => {
								setSelectedChore(null) // Reset selectedChore when closing the ChoreModal
								setChoreModalOpen(false)
							}}
							onSave={(chore, choreId) => {
								handleSaveChore(chore, choreId) // Pass choreId to handleSaveChore for editing scenario
								setSelectedChore(null) // Reset selectedChore after saving a chore
								setChoreModalOpen(false)
							}}
							chore={selectedChore} // Pass selectedChore to ChoreModal for editing scenario
							room={room}
							onDelete={handleDeleteChore}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default RoomDetail
