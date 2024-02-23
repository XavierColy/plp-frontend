import {Outlet, useNavigate} from 'react-router-dom';
import {useContext, useEffect} from 'react';
import {hostsContext} from './authContext.context';
import yaml from '../pages/overview/vmagent.yml';

export default function AuthGuard(){
    const navigate = useNavigate();
    const {setHosts} = useContext(hostsContext);
    useEffect(() => {
        fetch(yaml)
            .then(r => r.text())
            .then((yam) => {

                let output = [];
                let jobName = '';
                let exporterFound = false;
                let targetsFound = false;

                // Séparer le fichier en lignes
                const lines = yam.split('\n');

                // Parcourir chaque ligne du fichier
                lines.forEach((line) => {
                    // Ignorer les lignes vides ou commentées
                    if (line.trim() === '' || line.trim().startsWith('#')) return;

                    // Vérifier si la ligne commence par un tiret car seule ces lignes contiennent les informations nécessaires
                    const match = line.match(/^\s*-.*$/);
                    if (!match) return;

                    // Extraire le nom du job s'il existe
                    const jobMatch = line.match(/^\s*-?\s*job_name:\s*(\S+)/);
                    if (jobMatch) {
                        jobName = jobMatch[1];
                        exporterFound = jobName.includes('exporter');
                        if (!exporterFound) {
                            jobName = '';
                        } else {
                            targetsFound = false; // Réinitialiser la recherche des cibles
                        }
                        return;
                    }

                    // Si le jobname ne contient pas la chaîne "exporter",
                    if (!exporterFound) {
                        return;
                    }

                    // Vérifier si nous sommes dans la section des cibles
                    if (line.includes('targets')) {
                        targetsFound = true; // Les lignes suivantes seront possiblement les cibles
                        return; // Ne rien faire pour la ligne "targets:"
                    }

                    if (targetsFound) {
                        // On sait qu'il y a des cibles
                        // Extraire les adresses IP, types de machines et hostnames
                        const ipMatch = line.match(
                            /^\s*-?\s*"?https?:\/\/?(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})"?|^\s*-?\s*"?(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})"?/
                        );
                        if (ipMatch) {
                            const ip = ipMatch[1] || ipMatch[2];
                            const machineMatch = line.match(/Machine:\s*(.*?)\s*Hostname:/);
                            const machine = machineMatch ? machineMatch[1].trim() : '';
                            const hostnameMatch = line.match(/Hostname:\s*(.*)/);
                            const hostname = hostnameMatch ? hostnameMatch[1].trim() : '';
                            output.push({jobName, ip, machine, hostname});
                        }
                    }
                });
                setHosts(output);
            });
    }, []);

    const value = localStorage.getItem("ALLOWED");
    if (value === "true") {
        return (<Outlet/>);
    }
    else {
        navigate('/login');
    }
}