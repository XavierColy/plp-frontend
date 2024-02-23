# Superv'INSA

Superv'INSA est une plateforme de surveillance réseau et système permettant aux utilisateurs et
administrateurs de la salle 009T du bâtiment Abel de Pujol 3 d’avoir une vue en temps réel de 
l’état de santé du réseau et des machines.

## Démarrer le projet
Pour lancer le projet, il faut exécuter la commande`sudo systemctl restart supervinsa` directement dans le répertoire
home/vmadmin/supervinsa. L'application s'ouvrira automatiquement sur le port 8080 dans un 
navigateur. Le cas échéant, ouvrez le navigateur et tapez l'url [http://supervinsa.fr:8080/](http://supervinsa.fr:8080/).
Les identifiants sont :
- identifiant: admin
- mot de passe: vmadmin

Au cas où le code aurait été modifié et que des dépendances auraient été ajoutées, il vous faudra 
au préalable exécuter la commande `npm i` dans le même répertoire puis lancer l'application.

## Comprendre le code
Il y a exactement un fichier par page. Cela facilite donc la navigation, particulièrement pour les
 exporters (job). 
- node_exporter: Regarder le fichier src/pages/nodePage/nodePage.jsx
- windows_exporter_client et windows_exporter_server: Regarder le fichier src/pages/windows/windows.jsx
- snmp_exporter: Regarder le fichier src/pages/snmp/snmp.jsx

### Retirer un graphique
Si vous souhaitez retirer des graphiques, il suffit de supprimer l'iframe correspondant dans le fichier 
concerné en sachant que les graphiques sont affichés dans le même ordre que dans le code.

### Ajouter un graphiqe
Si vous souhaitez ajouter des graphiques, il faudra modifier les templates grafana. Pour ce faire, 
vous devrez visiter l'url [http://localhost:3000/](http://localhost:3000/) et vous connecter avec 
les identifiants admin et admin, respectiviment pour le mot de passe et le username. Allez dans Dashboards,
et sélectionnez l'exporter concerné. Ajoutez votre graphique puis prenez connaissance du 'panelId' ce 
celui-ci sur grafana. Vous le trouverez en cliquant sur share puis embed puis dans le lien qui vous sera affiché.
Recensez uniquement le panelId. Enfin, dans le code, dans la page où vous voulez afficher le code,
allez dans la section de votre choix. Faîtes un copier coller d'un iframe présent dans cette section et 
remplacez le panelId par celui que vous avez recensé.