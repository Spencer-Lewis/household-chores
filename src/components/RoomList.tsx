import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import { Room } from '../types'

interface RoomListProps {
	rooms: Room[]
	onDeleteRoom: (roomId: number) => void
	deleteMode: boolean
}

const RoomList: React.FC<RoomListProps> = ({
	rooms,
	onDeleteRoom,
	deleteMode
}) => {
	const handleDeleteRoom = (roomId: number) => {
		onDeleteRoom(roomId)
	}

	return (
		<div className='grid gap-4 md:grid-cols-2'>
			{rooms.map(room => (
				<div key={room._id} className='relative rounded-md bg-gray-700 p-4'>
					{deleteMode && (
						<span className={'absolute top-2 right-2'}>
							<button type='button' onClick={() => handleDeleteRoom(room._id)}>
								<FontAwesomeIcon
									icon={faTrashAlt}
									className='mt-3 mr-2 text-4xl text-red-500  '
								/>
							</button>
						</span>
					)}
					<Link to={`/rooms/${room._id}`}>
						<div>
							<h3 className='text-lg font-bold'>{room.name}</h3>
							<p className='text-gray-400'>Chores: {room.chores.length}</p>
						</div>
					</Link>
				</div>
			))}
		</div>
	)
}

export default RoomList
