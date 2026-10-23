import { Route, Routes } from 'react-router-dom';
import AppShell from '@/layouts/AppShell';
import HomePage from '@/pages/HomePage';

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<HomePage />} />
      </Route>
    </Routes>
  );
}
