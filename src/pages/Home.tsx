import { ChoresDueList } from 'components/ChoresDueList'
import { useContext, useEffect, useState } from 'react'
import { Chore } from 'types'
import isChoreDueToday from 'utils/isChoreDueToday'
import { AppContext } from '../AppContextProvider'

const HomeDashboard = () => {
	const { chores, rooms, markChoreCompleted } = useContext(AppContext)

	const [choresDueToday, setChoresDueToday] = useState<Chore[]>([])

	useEffect(() => {
		const calculateChoresDueToday = () => {
			const dueToday = chores.filter(isChoreDueToday)
			setChoresDueToday(dueToday)
		}

		calculateChoresDueToday()
	}, [chores])

	const handleCheckmarkClick = async (chore: Chore): Promise<void> => {
		const room = rooms.filter(room => room.name != chore.name)
		await markChoreCompleted(room[0].id, chore)
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
