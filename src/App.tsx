import { Route, Routes } from 'react-router-dom';
import AppShell from '@/layouts/AppShell';
import RespondPage from '@/pages/RespondPage';

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<RespondPage />} />
      </Route>
    </Routes>
  );
}
