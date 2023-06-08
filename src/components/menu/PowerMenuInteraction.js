import React, {useState} from "react";
import './PowerMenu.scss';
import TerminalWindow from "../utils/window/TerminalDesktop";
import { useSelector, useDispatch } from "react-redux";
import { pushItem, clearItem } from '../../reducers/shutdown';

export default function PowerMenuInteraction(props){
    const array = useSelector(state => state.shutdown.elem);
    const dispatch = useDispatch();

    function ShutDown(){
        document.getElementsByClassName('Menu')[0].classList.remove('active');
        document.getElementsByClassName('PowerMenu')[0].classList.remove('active');
    
        setTimeout(() => {
            document.getElementsByClassName('DesktopBody')[0].classList.remove('active');
        }, 500);
    
        setTimeout(() => {
            document.getElementsByClassName('Header')[0].classList.remove('active');
            document.getElementsByClassName('Dock')[0].classList.remove('active');
        }, 1000);
    
        setTimeout(() => {
            document.getElementsByClassName('TerminalWindow')[0].classList.add('active');
        }, 2500);

        setTimeout(() => dispatch(pushItem(<pre>Stopped Load/Save Random Seed... OK</pre>)), 3000);
    
        setTimeout(() => {
            document.getElementsByClassName('TerminalWindow')[0].classList.add('cursorLoad');
            dispatch(pushItem(<pre>Stopped Session 1 of localhost... OK</pre>));
            dispatch(pushItem(<pre>Removed slice system-getty.slice... OK</pre>));
            dispatch(pushItem(<pre>Stopped Login Service... OK</pre>));
        }, 3500);

        setTimeout(() => {
            dispatch(pushItem(<pre>Stopped Initializes Pacman keyring... OK</pre>));
            dispatch(pushItem(<pre>Stopping Breeze Desktop Environment...</pre>));
        }, 3600);

        setTimeout(() => {
            dispatch(pushItem(<pre>Removed Desktop.js... OK</pre>));
            dispatch(pushItem(<pre>Removed DesktopBody.js... OK</pre>));
            dispatch(pushItem(<pre>Removed components/Dock.js... OK</pre>));
            dispatch(pushItem(<pre>Removed components/DockItem.js... OK</pre>));
            dispatch(pushItem(<pre>Removed components/Header.js... OK</pre>));
        }, 3650);

        setTimeout(() => {
            dispatch(pushItem(<pre>Removed components/lockScreen/LockScreen.js... OK</pre>));
            dispatch(pushItem(<pre>Removed components/lockScreen/LoginButton.js... OK</pre>));
            dispatch(pushItem(<pre>Removed components/lockScreen/SplashScreen.js... OK</pre>));
            dispatch(pushItem(<pre>Removed components/lockScreen/SplashScreenDate.js... OK</pre>));
            dispatch(pushItem(<pre>Removed components/lockScreen/SplashScreenTime.js... OK</pre>));
            dispatch(pushItem(<pre>Removed components/menu/Menu.js... OK</pre>));
        }, 3670);

        setTimeout(() => {
            dispatch(pushItem(<pre>Removed components/menu/PowerMenu.js... OK</pre>));
            dispatch(pushItem(<pre>Removed components/menu/PowerMenuInteraction.js... OK</pre>));
            dispatch(pushItem(<pre>Removed components/Wallpaper.js... OK</pre>));
            dispatch(pushItem(<pre>Removed components/Wallpaper.js... OK</pre>));
        }, 3690);

        setTimeout(() => {
            dispatch(pushItem(<pre>Removed components/panel/Battery.js... OK</pre>));
            dispatch(pushItem(<pre>Removed components/panel/Panel.js... OK</pre>));
            dispatch(pushItem(<pre>Removed components/panel/PanelBottom.js... OK</pre>));
            dispatch(pushItem(<pre>Removed components/panel/PanelItem.js... OK</pre>));
            dispatch(pushItem(<pre>Removed components/panel/PanelItemContainer.js... OK</pre>));
            dispatch(pushItem(<pre>Removed components/panel/PanelTop.js... OK</pre>));
        }, 3700);

        setTimeout(() => {
            dispatch(pushItem(<pre>Removed components/panel/Battery.js... OK</pre>));
            dispatch(pushItem(<pre>Removed components/startMenu/SearchMenu.js... OK</pre>));
            dispatch(pushItem(<pre>Removed components/startMenu/StartApp.js... OK</pre>));
            dispatch(pushItem(<pre>Removed components/startMenu/StartMenu.js... OK</pre>));
        }, 3710);

        setTimeout(() => {
            dispatch(pushItem(<pre>Removed components/utils/menu/index.js... OK</pre>));
            dispatch(pushItem(<pre>Removed components/utils/range/Range.js... OK</pre>));
            dispatch(pushItem(<pre>Removed components/utils/widget/Clock.js... OK</pre>));
            dispatch(pushItem(<pre>Removed components/utils/window/TopBar.js... OK</pre>));
            dispatch(pushItem(<pre>Removed components/utils/window/TopBarInteraction.js... OK</pre>));
        }, 3720);

        setTimeout(() => {
            dispatch(pushItem(<pre>Removed components/utils/window/Window.js... OK</pre>));
            dispatch(pushItem(<pre>Removed components/utils/window/WindowBody.js... OK</pre>));
            dispatch(pushItem(<pre>Removed components/utils/window/WindowBodyButton.js... OK</pre>));
            dispatch(pushItem(<pre>Removed components/utils/window/WindowBodyDefault.js... OK</pre>));
            dispatch(pushItem(<pre>Removed components/utils/window/WindowDefault.js... OK</pre>));
        }, 3725);

        setTimeout(() => {
            dispatch(pushItem(<pre>Removed containers/apps/calculator.js... OK</pre>));
            dispatch(pushItem(<pre>Removed containers/apps/calendar.js... OK</pre>));
        }, 3730);

        setTimeout(() => {
            dispatch(pushItem(<pre>Removed containers/apps/camera.js... OK</pre>));
        }, 3760);

        setTimeout(() => {
            dispatch(pushItem(<pre>Removed containers/apps/files.js... OK</pre>));
        }, 3800);

        setTimeout(() => {
            dispatch(pushItem(<pre>Removed containers/apps/firefox.js... OK</pre>));
        }, 3900);

        setTimeout(() => {
            dispatch(pushItem(<pre>Removed containers/apps/imgview.js... OK</pre>));
        }, 4300);

        setTimeout(() => {
            dispatch(pushItem(<pre>Removed containers/apps/settings.js... OK</pre>));
            dispatch(pushItem(<pre>Removed containers/apps/softwarestore.js... OK</pre>));
            dispatch(pushItem(<pre>Removed containers/apps/terminal.js... OK</pre>));
            dispatch(pushItem(<pre>Removed containers/apps/texteditor.js... OK</pre>));
        }, 4900);

        setTimeout(() => {
            dispatch(pushItem(<pre>Removed containers/msgbox/MissingPermissionCamera.js... OK</pre>));
            dispatch(pushItem(<pre>Removed containers/msgbox/UnsuitableBrowser.js... OK</pre>));
        }, 5200);

        setTimeout(() => {
            dispatch(pushItem(<pre>Removed headers/Home.js... OK</pre>));
            dispatch(pushItem(<pre>Removed headers/Task.js... OK</pre>));
            dispatch(pushItem(<pre>Removed headers/Time.js... OK</pre>));
        }, 5250);

        setTimeout(() => {
            dispatch(pushItem(<pre>Removed Redux Selector... OK</pre>));
            dispatch(pushItem(<pre>Removed Redux Dispatch... OK</pre>));
            dispatch(pushItem(<pre>Removed Redux Slice... OK</pre>));
            dispatch(pushItem(<pre>Removed Redux Store... OK</pre>));
        }, 5300);

        setTimeout(() => {
            dispatch(pushItem(<pre>Removed Sound Effects... OK</pre>));
            dispatch(pushItem(<pre>Stopped Breeze Desktop Environment</pre>));
        }, 5350);

        setTimeout(() => {
            dispatch(pushItem(<pre>Stopped Network Time Synchronization... OK</pre>));
            dispatch(pushItem(<pre>Stopped Loading Kernel Modules... OK</pre>));
            dispatch(pushItem(<pre>Stopping Local File Systems</pre>));
            dispatch(pushItem(<pre>Unmounted Temporary /etc/pacman.d/gnupg directory... OK</pre>));
        }, 6900);

        setTimeout(() => {
            dispatch(pushItem(<pre>Unmounted Temporary Directory &#40;/tmp&#41;... OK</pre>));
            dispatch(pushItem(<pre>Failed unmounting /run/breezeos/bootmnt... !FAILED!</pre>));
            dispatch(pushItem(<pre>Unmounted /run/breezeos/cowspace... OK</pre>));
            dispatch(pushItem(<pre>Unmounted /run/breezeos/sfs/airootfs... OK</pre>));
        }, 7100);

        setTimeout(() => {
            dispatch(pushItem(<pre>Stopped Local File Systems... OK</pre>));
            dispatch(pushItem(<pre>Stopping Local File Systems &#40;Pre&#41;</pre>));
            dispatch(pushItem(<pre>Stopped Local File Systems &#40;Pre&#41;... OK</pre>));
        }, 7200);

        setTimeout(() => {
            dispatch(pushItem(<pre>Stopped target Swap... OK</pre>));
        }, 8300);

        setTimeout(() => {
            dispatch(pushItem(<pre>Stopped Create System Users... OK</pre>));
            dispatch(pushItem(<pre>Stopped Remount Root and Kernel File Systems... OK</pre>));
            dispatch(pushItem(<pre>Reached target Unmounted All Filesystems... OK</pre>));
            dispatch(pushItem(<pre>Reached target Unmounted All Filesystems... OK</pre>));
        }, 8500);

        setTimeout(() => {
            dispatch(pushItem(<pre>Stopped Monitoring of LVM2 mirrors, etc. using dmeventd or progress polling... OK</pre>));
            dispatch(pushItem(<pre>Stopped Monitoring of LVM2 mirrors, etc. using dmeventd or progress polling... OK</pre>));
        }, 9000);

        setTimeout(() => {
            dispatch(pushItem(<pre>Stopping LVM2 metadata daemon</pre>));
            dispatch(pushItem(<pre>Stopped LVM2 metadata daemon... OK</pre>));
            dispatch(pushItem(<pre>Reached target Shutdown... OK</pre>));
            dispatch(pushItem(<pre>Reached target Final Step... OK</pre>));
            dispatch(pushItem(<pre>Started Shutdown... OK</pre>));
        }, 9500);

        setTimeout(() => {
            dispatch(pushItem(<pre>Closed LVM2 metadata daemon socket... OK</pre>));
        }, 10000);

        setTimeout(() => {
            dispatch(pushItem(<pre>&#91;&nbsp;&nbsp;{Date.now()}&#93;: watchdog did not stop!</pre>));
        }, 10800);

        setTimeout(() => {
            dispatch(pushItem(<pre>&#91;&nbsp;&nbsp;{Date.now()}&#93;: watchdog did not stop!</pre>));
        }, 11100);

        setTimeout(() => {
            dispatch(pushItem(<pre>Goodbye :&#41;</pre>));
        }, 12200);

        setTimeout(() => {
            dispatch(clearItem());
            document.getElementsByClassName('Desktop')[0].classList.add('poweroff');
            document.getElementsByClassName('Wallpaper')[0].classList.remove('active');
        }, 13200);
    }

    function Lock(){
        document.getElementsByClassName('Menu')[0].classList.remove('active');
        document.getElementsByClassName('PowerMenu')[0].classList.remove('active');

        setTimeout(() => {
            document.getElementsByClassName('Header')[0].classList.remove('active');
            document.getElementsByClassName('Dock')[0].classList.remove('active');
        }, 200);
    
        setTimeout(() => {
            document.getElementsByClassName('LockScreen')[0].classList.add('active');
        }, 400);

        setTimeout(() => {
            document.getElementsByClassName('LockScreenWrapper')[0].classList.add('active');
        }, 500);
    }
    
    document.addEventListener('keydown', e => {
        if(e.ctrlKey && e.keyCode === 76){
            e.preventDefault();
            Lock();
        }
    })
    
    function Restart(){
        ShutDown();
    
        setTimeout(() => {
            document.getElementsByClassName('Desktop')[0].classList.remove('poweroff');
            document.getElementsByClassName('Desktop')[0].classList.add('blackscr');
        }, 16500)
    
        setTimeout(() => {
            document.getElementsByClassName('Desktop')[0].classList.add('cursorLoad');
        }, 17500)
    
        setTimeout(() => {
            document.getElementsByClassName('Desktop')[0].classList.remove('blackscr');
            document.getElementsByClassName('Desktop')[0].classList.remove('cursorLoad');
            document.getElementsByClassName('TerminalWindow')[0].classList.add('cursorLoad');
            dispatch(clearItem());
            dispatch(pushItem(<pre>Reached target Startup... OK</pre>));
        },19000);

        setTimeout(() => {
            dispatch(pushItem(<pre>Started Startup... OK</pre>));
            dispatch(pushItem(<pre>Opened LVM2 metadata daemon socket... OK</pre>));
        }, 19700);

        setTimeout(() => {
            dispatch(pushItem(<pre>Starting LVM2 metadata daemon</pre>));
            dispatch(pushItem(<pre>Started LVM2 metadata daemon... OK</pre>));
        }, 20200);

        setTimeout(() => {
            dispatch(pushItem(<pre>Started Monitoring of LVM2 mirrors, etc. using dmeventd or progress polling... OK</pre>));
        }, 20700);

        setTimeout(() => {
            dispatch(pushItem(<pre>Started Monitoring of LVM2 mirrors, etc. using dmeventd or progress polling... OK</pre>));
        }, 20800);

        setTimeout(() => {
            dispatch(pushItem(<pre>Welcome to BreezeOS!</pre>));
        }, 21500);

        setTimeout(() => {
            dispatch(pushItem(<pre>Reached target Mounted All Filesystems... OK</pre>));
        }, 23500);

        setTimeout(() => {
            dispatch(pushItem(<pre>Reached target Mounted All Filesystems... OK</pre>));
            dispatch(pushItem(<pre>Started Create System Users... OK</pre>));
            dispatch(pushItem(<pre>Started Remount Root and Kernel File Systems... OK</pre>));
        }, 23600);

        setTimeout(() => {
            dispatch(pushItem(<pre>Started target Swap... OK</pre>));
        }, 23700);

        setTimeout(() => {
            dispatch(pushItem(<pre>Mounted /run/breezeos/cowspace... OK</pre>));
        }, 24000);

        setTimeout(() => {
            dispatch(pushItem(<pre>Mounted /run/breezeos/sfs/airootfs... OK</pre>));
        }, 24500);

        setTimeout(() => {
            dispatch(pushItem(<pre>Mounted Temporary Directory &#40;/tmp&#41;... OK</pre>));
        }, 24900);

        setTimeout(() => {
            dispatch(pushItem(<pre>Started Local File Systems... OK</pre>));
        }, 25100);

        setTimeout(() => {
            dispatch(pushItem(<pre>Started Local File Systems &#40;Pre&#41;</pre>));
            dispatch(pushItem(<pre>Started Local File Systems &#40;Pre&#41;... OK</pre>));
        }, 25200);

        setTimeout(() => {
            dispatch(pushItem(<pre>Mounted Temporary Directory &#40;/tmp&#41;... OK</pre>));
            dispatch(pushItem(<pre>Mounted /run/breezeos/cowspace... OK</pre>));
            dispatch(pushItem(<pre>Mounted /run/breezeos/sfs/airootfs... OK</pre>));
        }, 25300);

        setTimeout(() => {
            dispatch(pushItem(<pre>Started Network Time Synchronization... OK</pre>));
            dispatch(pushItem(<pre>Started Loading Kernel Modules... OK</pre>));
        }, 25400);

        setTimeout(() => {
            dispatch(pushItem(<pre>Started Local File Systems</pre>));
            dispatch(pushItem(<pre>Mounted Temporary /etc/pacman.d/gnupg directory... OK</pre>));
        }, 25750);

        setTimeout(() => {
            dispatch(pushItem(<pre>Starting Breeze Desktop Environment</pre>));
            dispatch(pushItem(<pre>Added Sound Effects... OK</pre>));
        }, 26000);

        setTimeout(() => {
            dispatch(pushItem(<pre>Added Redux Selector... OK</pre>));
        }, 26100);

        setTimeout(() => {
            dispatch(pushItem(<pre>Added Redux Dispatch... OK</pre>));
        }, 26200);

        setTimeout(() => {
            dispatch(pushItem(<pre>Added Redux Slice... OK</pre>));
            dispatch(pushItem(<pre>Added Redux Store... OK</pre>));
        }, 26300);

        setTimeout(() => {
            dispatch(pushItem(<pre>Added headers/Home.js... OK</pre>));
            dispatch(pushItem(<pre>Added headers/Task.js... OK</pre>));
            dispatch(pushItem(<pre>Added headers/Time.js... OK</pre>));
        }, 26400);

        setTimeout(() => {
            dispatch(pushItem(<pre>Added containers/msgbox/MissingPermissionCamera.js... OK</pre>));
            dispatch(pushItem(<pre>Added containers/msgbox/UnsuitableBrowser.js... OK</pre>));
        }, 26600);

        setTimeout(() => {
            dispatch(pushItem(<pre>Removed containers/apps/imgview.js... OK</pre>));
        }, 26630);

        setTimeout(() => {
            dispatch(pushItem(<pre>Added containers/apps/settings.js... OK</pre>));
            dispatch(pushItem(<pre>Added containers/apps/softwarestore.js... OK</pre>));
            dispatch(pushItem(<pre>Added containers/apps/terminal.js... OK</pre>));
            dispatch(pushItem(<pre>Added containers/apps/texteditor.js... OK</pre>));
        }, 26650);

        setTimeout(() => {
            dispatch(pushItem(<pre>Added containers/apps/firefox.js... OK</pre>));
        }, 27000);

        setTimeout(() => {
            dispatch(pushItem(<pre>Added containers/apps/files.js... OK</pre>));
        }, 27300);

        setTimeout(() => {
            dispatch(pushItem(<pre>Added containers/apps/camera.js... OK</pre>));
        }, 27600);

        setTimeout(() => {
            dispatch(pushItem(<pre>Added containers/apps/calculator.js... OK</pre>));
            dispatch(pushItem(<pre>Added containers/apps/calendar.js... OK</pre>));
        }, 27900);

        setTimeout(() => {
            dispatch(pushItem(<pre>Added components/utils/menu/index.js... OK</pre>));
            dispatch(pushItem(<pre>Added components/utils/range/Range.js... OK</pre>));
            dispatch(pushItem(<pre>Added components/utils/widget/Clock.js... OK</pre>));
            dispatch(pushItem(<pre>Added components/utils/window/TopBar.js... OK</pre>));
            dispatch(pushItem(<pre>Added components/utils/window/TopBarInteraction.js... OK</pre>));
        }, 28050);

        setTimeout(() => {
            dispatch(pushItem(<pre>Added components/utils/window/Window.js... OK</pre>));
            dispatch(pushItem(<pre>Added components/utils/window/WindowBody.js... OK</pre>));
            dispatch(pushItem(<pre>Added components/utils/window/WindowBodyButton.js... OK</pre>));
            dispatch(pushItem(<pre>Added components/utils/window/WindowBodyDefault.js... OK</pre>));
            dispatch(pushItem(<pre>Added components/utils/window/WindowDefault.js... OK</pre>));
        }, 28080);

        setTimeout(() => {
            dispatch(pushItem(<pre>Added Desktop.js... OK</pre>));
            dispatch(pushItem(<pre>Added DesktopBody.js... OK</pre>));
            dispatch(pushItem(<pre>Added components/Dock.js... OK</pre>));
            dispatch(pushItem(<pre>Added components/DockItem.js... OK</pre>));
            dispatch(pushItem(<pre>Added components/Header.js... OK</pre>));
        }, 28110);

        setTimeout(() => {
            dispatch(pushItem(<pre>Added components/lockScreen/LockScreen.js... OK</pre>));
            dispatch(pushItem(<pre>Added components/lockScreen/LoginButton.js... OK</pre>));
            dispatch(pushItem(<pre>Added components/lockScreen/SplashScreen.js... OK</pre>));
            dispatch(pushItem(<pre>Added components/lockScreen/SplashScreenDate.js... OK</pre>));
            dispatch(pushItem(<pre>Added components/lockScreen/SplashScreenTime.js... OK</pre>));
        }, 28130);

        setTimeout(() => {
            dispatch(pushItem(<pre>Added components/menu/Menu.js... OK</pre>));
            dispatch(pushItem(<pre>Added components/menu/PowerMenu.js... OK</pre>));
            dispatch(pushItem(<pre>Added components/menu/PowerMenuInteraction.js... OK</pre>));
            dispatch(pushItem(<pre>Added components/Wallpaper.js... OK</pre>));
            dispatch(pushItem(<pre>Added components/Wallpaper.js... OK</pre>));
        }, 28160);

        setTimeout(() => {
            dispatch(pushItem(<pre>Started Breeze Desktop Environment... OK</pre>));
            dispatch(pushItem(<pre>Started Initializes Pacman keyring... OK</pre>));
        }, 28190);

        setTimeout(() => dispatch(pushItem(<pre>Started Load/Save Random Seed... OK</pre>)), 29700);
    
        setTimeout(() => {
            document.getElementsByClassName('TerminalWindow')[0].classList.add('cursorLoad');
            dispatch(pushItem(<pre>Added slice system-getty.slice... OK</pre>));
            dispatch(pushItem(<pre>Started Login Service... OK</pre>));
        }, 30100);

        setTimeout(() => {
            dispatch(pushItem(<pre>Starting Session 1 of localhost</pre>));
        }, 31000);
    
        setTimeout(() => {
            dispatch(clearItem());
            dispatch(pushItem(<pre>Initiating shutdown...</pre>));
            document.getElementsByClassName('TerminalWindow')[0].classList.remove('active');
            document.getElementsByClassName('TerminalWindow')[0].classList.remove('cursorLoad');
            document.getElementsByClassName('Wallpaper')[0].classList.add('activeAnimation');
        }, 36000);

        setTimeout(() => {
            document.getElementsByClassName('Wallpaper')[0].classList.remove('activeAnimation');
            document.getElementsByClassName('Wallpaper')[0].classList.add('active');
        }, 36300);
    
        setTimeout(() => {
            document.getElementsByClassName('Header')[0].classList.add('active');
            document.getElementsByClassName('Dock')[0].classList.add('active');
        }, 37000);
    
        setTimeout(() => {
            document.getElementsByClassName('DesktopBody')[0].classList.add('active');
        }, 38500);
    }
    
    function Sleep(){
        document.getElementsByClassName('Menu')[0].classList.remove('active');
        document.getElementsByClassName('PowerMenu')[0].classList.remove('active');
    
        setTimeout(() => {
            document.getElementsByClassName('Desktop')[0].classList.add('sleep');
        }, 500);
    }
    
    document.addEventListener('mousemove', e => {
        setTimeout(() => {
            document.getElementsByClassName('Desktop')[0].classList.remove('sleep');
        }, 100);
    })

    var type = props.type;
    switch(type){
        case 'sleep':
            return (
                <div className="PowerMenuInteraction" onClick={Sleep}>
                    <i className="fa-solid fa-moon"></i>
                    <p className="PowerMenuInteractionTitle">Sleep</p>
                </div>
            )
        case 'lock':
            return (
                <div className="PowerMenuInteraction" onClick={Lock}>
                    <i className="fa-solid fa-lock"></i>
                    <p className="PowerMenuInteractionTitle">Lock</p>
                </div>
            )
        case 'shutdown':
            return (
                <div className="PowerMenuInteraction" onClick={ShutDown}>
                    <i className="fa-solid fa-power-off"></i>
                    <p className="PowerMenuInteractionTitle">Shutdown</p>
                </div>
            )
        case 'restart':
            return (
                <div className="PowerMenuInteraction" onClick={Restart}>
                    <i className="fa-solid fa-rotate-left"></i>
                    <p className="PowerMenuInteractionTitle">Restart</p>
                </div>
            )
    }
}