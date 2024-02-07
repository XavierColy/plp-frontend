import './sideBar.css';
import {FaQuestionCircle} from 'react-icons/fa';
import {IoMdSettings} from 'react-icons/io';
import {RiAccountCircleFill} from 'react-icons/ri';
import {HiMiniSquares2X2} from 'react-icons/hi2';
export default function SideBar() {
    return(
        <nav>
            <h1>Superv'INSA</h1>
            <div>
                <HiMiniSquares2X2 className={"icon"}/>
                <span>Accueil</span>
            </div>
            <div id={'bottom-bar-top'}>
                <FaQuestionCircle className={"icon"}/>
                <span>Aide</span>
            </div>
            <div>
                <IoMdSettings className={"icon"}/>
                <span>Paramètres</span>
            </div>
            <div id={'bottom-bar-bottom'}>
                <RiAccountCircleFill className={"icon"}/>
                <span>Antoine</span>
            </div>
        </nav>
    );
}