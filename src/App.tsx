import LoadingOrError from 'components/LoadingOrError';
import NavBar from 'components/NavBar'; // Import the NavBar component
import type { ReactElement } from 'react';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Home = lazy(async () => import('pages/Home'));
const Rooms = lazy(async () => import('pages/Rooms'));
const Details = lazy(async () => import('pages/Room'));

export default function App(): ReactElement {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingOrError />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/:roomId" element={<Details />} />
        </Routes>
        <NavBar />
      </Suspense>
    </BrowserRouter>
  );
}
