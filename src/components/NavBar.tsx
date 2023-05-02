import {
	faCheckCircle,
	faHome,
	faScrewdriverWrench
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useLocation } from 'react-router-dom'

const NavBar = (choresDue: any, tasks: any) => {
	const location = useLocation()
	const currentPath = location.pathname
	return (
		<nav
			className='fixed bottom-0 left-0 flex w-full justify-around bg-gray-700 p-4'
			style={{ position: 'fixed', zIndex: '9999' }}
		>
			<Link
				to='/'
				className={` ${
					!currentPath.includes('room') && !currentPath.includes('task')
						? 'text-green-500'
						: 'text-white'
				}`}
			>
				<FontAwesomeIcon icon={faCheckCircle} className='text-md mr-2' />
				<span className='text-md font-bold'>Chores Due</span>
			</Link>
			<Link
				to='/tasks'
				className={` ${
					currentPath.includes('tasks') ? 'text-green-500' : 'text-white'
				}`}
			>
				<FontAwesomeIcon icon={faScrewdriverWrench} className='text-md mr-2' />
				<span className='text-md font-bold'>Tasks</span>
			</Link>
			<Link
				to='/rooms'
				className={`${
					currentPath.includes('room') ? 'text-green-500' : 'text-white '
				}`}
			>
				<FontAwesomeIcon icon={faHome} className='text-md mr-2' />
				<span className='text-md font-bold'>Chore Setup</span>
			</Link>
		</nav>
	)
}

export default NavBar
