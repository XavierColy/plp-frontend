import SideBar from '../../components/sideBar/sideBar';
import './overview.css'
import {FaCaretDown} from 'react-icons/fa';
import yaml from './vmagent.yml'
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';


export default function Overview() {
    const [hosts, setHosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(yaml)
            .then(r => r.text())
            .then((yam) => {

                let output = [];
                let jobName = '';
                let exporterFound = false;
                let targetsFound = false;

                // Séparer le fichier en lignes
                const lines = yam.split('\n');

                // Parcourir chaque ligne du fichier
                lines.forEach((line) => {
                    // Ignorer les lignes vides ou commentées
                    if (line.trim() === '' || line.trim().startsWith('#')) return;

                    // Vérifier si la ligne commence par un tiret car seule ces lignes contiennent les informations nécessaires
                    const match = line.match(/^\s*-.*$/);
                    if (!match) return;

                    // Extraire le nom du job s'il existe
                    const jobMatch = line.match(/^\s*-?\s*job_name:\s*(\S+)/);
                    if (jobMatch) {
                        jobName = jobMatch[1];
                        exporterFound = jobName.includes('exporter');
                        if (!exporterFound) {
                            jobName = '';
                        } else {
                            targetsFound = false; // Réinitialiser la recherche des cibles
                        }
                        return;
                    }

                    // Si le jobname ne contient pas la chaîne "exporter",
                    if (!exporterFound) {
                        return;
                    }

                    // Vérifier si nous sommes dans la section des cibles
                    if (line.includes('targets')) {
                        targetsFound = true; // Les lignes suivantes seront possiblement les cibles
                        return; // Ne rien faire pour la ligne "targets:"
                    }

                    if (targetsFound) {
                        // On sait qu'il y a des cibles
                        // Extraire les adresses IP, types de machines et hostnames
                        const ipMatch = line.match(
                            /^\s*-?\s*"?https?:\/\/?(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})"?|^\s*-?\s*"?(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})"?/
                        );
                        if (ipMatch) {
                            const ip = ipMatch[1] || ipMatch[2];
                            const machineMatch = line.match(/Machine:\s*(.*?)\s*Hostname:/);
                            const machine = machineMatch ? machineMatch[1].trim() : '';
                            const hostnameMatch = line.match(/Hostname:\s*(.*)/);
                            const hostname = hostnameMatch ? hostnameMatch[1].trim() : '';
                            output.push({jobName, ip, machine, hostname});
                        }
                    }
                });
                setHosts(output);
            });
    }, []);

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

    const handleNav = (hote) => {
        switch (hote.jobName) {
            case "node_exporter":
                navigate('/nodeExporter', {state: {hostIp: hote.ip}});
                break;
            case "windows_exporter_client":
                navigate('/windows', {state: {hostIp: hote.ip}});
                break;
            case "windows_exporter_server":
                navigate('/windows', {state: {hostIp: hote.ip}});
                break;
            case "snmp_exporter":
                navigate('/snmpExporter', {state: {hostIp: hote.ip}});
                break;
        }
    }

    return (
        <div id={"overview"}>
            <SideBar></SideBar>
            <div id={"overview-main"}>
                <h1>Vue d'ensemble</h1>
                <div id={"divider"}></div>
                <main>
                    <section id={"left-section"}>
                        <h2>Hôtes</h2>
                        <div className={"card"} id={"host-availability"}>
                            <span className={"availability-header"}>Disponible</span>
                            <span className={"availability-header"}>Non disponible</span>
                            <span className={"availability-header"}>Inconnu</span>
                            <span className={"availability-footer"}>{hosts.length}</span>
                            <span className={"availability-footer"}>0</span>
                            <span className={"availability-footer"}>0</span>
                        </div>
                        <div id={"hosts"}>
                            {hosts.map((host,index) => {
                                if (index < 9)
                                return (
                                    <div className={"host"} style={setBoxShadow(host)} onClick={() => {
                                        handleNav(host)
                                    }}>
                                        <p>Nom</p>
                                        <p>{host.hostname}</p>
                                    </div>);
                            })}
                        </div>
                    </section>
                    <section>
                        <div id={"date-sort"} className={"card"}>
                            <span>31/01/2024</span>
                            <FaCaretDown/>
                        </div>
                        <div className={"card"} id={"alerts"}>
                            <div>
                                <h3>Alertes</h3>
                                <span>Voir plus</span>
                            </div>
                            <table>
                                <thead>
                                <tr>
                                    <th></th>
                                    <th>Heure</th>
                                    <th>Hôte</th>
                                    <th>Problème</th>
                                    <th>Durée</th>
                                </tr>
                                </thead>
                                <tbody>
                                {[1, 2, 3, 4, 5, 6, 7, 8].map(() => {
                                    return (
                                        <tr>
                                            <td className={"alert-level"}>
                                                <div></div>
                                            </td>
                                            <td>10:51:52</td>
                                            <td>Web Server</td>
                                            <td>Linux: Number of installed packages has been changed</td>
                                            <td>7h 4mn 12s</td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}