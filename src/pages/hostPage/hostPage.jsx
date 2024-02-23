import SideBar from '../../components/sideBar/sideBar';
import {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {IoAddCircleOutline} from 'react-icons/io5';
import {hostsContext} from '../../utils/authContext.context';
import Modal from 'react-modal';
import './hostPage.css';
import {HiOutlineClipboardCopy} from 'react-icons/hi';


export default function HostPage() {
    const {hosts} = useContext(hostsContext);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleNav = (hote) => {
        switch (hote.jobName) {
            case "node_exporter":
                navigate(`/nodeExporter`, {state: {hostIp: hote.ip}});
                break;
            case "windows_exporter_client":
                navigate(`/windows`, {state: {hostIp: hote.ip}});
                break;
            case "windows_exporter_server":
                navigate(`/windows`, {state: {hostIp: hote.ip}});
                break;
            case "snmp_exporter":
                navigate('/snmpExporter');
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
                            <div className={"card"} id={"add"} onClick={() => setIsOpen(true)}>
                                <IoAddCircleOutline/>
                                <span>Ajouter un hôte</span>
                            </div>
                        </div>
                    </header>
                    <div id={"divider"}></div>
                </div>
                <div id={"hosts_display"}>
                    {hosts.map((host) => {
                        return (
                            <div className={"card"} id={"host_display"} onClick={() => {
                                handleNav(host)
                            }} style={setBoxShadow(host)}>
                                <p>Nom: {host.hostname}</p>
                                <p>Machine: {host.machine}</p>
                                <p>Adresse IP: {host.ip}</p>
                                <p>Job: {host.jobName}</p>
                            </div>
                        );
                    })}
                </div>
                <Modal isOpen={isOpen}
                       onRequestClose={() => setIsOpen(false)}
                       contentLabel="Example Modal" style={customStyles}>
                    <p>Pour ajouter un hôte, exécutez la commande suivante dans votre terminal.</p>
                    <div id={"code_frame"}>
                        <div>
                            <span>bash</span>
                            <div
                                onClick={() =>
                                    navigator.clipboard.writeText("su\nsudo python3 /etc/vmagent/bin/add_hosts.py")
                                        .then(() => {
                                            setIsOpen(false)
                                        })}
                                id={"click"}>
                                <HiOutlineClipboardCopy/>
                                <span>Copier</span>
                            </div>
                        </div>
                        <div>
                            <p>su</p>
                            <p>sudo python3 /etc/vmagent/bin/add_hosts.py</p>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
);
}

const customStyles = {
    content: {
        top: '50%',
            left
    :
        '50%',
            right
    :
        'auto',
            bottom
    :
        'auto',
            marginRight
    :
        '-50%',
            transform
    :
        'translate(-50%, -50%)',
            backgroundColor
    :
        'gray',
            color
    :
        'white'
    }
,
};