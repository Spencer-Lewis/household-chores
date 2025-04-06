import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import { Chore, Room } from '../types'

interface RoomListProps {
	rooms: Room[]
	onDeleteRoom: (roomId: number) => void
	deleteMode: boolean
}

const RoomList: React.FC<RoomListProps> = ({
	rooms,
	onDeleteRoom,
	deleteMode,
	chores
}) => {
	const getChoresForRoom = (room: Room): Chore[] => {
		const roomChores: Chore[] = []
		chores.forEach(chore => {
			if (chore.roomName == room.name) roomChores.push(chore)
		})
		return roomChores
	}

	const handleDeleteRoom = (roomId: number) => {
		onDeleteRoom(roomId)
	}

	return (
		<div className='grid flex-1 gap-4 overflow-y-auto md:grid-cols-2 lg:grid-cols-3'>
			{rooms.map(room => (
				<div key={room.id} className='relative rounded-md bg-gray-700 p-4'>
					{deleteMode && (
						<span className={'absolute top-2 right-2'}>
							<button type='button' onClick={() => handleDeleteRoom(room.id)}>
								<FontAwesomeIcon
									icon={faTrashAlt}
									className='mt-3 mr-2 text-4xl text-red-500  '
								/>
							</button>
						</span>
					)}
					<Link to={`/rooms/${room.id}`}>
						<div>
							<h3 className='text-lg font-bold'>{room.name}</h3>
							<p className='text-gray-400'>
								Chores: {getChoresForRoom(room).length}
							</p>
						</div>
					</Link>
				</div>
			))}
		</div>
	)
}

export default RoomList
