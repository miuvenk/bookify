import './App.css';
import Sidepanel from './components/Sidepanel';
import AppRoutes from './routes/AppRoutes';
import { SnackbarProvider } from 'notistack';

function App() {

  return (
    <SnackbarProvider maxSnack={4}
      preventDuplicate
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      autoHideDuration={6000}
    >
        <div className="flex max-w-screen-xl font-mono">
          <div className='p-6 z-50'>
            <Sidepanel />
          </div>
          <div className="ml-64 p-6 pl-0 w-full">
              <AppRoutes />
            </div>
          </div>
    </SnackbarProvider>
  );
}

export default App;
