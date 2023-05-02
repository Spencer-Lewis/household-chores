import { fetchRooms, fetchTasks } from 'api/choresServiceApiClient'
import NavBar from 'components/NavBar'
import type { ReactElement } from 'react'
import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import isChoreDueToday from 'utils/isChoreDueToday'
import { Room, Task, Chore } from 'types'
import withNavBar from 'pages/withNavBar'
import Home from 'pages/Home'
import Rooms from 'pages/Rooms'
import Details from 'pages/Room'
import Tasks from 'pages/Tasks'

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
