import SideBar from '../../components/sideBar/sideBar';
import {LuRefreshCcw} from 'react-icons/lu';
import {FaCaretDown} from 'react-icons/fa';
import {useEffect, useState} from 'react';
import {IoMdTime} from 'react-icons/io';
import {useLocation} from 'react-router-dom';

export default function Snmp() {
    const vmIp = 'localhost';
    const [refreshTime, setRefreshTime] = useState('10s');
    const [from, setFrom] = useState('24h');
    const [url, setUrl] = useState(`http://${vmIp}:3000/d-solo/7qKD6I1Wk/snmp-stats?orgId=1&refresh=${refreshTime}&theme=light&from=now-${from}&to=now`);

    useEffect(() => {
        if (url.includes("&refresh")) {
            if (refreshTime === 'off') {
                const re = new RegExp("(&refresh=)[0-9]+[smhd]");
                const tmp = url.replace(re, "");
                setUrl(tmp);
            } else {
                const re = new RegExp("(&refresh=)[0-9]+[smhd]");
                const add = `&refresh=${refreshTime}`;
                const tmp = url.replace(re, add);
                setUrl(tmp);
            }
        } else {
            if (refreshTime !== 'off') {
                const add = `&refresh=${refreshTime}`;
                const tmp = url.concat(add);
                setUrl(tmp)
            }
        }
    }, [refreshTime, url]);

    useEffect(() => {
        const re = new RegExp("(&from=now-)[0-9]+[mhd](&to=now)");
        const add = `&from=now-${from}&to=now`;
        const tmp = url.replace(re, add);
        setUrl(tmp);
    }, [url, from]);
    return (
        <div id={"nodePage"}>
            <SideBar></SideBar>
            <div id={"overview-main"}>
                <div>
                    <header>
                        <h1>SNMP : Vue d'ensemble</h1>
                        <div id={"settings"}>
                            <div className={"card"}>
                                <IoMdTime/>
                                <select defaultValue={from}
                                        onChange={v => setFrom(v.target.value)}>
                                    <option value={"5m"}>Dernières 5 minutes</option>
                                    <option value={"15m"}>Dernières 15 minutes</option>
                                    <option value={"30m"}>Dernières 30 minutes</option>
                                    <option value={"1h"}>Dernière heure</option>
                                    <option value={"3h"}>Dernières 3 heures</option>
                                    <option value={"6h"}>Dernières 6 heures</option>
                                    <option value={"12h"}>Dernières 12 heures</option>
                                    <option value={"24h"}>Dernières 24 heures</option>
                                    <option value={"2j"}>Derniers 2 jours</option>
                                </select>
                            </div>
                            <div className={"card"}>
                                <LuRefreshCcw/>
                                <select defaultValue={refreshTime}
                                        onChange={v => setRefreshTime(v.target.value)}>
                                    <option value={"off"}>Non</option>
                                    <option value={"5s"}>5s</option>
                                    <option value={"10s"}>10s</option>
                                    <option value={"30s"}>30s</option>
                                    <option value={"1m"}>1m</option>
                                    <option value={"5m"}>5m</option>
                                    <option value={"15m"}>15m</option>
                                    <option value={"30m"}>30m</option>
                                    <option value={"1h"}>1h</option>
                                    <option value={"2h"}>2h</option>
                                    <option value={"1d"}>1d</option>
                                </select>
                            </div>
                        </div>
                    </header>
                    <div id={"divider"}></div>
                </div>
                <main>
                    <section id={"overview-sec"}>
                        <h2>Vue d'ensemble</h2>
                        <div id={"overview-section"}>
                            <div className={"fle-col"}>
                                <iframe src={url + "&panelId=24"} width="200" height="100"></iframe>
                                <iframe src={url + "&panelId=23"} width="200" height="100"></iframe>
                            </div>
                            <div className={"fle-col"}>
                                <iframe src={url + "&panelId=25"} width="200" height="100"></iframe>
                                <div>
                                    <iframe src={url + "&panelId=28"} width="100" height="100"></iframe>
                                    <iframe src={url + "&panelId=29"} width="100" height="100"></iframe>
                                </div>
                            </div>
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
                                {[1, 2, 3].map(() => {
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
                <section>
                    <div className={"row"}>
                        <iframe src={url + "&panelId=32"} width="600" height="358"></iframe>
                        <iframe src={url + "&panelId=31 "} width="600" height="358"></iframe>
                        <iframe src={url + "&panelId=26"} width="600" height="358"></iframe>
                        <iframe src={url + "&panelId=21"} width="600" height="358"></iframe>
                    </div>
                </section>

            </div>
        </div>
    );
}

