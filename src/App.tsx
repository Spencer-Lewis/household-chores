import NavBar from 'components/NavBar'
import Home from 'pages/Home'
import Details from 'pages/Room'
import Rooms from 'pages/Rooms'
import Tasks from 'pages/Tasks'
import withNavBar from 'pages/withNavBar'
import type { ReactElement } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
//  Hello
const WrappedHome = withNavBar(Home)
const WrappedRooms = withNavBar(Rooms)
const WrappedDetails = withNavBar(Details)
const WrappedTasks = withNavBar(Tasks)

export default function App(): ReactElement {
	return (
		<BrowserRouter>
			<div style={{ position: 'relative' }}>
				<Routes>
					<Route path='/' element={<WrappedHome />} />
					<Route path='/rooms' element={<WrappedRooms />} />
					<Route path='/rooms/:roomId' element={<WrappedDetails />} />
					<Route path='/tasks' element={<WrappedTasks />} />
				</Routes>
				<NavBar />
			</div>
		</BrowserRouter>
	)
}
