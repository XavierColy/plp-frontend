import './App.css';
import {Navigate, Route, Routes} from 'react-router-dom';
import AuthProvider from './utils/authContext.context';
import Overview from './pages/overview/overview';
import Snmp from './pages/snmp/snmp';
import Windows from './pages/windows/windows';
import LoginPage from './pages/login/loginPage';
import AuthGuard from './utils/authGuard';
import NodePage from './pages/nodePage/nodePage';
import HostPage from './pages/hostPage/hostPage';

function App() {
    return (
        <AuthProvider>
            <div className="App">
                <Routes>
                    <Route path={"/"} element={<Navigate to={'/login'}/>}/>
                    <Route index path={'/login'} element={<LoginPage/>}/>
                    <Route element={<AuthGuard/>}>
                        <Route path={'/overview'} element={<Overview/>}/>
                        <Route path={'/nodeExporter/:hostname'} element={<NodePage/>}/>
                        <Route path={'/snmpExporter'} element={<Snmp/>}/>
                        <Route path={'/windows/:hostname'} element={<Windows/>}/>
                        <Route path={'/hosts'} element={<HostPage/>}/>
                    </Route>
                </Routes>
            </div>
        </AuthProvider>
    );
}

export default App;
