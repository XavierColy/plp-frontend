import './nodePage.css'
import SideBar from '../../components/sideBar/sideBar';
import {LuRefreshCcw} from 'react-icons/lu';
import {FaCaretDown} from 'react-icons/fa';
import {useEffect, useState} from 'react';
import {IoMdTime} from 'react-icons/io';
import {useLocation} from 'react-router-dom';

export default function NodePage() {
    const hostIp = useLocation().state.hostIp;
    const vmIp = 'localhost';
    const hostname = "FOG Server";
    const [refreshTime, setRefreshTime] = useState('10s');
    const [from, setFrom] = useState('24h');
    const [url, setUrl] = useState(`http://${vmIp}:3000/d-solo/rYdddlPWk/node-exporter-full?orgId=1&var-DS_PROMETHEUS=db5dabec-a472-48a0-82a8-b0a2a74c9a8d&var-job=node_exporter&var-node=${hostIp}%3A9100&var-diskdevices=%5Ba-z%5D%2B%7Cnvme%5B0-9%5D%2Bn%5B0-9%5D%2B%7Cmmcblk%5B0-9%5D%2B&theme=light&from=now-${from}&to=now&refresh=${refreshTime}`);
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

    useEffect(() => {
        const re = new RegExp("(&from=now-)[0-9]+[mhd](&to=now)");
        const add = `&from=now-${from}&to=now`;
        const tmp = url.replace(re, add);
        setUrl(tmp);
    }, [url, from]);

    const handleClickOnSec = (id) => {
        sectionsToDisplay === id ? setSectionsToDisplay(0) : setSectionsToDisplay(id);
    }

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
                            <iframe src={url + "&panelId=20"} width="130" height="144"></iframe>
                            <iframe src={url + "&panelId=155"} width="130" height="144"></iframe>
                            <iframe src={url + "&panelId=19"} width="130" height="144"></iframe>
                            <iframe src={url + "&panelId=16"} width="130" height="144"></iframe>
                            <iframe src={url + "&panelId=21"} width="130" height="144"></iframe>
                            <iframe src={url + "&panelId=154"} width="130" height="144"></iframe>
                            <div className={"fle-col"}>
                                <iframe src={url + "&panelId=14"} width="200" height="100"></iframe>
                                <iframe src={url + "&panelId=23"} width="200" height="100"></iframe>
                            </div>
                            <div className={"fle-col"}>
                                <iframe src={url + "&panelId=15"} width="200" height="100"></iframe>
                                <div>
                                    <iframe src={url + "&panelId=75"} width="100" height="100"></iframe>
                                    <iframe src={url + "&panelId=18"} width="100" height="100"></iframe>
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
                        <h2>Basic CPU / Mem / Net / Disk</h2>
                    </div>
                    {sectionsToDisplay === 1 ?
                        <div className={"row"}>
                            <iframe src={url + "&panelId=77"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=78"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=74"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=152"} width="600" height="358"></iframe>
                        </div> : <></>
                    }
                </section>
                <section className={"sec"} onClick={() => handleClickOnSec(2)}>
                    <div>
                        <FaCaretDown/>
                        <h2>CPU / Memory / Net / Disk</h2>
                    </div>
                    {sectionsToDisplay === 2  ?
                        <div className={"row"}>
                            <iframe src={url + "&panelId=3"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=24"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=84"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=156"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=229"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=42"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=127"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=319"} width="600" height="358"></iframe>
                        </div> : <></>
                    }
                </section>
                <section className={"sec"} onClick={() => handleClickOnSec(3)}>
                    <div>
                        <FaCaretDown/>
                        <h2>Memory Meminfo</h2>
                    </div>
                    {sectionsToDisplay === 3 ?
                        <div className={"row"}>
                            <iframe src={url + "&panelId=136"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=135"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=191"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=130"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=138"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=131"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=70"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=159"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=129"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=160"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=140"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=71"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=128"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=137"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=132"} width="600" height="358"></iframe>
                        </div> : <></>
                    }
                </section>
                <section className={"sec"} onClick={() => handleClickOnSec(4)}>
                    <div>
                        <FaCaretDown/>
                        <h2>Memory Vmstat</h2>
                    </div>
                    {sectionsToDisplay === 4 ?
                        <div className={"row"}>
                            <iframe src={url + "&panelId=176"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=22"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=175"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=307"} width="600" height="358"></iframe>
                        </div> : <></>
                    }
                </section>
                <section className={"sec"} onClick={() => handleClickOnSec(5)}>
                    <div>
                        <FaCaretDown/>
                        <h2>System Timesync</h2>
                    </div>
                    {sectionsToDisplay === 5 ?
                        <div className={"row"}>
                            <iframe src={url + "&panelId=260"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=291"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=168"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=294"} width="600" height="358"></iframe>
                        </div> : <></>
                    }
                </section>
                <section className={"sec"} onClick={() => handleClickOnSec(6)}>
                    <div>
                        <FaCaretDown/>
                        <h2>System Processes</h2>
                    </div>
                    {sectionsToDisplay === 6 ?
                        <div className={"row"}>
                            <iframe src={url + "&panelId=62"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=315"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=148"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=149"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=313"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=305"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=314"} width="600" height="358"></iframe>
                        </div> : <></>
                    }
                </section>
                <section className={"sec"} onClick={() => handleClickOnSec(7)}>
                    <div>
                        <FaCaretDown/>
                        <h2>System Misc</h2>
                    </div>
                    {sectionsToDisplay === 7  ?
                        <div className={"row"}>
                            <iframe src={url + "&panelId=8"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=7"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=321"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=322"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=259"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=306"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=151"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=308"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=64"} width="600" height="358"></iframe>
                        </div> : <></>
                    }
                </section>
                <section className={"sec"} onClick={() => handleClickOnSec(8)}>
                    <div>
                        <FaCaretDown/>
                        <h2>Hardware Misc</h2>
                    </div>
                    {sectionsToDisplay === 8 ?
                        <div className={"row"}>
                            <iframe src={url + "&panelId=158"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=300"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=302"} width="600" height="358"></iframe>
                        </div> : <></>
                    }
                </section>
                <section className={"sec"} onClick={() => handleClickOnSec(9)}>
                    <div>
                        <FaCaretDown/>
                        <h2>Systemd</h2>
                    </div>
                    {sectionsToDisplay === 9 ?
                        <div className={"row"}>
                            <iframe src={url + "&panelId=297"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=298"} width="600" height="358"></iframe>
                        </div> : <></>
                    }
                </section>
                <section className={"sec"} onClick={() => handleClickOnSec(10)}>
                    <div>
                        <FaCaretDown/>
                        <h2>Storage Disk</h2>
                    </div>
                    {sectionsToDisplay === 10 ?
                        <div className={"row"}>
                            <iframe src={url + "&panelId=9"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=33"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=37"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=35"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=133"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=36"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=34"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=301"} width="600" height="358"></iframe>
                        </div> : <></>
                    }
                </section>
                <section className={"sec"} onClick={() => handleClickOnSec(11)}>
                    <div>
                        <FaCaretDown/>
                        <h2>Storage Filesystem</h2>
                    </div>
                    {sectionsToDisplay === 11 ?
                        <div className={"row"}>
                            <iframe src={url + "&panelId=43"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=41"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=28"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=219"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=44"} width="600" height="358"></iframe>
                        </div> : <></>
                    }
                </section>
                <section className={"sec"} onClick={() => handleClickOnSec(12)}>
                    <div>
                        <FaCaretDown/>
                        <h2>Network Traffic</h2>
                    </div>
                    {sectionsToDisplay === 12 ?
                        <div className={"row"}>
                            <iframe src={url + "&panelId=60"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=142"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=143"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=141"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=146"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=144"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=145"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=231"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=232"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=61"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=230"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=288"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=280"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=289"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=290"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=310"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=309"} width="600" height="358"></iframe>
                        </div> : <></>
                    }
                </section>
                <section className={"sec"} onClick={() => handleClickOnSec(13)}>
                    <div>
                        <FaCaretDown/>
                        <h2>Network Sockstat</h2>
                    </div>
                    {sectionsToDisplay === 13 ?
                        <div className={"row"}>
                            <iframe src={url + "&panelId=63"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=124"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=125"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=220"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=126"} width="600" height="358"></iframe>
                        </div> : <></>
                    }
                </section>
                <section className={"sec"} onClick={() => handleClickOnSec(14)}>
                    <div>
                        <FaCaretDown/>
                        <h2>Network Netstat</h2>
                    </div>
                    {sectionsToDisplay === 14 ?
                        <div className={"row"}>
                            <iframe src={url + "&panelId=221"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=81"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=115"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=50"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=55"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=109"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=299"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=104"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=85"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=91"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=82"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=320"} width="600" height="358"></iframe>
                        </div> : <></>
                    }
                </section>
                <section className={"sec"} onClick={() => handleClickOnSec(15)}>
                    <div>
                        <FaCaretDown/>
                        <h2>Node Exporter</h2>
                    </div>
                    {sectionsToDisplay === 15 ?
                        <div className={"row"}>
                            <iframe src={url + "&panelId=40"} width="600" height="358"></iframe>
                            <iframe src={url + "&panelId=157"} width="600" height="358"></iframe>
                        </div> : <></>
                    }
                </section>
            </div>
        </div>
    );
}

