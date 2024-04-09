import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Home from './pages/Home';
import styled from 'styled-components';
import {createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider} from 'react-router-dom';
import urls from './urls';
import Exercise1 from './pages/Exercise1';
import Exercise2 from './pages/Exercise2';

const queryClient = new QueryClient();

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Layout = () => (
  <Container>
    <Outlet />
  </Container>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path={urls.Exercise1} element={<Exercise1 />} />
      <Route path={urls.Exercise2} element={<Exercise2 />} />
      <Route path={urls.Home} element={<Home />} />
    </Route>
  )
);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
