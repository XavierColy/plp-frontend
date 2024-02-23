import SideBar from '../../components/sideBar/sideBar';
import {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {IoAddCircleOutline} from 'react-icons/io5';
import {hostsContext} from '../../utils/authContext.context';
import './hostPage.css';


export default function HostPage() {
    const {hosts} = useContext(hostsContext);
    const navigate = useNavigate();

    const handleNav = (hote) => {
        switch (hote.jobName) {
            case "node_exporter":
                navigate(`/nodeExporter/${hote.hostname}`, {state: {hostIp: hote.ip}});
                break;
            case "windows_exporter_client":
                navigate(`/windows/${hote.hostname}`, {state: {hostIp: hote.ip}});
                break;
            case "windows_exporter_server":
                navigate(`/windows/${hote.hostname}`, {state: {hostIp: hote.ip}});
                break;
            case "snmp_exporter":
                navigate('/snmpExporter', {state: {hostIp: hote.ip}});
                break;
        }
    }

    const setBoxShadow = (hote) => {
        switch (hote.jobName) {
            case "node_exporter":
                return {boxShadow: '2px 4px 4px 2px var(--primary-light)'};
            case "windows_exporter_client":
                return {boxShadow: '2px 4px 4px 2px var(--alert-info)'};
            case "windows_exporter_server":
                return {boxShadow: '2px 4px 4px 2px var(--red-light)'};
            case "snmp_exporter":
                return {boxShadow: '2px 4px 4px 2px var(--green-bright)'};
            default:
                return {boxShadow: '2px 4px 4px 2px var(--gray)'};
        }
    }


    return (
        <div id={"overview"}>
            <SideBar></SideBar>
            <div id={"overview-main"}>
                <div>
                    <header>
                        <h1>Hôtes</h1>
                        <div id={"settings"}>
                            <div className={"card"}>
                                <IoAddCircleOutline />
                                <span>Ajouter un hôte</span>
                            </div>
                        </div>
                    </header>
                    <div id={"divider"}></div>
                </div>
                <div id={"hosts_display"}>
                    {hosts.map((host)=>{
                        return(
                            <div className={"card"} id={"host_display"} onClick={()=>{handleNav(host)}} style={setBoxShadow(host)}>
                                <p>Nom: {host.hostname}</p>
                                <p>Machine: {host.machine}</p>
                                <p>Adresse IP: {host.ip}</p>
                                <p>Exporter: {host.jobName}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}