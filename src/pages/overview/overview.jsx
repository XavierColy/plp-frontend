import SideBar from '../../components/sideBar/sideBar';
import './overview.css'
import {FaCaretDown} from 'react-icons/fa';
import jsyaml from "js-yaml";
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
                const hotes = [];
                let json = jsyaml.load(yam);
                for (const job of json.scrape_configs) {
                    const jobNames = ["node_exporter", "windows_exporter_client", "windows_exporter_server", "snmp_exporter"];
                    console.log(job.job_name);
                    if (jobNames.includes(job.job_name)) {
                        console.log(jobNames.includes(job.job_name));
                        for (const config of job.static_configs) {
                            for (const url of config.targets) {
                                console.log(url);
                                const re = new RegExp('https?:\/\/')
                                const re2 = new RegExp(':[0-9]{4}')
                                let ip = url.replace(re, '');
                                ip = ip.replace(re2, '');
                                hotes.push({ip: ip, exporter: job.job_name});
                            }
                        }
                    }
                }
                console.log(hotes);
                setHosts(hotes);
            }).then(() => console.log(hosts));

    }, [hosts]);

    const setBoxShadow = (hote) => {
        switch (hote.exporter) {
            case "node_exporter":
                return {boxShadow: '2px 4px 4px 2px var(--primary-light)'};
            case "windows_exporter_client":
                return {boxShadow: '2px 4px 4px 2px var(--alert-info)'};
            case "windows_exporter_server":
                return {boxShadow: '2px 4px 4px 2px var(--red-light)'};
            case "snmp_exporter":
                return {boxShadow: '2px 4px 4px 2px var(--green-bright)'};
        }
    }

    const handleNav = (hote) => {
        switch (hote.exporter) {
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
                            {hosts.map((host) => {
                                return (
                                    <div className={"host"} style={setBoxShadow(host)} onClick={() => {
                                        handleNav(host)
                                    }}>
                                        <p>Nom</p>
                                        <p>{host.ip}</p>
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