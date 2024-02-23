import SideBar from '../../components/sideBar/sideBar';
import {LuRefreshCcw} from 'react-icons/lu';
import {FaCaretDown} from 'react-icons/fa';
import {useEffect, useState} from 'react';
import {IoMdTime} from 'react-icons/io';
import {useLocation, useParams} from 'react-router-dom';

export default function Windows() {
    const hostIp = useLocation().state.hostIp;
    const vmIp = 'localhost';
    const {hostname} = useParams();
    const [refreshTime, setRefreshTime] = useState('10s');
    const [from, setFrom] = useState('24h');
    const [url, setUrl] = useState(`http://${vmIp}:3000/d-solo/PPZJb6qMk-2/windows-exporter-node?orgId=1&theme=light&from=now-${from}&to=now&refresh=${refreshTime}`);
    const [sectionsToDisplay, setSectionsToDisplay] = useState(0);


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

    const handleClickOnSec = (id) => {
        sectionsToDisplay === id ? setSectionsToDisplay(0) : setSectionsToDisplay(id);
    }

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
                        <h1>{hostname} : Vue d'ensemble</h1>
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
                                <iframe src={url + "&panelId=23763571993"} width="400" height="200"></iframe>
                                <div>
                                    <iframe src={url + "&panelId=23763572001"} width="180" height="150"></iframe>
                                    <iframe src={url + "&panelId=23763572004"} width="180" height="150"></iframe>
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
                                {[1, 2, 3, 4].map(() => {
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
                    <h2></h2>
                    <div className={"row"}>
                        <iframe src={url + "&panelId=4"} width="600" height="358"></iframe>
                        <iframe src={url + "&panelId=14"} width="600" height="358"></iframe>
                        <iframe src={url + "&panelId=8"} width="600" height="358"></iframe>
                        <iframe src={url + "&panelId=15"} width="600" height="358"></iframe>
                        <iframe src={url + "&panelId=10"} width="600" height="358"></iframe>
                        <iframe src={url + "&panelId=11"} width="600" height="358"></iframe>
                        <iframe src={url + "&panelId=23763571997"} width="600" height="358"></iframe>
                        <iframe src={url + "&panelId=9"} width="600" height="358"></iframe>
                        <iframe src={url + "&panelId=23763571999"} width="600" height="358"></iframe>
                        <iframe src={url + "&panelId=18"} width="600" height="358"></iframe>
                    </div>
                </section>
                <section className={"sec"} onClick={() => handleClickOnSec(1)}>
                    <div>
                        <FaCaretDown/>
                        <h2>System Thread</h2>
                    </div>
                    {sectionsToDisplay === 1 ?
                        <div className={"row"}>
                            <iframe src={url + "&panelId=12"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=26"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=22"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=20"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=24"} width="600" height="358"></iframe>
                        </div> : <></>}
                </section>
                <section className={"sec"} onClick={() => handleClickOnSec(2)}>
                    <div>
                        <FaCaretDown/>
                        <h2>Miscellenous</h2>
                    </div>
                    {sectionsToDisplay === 2 ?
                        <div className={"row"}>
                            <iframe src={url + "&panelId=23763572003"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=7"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=17"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=16"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=23763571995"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=28"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=30"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=32"} width="1200" height="358"></iframe>
                        </div> : <></>}
                </section>
            </div>
        </div>
    );
}

