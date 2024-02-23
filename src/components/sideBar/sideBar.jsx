import './sideBar.css';
import {FaQuestionCircle} from 'react-icons/fa';
import {IoMdSettings} from 'react-icons/io';
import {RiAccountCircleFill} from 'react-icons/ri';
import {HiMiniSquares2X2} from 'react-icons/hi2';
import {useNavigate} from 'react-router-dom';
import {PiComputerTowerBold} from 'react-icons/pi';
export default function SideBar() {
    const navigate = useNavigate();
    return(
        <nav>
            <h1 onClick={()=>{navigate('/overview')}}>Superv'INSA</h1>
            <div onClick={()=>{navigate('/overview')}}>
                <HiMiniSquares2X2 className={"icon"}/>
                <span>Accueil</span>
            </div>
            <div onClick={()=>{navigate(('/hosts'))}}>
                <PiComputerTowerBold className={"icon"}/>
                <span>Hôtes</span>
            </div>
            <div id={'bottom-bar-top'}>
                <FaQuestionCircle className={"icon"}/>
                <span>Aide</span>
            </div>
            <div id={'bottom-bar-bottom'} onClick={()=>{localStorage.clear(); navigate('/login')}}>
                <RiAccountCircleFill className={"icon"}/>
                <span>Admin</span>
            </div>
        </nav>
    );
}