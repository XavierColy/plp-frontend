import './App.css';
import {Route, Routes} from 'react-router-dom';
import AuthProvider from './utils/authContext.context';
import Overview from './pages/overview/overview';
import HostPage from './pages/hostPage/nodePage';

function App() {
    return (
        <AuthProvider>
            <div className="App">
                <Routes>
                    <Route path={'/'} element={<Overview/>}/>
                    <Route path={'/test'} element={<HostPage/>}/>
                </Routes>
            </div>
        </AuthProvider>
    );
}

export default App;
