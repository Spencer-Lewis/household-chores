import ChoreComponent from 'components/Chore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ChoreModal from '../components/ChoreModal'
import { Chore, Room } from '../types'

const RoomDetail: React.FC = () => {
	const { roomId } = useParams<{ roomId: string }>() // Access roomId from route params
	const [choreModalOpen, setChoreModalOpen] = useState(false)
	const [room, setRoom] = useState<Room | null>(null)
	const [chores, setChores] = useState<Chore[]>([])
	const [selectedChore, setSelectedChore] = useState<Chore | null>(null) // Add selectedChore state

	useEffect(() => {
		const fetchRoomAndChores = async () => {
			try {
				// Fetch room data from API
				const roomResponse = await fetch(
					`https://chores-service.onrender.com/rooms/${roomId}`
				)
				const roomJson = await roomResponse.json()
				const room: Room = {
					_id: roomJson._id,
					name: roomJson.name,
					chores: roomJson.chores.map(chore => {
						chore.dueDate = new Date(chore.dueDate)
						return chore
					})
				}
				setRoom(room)
				setChores(room.chores)
			} catch (error) {
				console.error('Failed to fetch room and chores data', error)
			}
		}

		fetchRoomAndChores()
	}, [roomId])

	const handleAddChore = async (chore: Chore, choreId?: number) => {
		chore.roomName = room?.name
		try {
			// If choreId is provided, update existing chore
			if (choreId != null) {
				await fetch(
					`https://chores-service.onrender.com/chores/room/${roomId}/chore/${choreId}`,
					{
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(chore)
					}
				)

				setChores(prevChores =>
					prevChores.map(prevChore =>
						prevChore._id === choreId ? { ...chore, _id: choreId } : prevChore
					)
				)
			} else {
				// If choreId is not provided, add new chore
				await fetch(
					`https://chores-service.onrender.com/chores/room/${roomId}`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(chore)
					}
				)
				setChores([...chores, chore])
			}
		} catch (error) {
			console.error('Failed to add or update chore', error)
		}
	}

	const handleDeleteChore = async (choreId: number) => {
		try {
			await fetch(
				`https://chores-service.onrender.com/chores/room/${roomId}/chore/${choreId}`,
				{
					method: 'DELETE'
				}
			)

			setChores(chores.filter(chore => chore._id !== choreId))
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
						<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
							{chores.map(chore => (
								<ChoreComponent
									chore={chore}
									key={chore._id}
									onEdit={() => {
										setSelectedChore(chore) // Set selectedChore when editing a chore
										setChoreModalOpen(true)
									}}
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
								handleAddChore(chore, choreId) // Pass choreId to handleAddChore for editing scenario
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
