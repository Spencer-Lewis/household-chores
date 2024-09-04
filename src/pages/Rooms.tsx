import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { createRoom, deleteRoom } from 'api/choresServiceApiClient'
import RoomList from 'components/RoomList'
import { useContext, useState } from 'react'
import { AppContext } from '../AppContextProvider'
import RoomModal from '../components/RoomModal'
import { Room } from '../types'

const RoomsPage = () => {
	const { rooms, setRooms, chores, updateRoom } = useContext(AppContext)
	const [roomModalOpen, setRoomModalOpen] = useState(false)
	const [deleteMode, setDeleteMode] = useState(false)

	const handleAddRoom = () => {
		setRoomModalOpen(true)
	}

	const onCreateRoom = async (roomData: Room) => {
		setRoomModalOpen(false)
		const createdRoom = await createRoom(roomData)
		setRooms(prevRooms => [...prevRooms, createdRoom])
	}

	const handleDeleteRoom = async (roomId: string) => {
		try {
			await deleteRoom(roomId)
			setRooms(prevRooms => prevRooms.filter(room => room.id !== roomId))
		} catch (error) {
			console.error('Failed to delete room', error)
		}
	}

	return (
		<div className='min-h-screen bg-gray-900 text-white'>
			<div className='fixed top-0 left-0 right-0 z-50 py-8'>
				<div className='container mx-auto px-4'>
					<h1 className='mb-2 flex justify-center text-4xl font-bold'>Rooms</h1>
					<div className='flex justify-center'>
						<button
							type='button'
							className='mr-6 mb-5 rounded-md px-4 py-2 text-red-500 hover:text-red-700'
							onClick={() => setDeleteMode(!deleteMode)}
						>
							<FontAwesomeIcon icon={faTrashAlt} className='mr-2' />
						</button>
						<button
							className='font-serif ml-6 mb-4 rounded-md border-none bg-transparent py-2 px-4 text-lg font-semibold text-green-500 hover:bg-green-500 hover:text-white focus:outline-none'
							onClick={handleAddRoom}
						>
							<span className='inline-block animate-pulse'>+</span> Add Room
						</button>
					</div>
					<div className='max-h-[33.5rem] overflow-y-auto'>
						<RoomList
							rooms={rooms}
							chores={chores}
							onDeleteRoom={handleDeleteRoom}
							deleteMode={deleteMode}
						/>
					</div>
					<RoomModal
						isOpen={roomModalOpen}
						onClose={() => setRoomModalOpen(false)}
						onCreateRoom={onCreateRoom}
					/>
				</div>
			</div>
		</div>
	)
}

export default RoomsPage
