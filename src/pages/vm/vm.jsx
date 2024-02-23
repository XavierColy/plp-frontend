import SideBar from '../../components/sideBar/sideBar';
import {LuRefreshCcw} from 'react-icons/lu';
import {FaCaretDown} from 'react-icons/fa';
import {useEffect, useState} from 'react';
import {IoMdTime} from 'react-icons/io';
import {useLocation} from 'react-router-dom';

export default function Vm() {
    const hostIp = useLocation().state.hostIp;
    const vmIp = 'localhost';
    const hostname = "FOG Server";
    const [refreshTime, setRefreshTime] = useState('10s');
    const [from, setFrom] = useState('3h');
    const [url, setUrl] = useState(`http://${vmIp}:3000/d-solo/oS7Bi_0Wz/victoriametrics-cluster?orgId=1&theme=light&from=now-${from}&to=now&refresh=${refreshTime}`);
    const [sectionsToDisplay, setSectionsToDisplay] = useState(1);


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
        <div id={"hostPage"}>
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
                            <iframe src={url + "&panelId=131"} width="130" height="144"></iframe>
                            <iframe src={url + "&panelId=124"} width="130" height="144"></iframe>
                            <iframe src={url + "&panelId=130"} width="130" height="144"></iframe>
                            <iframe src={url + "&panelId=126"} width="130" height="144"></iframe>
                            <iframe src={url + "&panelId=34"} width="130" height="144"></iframe>
                            <iframe src={url + "&panelId=35"} width="130" height="144"></iframe>
                            <div className={"fle-col"}>
                                <iframe src={url + "&panelId=62"} width="200" height="100"></iframe>
                                <iframe src={url + "&panelId=112"} width="200" height="100"></iframe>
                            </div>
                            <div className={"fle-col"}>
                                <iframe src={url + "&panelId=149"} width="200" height="100"></iframe>
                                <iframe src={url + "&panelId=128"} width="200" height="100"></iframe>
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
                                {[1, 2, 3, 4, 5, 6, 7].map(() => {
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
                <section className={"sec"} onClick={() => handleClickOnSec(1)}>
                    <div>
                        <FaCaretDown/>
                        <h2>Overview</h2>
                    </div>
                    {sectionsToDisplay === 1 ?
                        < div className={"row"}>
                            < iframe src={url + "&panelId=2"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=6"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=12"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=8"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=52"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=104"} width="600" height="358"></iframe>
                        </div> : <></>
                    }
                </section>
                <section className={"sec"} onClick={() => handleClickOnSec(2)}>
                    <div>
                        <FaCaretDown/>
                        <h2>Resource Usage</h2>
                    </div>
                    {sectionsToDisplay === 2 ?
                        <div className={"row"}>
                            <iframe src={url + "&panelId=66"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=138"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=64"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=122"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=117"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=204"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=68"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=119"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=70"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=120"} width="600" height="358"></iframe>
                        </div> : <></>}
                </section>
                <section className={"sec"} onClick={() => handleClickOnSec(3)}>
                    <div>
                        <FaCaretDown/>
                        <h2>Troubleshooting</h2>
                    </div>
                    {sectionsToDisplay === 3 ?
                        <div className={"row"}>
                            <iframe src={url + "&panelId=102"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=108"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=142"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=107"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=170"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=116"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=144"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=58"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=183"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=135"} width="600" height="358"></iframe>
                        </div> : <></>
                    }
                </section>
                <section className={"sec"} onClick={() => handleClickOnSec(4)}>
                    <div>
                        <FaCaretDown/>
                        <h2>Interconnection</h2>
                    </div>
                    {sectionsToDisplay === 4 ?
                        <div className={"row"}>
                            <iframe src={url + "&panelId=76"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=86"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=80"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=78"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=82"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=74"} width="600" height="358"></iframe>
                        </div> : <></>
                    }
                </section>
                <section className={"sec"} onClick={() => handleClickOnSec(5)}>
                    <div>
                        <FaCaretDown/>
                        <h2>Vmstorage</h2>
                    </div>
                    {sectionsToDisplay === 5 ?
                        <div className={"row"}>
                            <iframe src={url + "&panelId=100"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=113"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=151"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=167"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=141"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=133"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=54"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=55"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=20"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=22"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=202"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=14"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=206"} width="600" height="358"></iframe>
                        </div> : <></>}
                </section>
                <section className={"sec"} onClick={() => handleClickOnSec(6)}>
                    <div>
                        <FaCaretDown/>
                        <h2>Vmselect</h2>
                    </div>
                    {sectionsToDisplay === 6 ?
                        <div className={"row"}>
                            <iframe src={url + "&panelId=92"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=95"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=163"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=165"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=178"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=180"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=179"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=181"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=93"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=207"} width="600" height="358"></iframe>
                        </div> : <></>}
                </section>
                <section className={"sec"} onClick={() => handleClickOnSec(7)}>
                    <div>
                        <FaCaretDown/>
                        <h2>Vminsert</h2>
                    </div>
                    {sectionsToDisplay === 7 ?
                        <div className={"row"}>
                            <iframe src={url + "&panelId=97"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=99"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=185"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=187"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=139"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=114"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=208"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=88"} width="600" height="358"></iframe>
                        </div> : <></>}
                </section>
                <section className={"sec"} onClick={() => handleClickOnSec(8)}>
                    <div>
                        <FaCaretDown/>
                        <h2>Drilldown</h2>
                    </div>
                    <p>Drilldown row is used by other panels on the dashboard to show more detailed metrics
                        per-instance.</p>
                    {sectionsToDisplay === 8 ?
                        <div className={"row"}>
                            <iframe src={url + "&panelId=189"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=190"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=192"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=196"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=200"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=201"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=203"} width="600" height="358"></iframe>
                        </div> : <></>}
                </section>
            </div>
        </div>
    )
        ;
}

