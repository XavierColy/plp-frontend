import SideBar from '../../components/sideBar/sideBar';
import './overview.css'
import {FaCaretDown} from 'react-icons/fa';


export default function Overview(){
    return(
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
                            <div className={"host"}>
                                <p>Nom</p>
                                <p>Zabbix Server</p>
                            </div>
                            <div className={"host"}>
                                <p>Nom</p>
                                <p>Zabbix Server</p>
                            </div>
                            <div className={"host"}>
                                <p>Nom</p>
                                <p>Zabbix Server</p>
                            </div>
                            <div className={"host"}>
                                <p>Nom</p>
                                <p>Zabbix Server</p>
                            </div>
                            <div className={"host"}>
                                <p>Nom</p>
                                <p>Zabbix Server</p>
                            </div>
                            <div className={"host"}>
                                <p>Nom</p>
                                <p>Zabbix Server</p>
                            </div>

                        </div>
                    </section>
                    <section>
                        <div id={"date-sort"} className={"card"}>
                            <span>31/01/2024</span>
                            <FaCaretDown />
                        </div>
                        <div className={"card"} id={"alerts"}>
                            <h3>Alertes</h3>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}