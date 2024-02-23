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
                    <p></p>
                </div>
            </div>
        </div>
    );
}