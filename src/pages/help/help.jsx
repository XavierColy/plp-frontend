import SideBar from '../../components/sideBar/sideBar';

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
                    <h3>Ajouter et supprimer des hôtes</h3>
                    <p>Pour ajouter des hôtes, se référer à la page des hôtes</p>
                    <p>Pour supprimer des hôtes, éditez le fichier /etc/vmagent/conf/vmagent.yml se trouvant dans le répertoire local</p>
                    <h3>Créer et supprimer des graphiques</h3>
                    <p>Pour ce faire, se référer au README qui se trouve dans le répertoire home/vmadmin/supervinsa</p>
                </div>
            </div>
        </div>
    );
}