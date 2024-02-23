import SideBar from '../../components/sideBar/sideBar';
import {HiOutlineClipboardCopy} from 'react-icons/hi';

export default function Help() {
    return (
        <div id={"overview"}>
            <SideBar></SideBar>
            <div id={"overview-main"}>
                <div>
                    <header>
                        <h1>Comment ça marche </h1>
                    </header>
                    <div id={"divider"}></div>
                </div>
                <div>
                    <p>Superv'INSA est une plateforme de surveillance réseau et système permettant aux utilisateurs et
                        administrateurs de la salle 009T du bâtiment Abel de Pujol 3 d’avoir une vue en temps réel de
                        l’état de santé du réseau et des machines. Cela se fera au travers de rapport interprétable à
                        l’aide de graphiques et de tableaux, mais également d’alertes transmises aux administrateurs
                        de cette salle pour signaler un incident.</p>
                    <p>Les machines seront ici appelées hôte. Il y a donc autant d'hôtes que de machines ajoutées dans
                        le réseau de surveillance.</p>
                    <p>Pour faciliter la différenciation des hôtes, un code couleur a été appliqué en fonction du Job de
                        la machine.</p>
                    <h3>Ajouter des hôtes</h3>
                    <p>Executez la commande suivante</p>
                    <div id={"code_frame"}>
                        <div>
                            <span>bash</span>
                            <div
                                onClick={() =>
                                    navigator.clipboard.writeText("su\nsudo python3 /etc/vmagent/bin/add_hosts.py")}
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
                    <h3>Supprimer des hôtes</h3>

                    <p>Executez la commande suivante</p>
                    <div id={"code_frame"}>
                        <div>
                            <span>bash</span>
                            <div
                                onClick={() =>
                                    navigator.clipboard.writeText("su\nsudo python3 /etc/vmagent/bin/remove_hosts.py")}
                                id={"click"}>
                                <HiOutlineClipboardCopy/>
                                <span>Copier</span>
                            </div>
                        </div>
                        <div>
                            <p>su</p>
                            <p>sudo python3 /etc/vmagent/bin/remove_hosts.py</p>
                        </div>
                    </div>
                    <h3>Créer et supprimer des graphiques</h3>
                    <p>Pour ce faire, se référer au README qui se trouve dans le répertoire home/vmadmin/supervinsa</p>
                </div>
            </div>
        </div>
    );
}