import LoadingOrError from 'components/LoadingOrError'
import { sampleRooms } from 'mocks/data/rooms'
import type { ReactElement } from 'react'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Home = lazy(async () => import('pages/Home'))
const Details = lazy(async () => import('pages/Room'))

export default function App(): ReactElement {
	return (
		<BrowserRouter>
			<Suspense fallback={<LoadingOrError />}>
				<Routes>
					<Route path='/' element={<Home rooms={sampleRooms} />} />
					<Route path='/rooms/:roomId' element={<Details />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	)
}
