import './App.css';
import {Navigate, Route, Routes} from 'react-router-dom';
import AuthProvider from './utils/authContext.context';
import Overview from './pages/overview/overview';
import HostPage from './pages/hostPage/nodePage';
import Snmp from './pages/snmp/snmp';
import Vm from './pages/vm/vm';
import Windows from './pages/windows/windows';
import LoginPage from './pages/login/loginPage';
import AuthGuard from './utils/authGuard';
import ChangePasswd from './pages/login/changePasswd';

function App() {
    return (
        <AuthProvider>
            <div className="App">
                <Routes>
                    <Route path={"/"} element={<Navigate to={'/login'}/> }/>
                    <Route index path={'/login'} element={<LoginPage/>}/>
                    <Route element={<AuthGuard/>}>
                        <Route path={'/overview'} element={<Overview/>}/>
                        <Route path={'/nodeExporter'} element={<HostPage/>}/>
                        <Route path={'/snmpExporter'} element={<Snmp/>}/>
                        <Route path={'/vm'} element={<Vm/>}/>
                        <Route path={'/windows'} element={<Windows/>}/>
                        <Route path={'changePasswd'} element={<ChangePasswd/>}/>
                    </Route>
                </Routes>
            </div>
        </AuthProvider>
    );
}

export default App;
