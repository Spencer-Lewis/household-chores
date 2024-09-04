import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Chore } from '../types'

interface Props {
	choresDueToday: Chore[]
	onCheckmarkClick: (chore: Chore) => void
}

export const ChoresDueList: React.FC<Props> = ({
	choresDueToday,
	onCheckmarkClick
}) => {
	const [selectedChoreId, setSelectedChoreId] = useState<number | null>(null)

	const handleChoreItemClick = (choreId: number) => {
		if (choreId == selectedChoreId) {
			setSelectedChoreId(null)
		} else {
			setSelectedChoreId(choreId)
		}
	}

	const handleCheckmarkClick = (e: React.MouseEvent, chore: Chore) => {
		e.stopPropagation()
		onCheckmarkClick(chore)
	}

	return (
		<ul className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
			{choresDueToday.length > 0 ? (
				choresDueToday.map(chore => (
					<li
						key={chore.id}
						className='relative cursor-pointer rounded-md bg-gray-700 py-3 px-4 text-white hover:bg-gray-600'
						onClick={() => handleChoreItemClick(chore.id)}
					>
						<div>
							<h3 className='text-lg font-bold'>{chore.name}</h3>
							<p className='text-gray-400'>{chore.roomName}</p>
						</div>
						<span
							className={`absolute top-2 right-2 ${
								selectedChoreId === chore.id ? '' : 'hidden'
							}`}
						>
							<button
								type='button'
								className='rounded-full p-2'
								onClick={e => handleCheckmarkClick(e, chore)}
							>
								<FontAwesomeIcon
									icon={faCheckCircle}
									className={`text-4xl text-green-500 ${
										selectedChoreId === chore.id ? 'animate-checkmark' : ''
									}`}
								/>
								<span className='pointer-events-none absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-green-500 opacity-0'></span>
							</button>
						</span>
					</li>
				))
			) : (
				<li className='flex justify-center text-gray-500'>
					No chores due today
				</li>
			)}
		</ul>
	)
}
