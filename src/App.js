import './App.css';
import {Route, Routes} from 'react-router-dom';
import AuthProvider from './utils/authContext.context';
import Overview from './pages/overview/overview';
import HostPage from './pages/hostPage/nodePage';
import Snmp from './pages/snmp/snmp';

function App() {
    return (
        <AuthProvider>
            <div className="App">
                <Routes>
                    <Route path={'/'} element={<Overview/>}/>
                    <Route path={'/nodeExporter'} element={<HostPage/>}/>
                    <Route path={'/snmpExporter'} element={<Snmp/>}/>
                    <Route path={'/vm'} element={<Vm/>}/>
                    <Route path={'/windows'} element={<Windows/>}/>
                </Routes>
            </div>
        </AuthProvider>
    );
}

export default App;
