import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../AppContextProvider'
import ChoreComponent from '../components/Chore'
import ChoreModal from '../components/ChoreModal'
import { Chore } from '../types'

const RoomDetail: React.FC = () => {
	const {
		rooms,
		chores,
		markChoreCompleted,
		updateChore,
		deleteChore,
		createChore
	} = useContext(AppContext) || {}
	const { roomId } = useParams<{ roomId: string }>()
	const [choreModalOpen, setChoreModalOpen] = useState(false)
	const [selectedChore, setSelectedChore] = useState<Chore | null>(null)

	// Determine the current room and relevant chores based on roomId
	const room = rooms.find(room => room.id === roomId) || null
	const filteredChores = chores.filter(chore => chore.roomName === room.name)

	const handleCheckmarkClick = async (chore: Chore) => {
		if (room) {
			try {
				await markChoreCompleted(roomId, chore)
				// Since `markChoreCompleted` updates the context, there's no need to update local state
			} catch (error) {
				console.error('Failed to update chore completion', error)
			}
		}
	}

	const handleSaveChore = async (chore: Chore, choreId?: string) => {
		try {
			if (choreId != null) {
				await updateChore(roomId, { ...chore, id: choreId })
			} else {
				await createChore(roomId, chore)
			}
		} catch (error) {
			console.error('Failed to add or update chore', error)
		}
	}

	const handleDeleteChore = async (choreId: string) => {
		try {
			deleteChore(room.id, choreId)
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
							{filteredChores.map(chore => (
								<ChoreComponent
									chore={chore}
									key={chore.id}
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
