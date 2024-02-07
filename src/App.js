import './App.css';
import {Route, Routes} from 'react-router-dom';
import AuthProvider from './utils/authContext.context';
import Overview from './pages/overview/overview';

function App() {
    return (
        <AuthProvider>
            <div className="App">
                <Routes>
                    <Route path={'/'} element={<Overview/>}/>
                </Routes>
            </div>
        </AuthProvider>
    );
}

export default App;
