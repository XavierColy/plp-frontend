import SideBar from '../../components/sideBar/sideBar';
import './overview.css'
import {FaCaretDown} from 'react-icons/fa';


export default function Overview() {
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
                            <span className={"availability-footer"}>3</span>
                            <span className={"availability-footer"}>0</span>
                            <span className={"availability-footer"}>0</span>
                        </div>
                        <div id={"hosts"}>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => {
                                return (
                                    <div className={"host"}>
                                        <p>Nom</p>
                                        <p>Zabbix Server</p>
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
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(() => {
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