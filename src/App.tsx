import LoadingOrError from 'components/LoadingOrError'
import type { ReactElement } from 'react'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Home = lazy(async () => import('pages/Home'))
const Rooms = lazy(async () => import('pages/Rooms'))
const Details = lazy(async () => import('pages/Room'))
const Tasks = lazy(async () => import('pages/Tasks'))

export default function App(): ReactElement {
	return (
		<BrowserRouter>
			<div style={{ position: 'relative' }}>
				{/* Parent container with position: sticky */}
				<Suspense fallback={<LoadingOrError />}>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/rooms' element={<Rooms />} />
						<Route path='/rooms/:roomId' element={<Details />} />
						<Route path='/tasks' element={<Tasks />} />
					</Routes>
				</Suspense>
			</div>
		</BrowserRouter>
	)
}
