import React, { useEffect, useState } from 'react'
import { Room } from 'types'

interface RoomModalProps {
	isOpen: boolean
	onClose: () => void
	onCreateRoom: (room: Room) => void
}

const RoomModal: React.FC<RoomModalProps> = ({
	isOpen,
	onClose,
	onCreateRoom
}) => {
	const [roomName, setRoomName] = useState('')

	// Clear the roomName state when the modal is opened
	useEffect(() => {
		if (isOpen) {
			setRoomName('')
		}
	}, [isOpen])

	const handleCreateRoom = () => {
		if (roomName.trim() === '') {
			// Perform validation if required
			return
		}

		let newRoom: Room = {
			name: roomName
		}
		onCreateRoom(newRoom)
		onClose()
	}

	return (
		<div
			className={`fixed top-0 left-0 right-0 bottom-0 z-10 bg-gray-800 bg-opacity-50 ${
				isOpen ? 'block' : 'hidden'
			}`}
		>
			<div className='mx-auto mt-12 w-96 rounded-md bg-gray-700 p-4 shadow-md'>
				<h2 className='mb-4 text-2xl font-semibold text-white'>Add Room</h2>
				<form>
					<div className='mb-4'>
						<label
							htmlFor='roomName'
							className='mb-1 block font-medium text-white'
						>
							Room Name
						</label>
						<input
							type='text'
							id='roomName'
							className='w-full rounded-md border-gray-300 bg-gray-800 px-3 py-2 text-white focus:border-blue-500 focus:outline-none'
							value={roomName}
							onChange={e => setRoomName(e.target.value)}
						/>
					</div>
					<div className='flex justify-end'>
						<button
							type='button'
							className='mr-2 rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-700'
							onClick={handleCreateRoom}
						>
							Add
						</button>
						<button
							type='button'
							className='rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600'
							onClick={onClose}
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default RoomModal
