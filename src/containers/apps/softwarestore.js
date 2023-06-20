import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {setActive, setHide} from "../../reducers/apps/softwarestore";
import '../../components/utils/window/Window.scss';
import TopBar from '../../components/utils/window/TopBar';
import WindowBody from '../../components/utils/window/WindowBody';
import DockItem from '../../components/DockItem';
import './assets/softwarestore.scss';
import TopBarInteraction from '../../components/utils/window/TopBarInteraction';
import StartApp from '../../components/startMenu/StartApp';
import {setHeaderActive} from "../../reducers/header";

export const SoftwareStoreApp = () => {
    const isActive = useSelector(state => state.appsSoftwareStore.active);
    const isHide = useSelector(state => state.appsSoftwareStore.hide);
    const dispatch = useDispatch();
    const icon = useSelector(state => state.appearance.iconTheme);

    document.addEventListener('keydown', (e) => {
        if(e.ctrlKey && e.keyCode === 48){
            dispatch(setActive(true));
        }
    });

    useEffect(() => {
        if(isActive){
            document.getElementsByClassName('SoftwareStoreApp')[0].classList.add('clicked');
            setTimeout(() => document.getElementsByClassName('softwarestore')[0].classList.add('active'), 500);
        } else {
            document.getElementsByClassName('SoftwareStoreApp')[0].classList.remove('clicked');
            document.getElementsByClassName('softwarestore')[0].classList.remove('active');
        }
        if(isHide){
            document.getElementsByClassName('SoftwareStoreApp')[0].classList.add('hide');
            document.getElementsByClassName('softwarestore')[0].classList.add('hide');
        } else {
            document.getElementsByClassName('SoftwareStoreApp')[0].classList.remove('hide');
            document.getElementsByClassName('softwarestore')[0].classList.remove('hide');
        }
    }, [isActive, isHide]);
    
	return (
        <DockItem id='softwarestore' class="SoftwareStoreApp" title='Software Store' icon={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/original/softwarecenter.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/software-store.svg'} onClick={() => isHide ? dispatch(setHide(false)) : dispatch(setActive(true))}/>
	)
};

export const SoftwareStoreStartApp = () => {
    const isHide = useSelector(state => state.appsSoftwareStore.hide);
    const dispatch = useDispatch();
    const icon = useSelector(state => state.appearance.iconTheme);
    
    const toggle = () => {
        document.getElementsByClassName('StartMenuWrapper')[0].classList.remove('active');
        dispatch(setHeaderActive(true));
        document.getElementsByClassName('DesktopBody')[0].classList.add('active');
        if(isHide){
            dispatch(setHide(false));
        } else {
            dispatch(setActive(true));
        }
    };

    return (
        <StartApp key='softwarestore' icon={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/original/softwarecenter.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/software-store.svg'} name='Software Store' onClick={toggle}/>
    )
}

export default function SoftwareStore() {
    const dispatch = useDispatch();
    const SoftwareStoreWindow = () => {
        const icon = useSelector(state => state.appearance.iconTheme);
        const [min, isMin] = useState(false);
        const [tabLayout, setTabLayout] = useState(true);
        const [value, setValue] = useState('1');
        const [tab, setTab] = useState('explorer');
        const [search, onSearch] = useState(false);
        const [featuredApplication, setFeaturedApplication] = useState('');

        function explorerTab(){
            setValue('1');
            setTab('explorer')
        }

        function installedTab(){
            setValue('2');
            setTab('installed')
        }

        function updatesTab(){
            setValue('3');
            setTab('updates')
        }

        function close(){
            dispatch(setActive(false));
            setTimeout(() => {
                explorerTab();
            }, 300);
        }

        function minimize(){
            document.getElementsByClassName('softwarestore')[0].classList.toggle('minimize');
            isMin(!min)
        }

        useEffect(() => {
            const list = ['Blender', 'Spotify', 'Caprine'];
            const randomIndex = Math.floor(Math.random() * list.length);
            setFeaturedApplication(list[randomIndex]);
        }, [])

        function changeFeaturedApplication(){
            switch(featuredApplication){
                case 'Blender':
                    return (
                        <div className='Blender'>
                            <div className='FeaturedApplicationWrapper'>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <img src='https://www.logolynx.com/images/logolynx/84/84a4ccbbcf81b63bd7268227bb5e6983.png' width={140} height={120}/>
                                    <div className='FeaturedApplicationInfo'>
                                        <h1 className='font-bold' style={{ marginBottom: '10px' }}>Blender</h1>
                                        <p className='font-normal'>3D modeling, animation, rendering and post-production</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                case 'Spotify':
                    return (
                        <div className='Spotify'>
                            <div className='FeaturedApplicationWrapper'>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <img src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/571e5943-4616-4654-bf99-10b3c98f8686/d98301o-426f05ca-8fe5-4636-9009-db9dd1fca1f3.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzU3MWU1OTQzLTQ2MTYtNDY1NC1iZjk5LTEwYjNjOThmODY4NlwvZDk4MzAxby00MjZmMDVjYS04ZmU1LTQ2MzYtOTAwOS1kYjlkZDFmY2ExZjMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0._SlX6x3jb9hDMoBDw92f_N0pVlwkrn-bMncfkRdFDXo' width={120} height={120}/>
                                    <div className='FeaturedApplicationInfo'>
                                        <h1 className='font-bold' style={{ marginBottom: '10px' }}>Spotify</h1>
                                        <p className='font-normal'>Music for everyone.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                case 'Caprine':
                    return (
                        <div className='Caprine'>
                            <div className='FeaturedApplicationWrapper'>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <img src='https://www.callmebot.com/wp-content/uploads/Logo_Messenger_NewBlurple-399x399-1.png' width={120} height={120}/>
                                    <div className='FeaturedApplicationInfo'>
                                        <h1 className='font-bold' style={{ marginBottom: '10px' }}>Caprine</h1>
                                        <p className='font-normal'>The best Facebook Messenger client for Linux.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
            }
        }

        function switchTab(){
            switch(tab) {
                case 'explorer':
                    return (
                        <div className='explorer'>
                            <div className='FeaturedApplication'>
                                <h2 className='font-bold'>Featured Application</h2>
                                <div className='FeaturedApplicationContainer'>
                                    {changeFeaturedApplication()}
                                </div>
                            </div>
                                <div className='EditorChoice'>
                                    <h2 className='font-bold'>Editor's Choice</h2>
                                    <div className='EditorChoiceContainer'>
                                        <div className='Application'>
                                            <img src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/apps/scalable/blender.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/blender.svg'} alt="Application" width={45} height={45}/>
                                            <div style={{ marginLeft: '15px', width: '100%' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                                    <p className='ApplicationTitle'>Blender</p>
                                                    <div className='ApplicationRating'>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-regular fa-star-sharp-half-stroke"></i>
                                                    </div>
                                                </div>
                                                <p className='ApplicationDesc'>Graphics & Design</p>
                                                <div className='ApplicationInstallButton'>Install</div>
                                            </div>
                                        </div>
                                        <div className='Application'>
                                            <img src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/apps/scalable/gimp.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/gimp.svg'} alt="Application" width={45} height={45}/>
                                            <div style={{ marginLeft: '15px', width: '100%' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                                    <p className='ApplicationTitle'>GIMP</p>
                                                    <div className='ApplicationRating'>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-regular fa-star-sharp"></i>
                                                    </div>
                                                </div>
                                                <p className='ApplicationDesc'>Graphics & Design</p>
                                                <div className='ApplicationInstallButton'>Install</div>
                                            </div>
                                        </div>
                                        <div className='Application'>
                                            <img src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/apps/scalable/libreoffice.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/libreoffice.svg'} alt="Application" width={45} height={45}/>
                                            <div style={{ marginLeft: '15px', width: '100%' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                                    <p className='ApplicationTitle'>LibreOffice</p>
                                                    <div className='ApplicationRating'>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-regular fa-star-sharp-half-stroke"></i>
                                                        <i className="fa-regular fa-star-sharp"></i>
                                                    </div>
                                                </div>
                                                <p className='ApplicationDesc'>Efficient</p>
                                                <div className='ApplicationInstallButton installed'>Installed</div>
                                            </div>
                                        </div>
                                        <div className='Application'>
                                            <img src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/apps/scalable/inkscape.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/inkscape.svg'} alt="Application" width={45} height={45}/>
                                            <div style={{ marginLeft: '15px', width: '100%' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                                    <p className='ApplicationTitle'>Inkscape</p>
                                                    <div className='ApplicationRating'>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                    </div>
                                                </div>
                                                <p className='ApplicationDesc'>Graphics & Design</p>
                                                <div className='ApplicationInstallButton'>Install</div>
                                            </div>
                                        </div>
                                        <div className='Application'>
                                            <img src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/apps/scalable/brave.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/brave.svg'} alt="Application" width={45} height={45}/>
                                            <div style={{ marginLeft: '15px', width: '100%' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                                    <p className='ApplicationTitle'>Brave</p>
                                                    <div className='ApplicationRating'>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-regular fa-star-sharp"></i>
                                                    </div>
                                                </div>
                                                <p className='ApplicationDesc'>Utilities</p>
                                                <div className='ApplicationInstallButton'>Install</div>
                                            </div>
                                        </div>
                                        <div className='Application'>
                                            <img src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/apps/scalable/spotify-client.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/spotify-client.svg'} alt="Application" width={45} height={45}/>
                                            <div style={{ marginLeft: '15px', width: '100%' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                                    <p className='ApplicationTitle'>Spotify</p>
                                                    <div className='ApplicationRating'>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-regular fa-star-sharp"></i>
                                                    </div>
                                                </div>
                                                <p className='ApplicationDesc'>Music</p>
                                                <div className='ApplicationInstallButton'>Install</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='RecentReleases'>
                                    <h2 className='font-bold'>Recent Releases</h2>
                                    <div className='RecentReleasesContainer'>
                                        <div className='Application'>
                                            <img src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/apps/scalable/audacity.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/audacity.svg'} alt="Application" width={45} height={45}/>
                                            <div style={{ marginLeft: '15px', width: '100%' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                                    <p className='ApplicationTitle'>Audacity</p>
                                                    <div className='ApplicationRating'>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-regular fa-star-sharp-half-stroke"></i>
                                                        <i className="fa-regular fa-star-sharp"></i>
                                                    </div>
                                                </div>
                                                <p className='ApplicationDesc'>Music</p>
                                                <div className='ApplicationInstallButton'>Install</div>
                                            </div>
                                        </div>
                                        <div className='Application'>
                                            <img src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/apps/scalable/telegram.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/telegram.svg'} alt="Application" width={45} height={45}/>
                                            <div style={{ marginLeft: '15px', width: '100%' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                                    <p className='ApplicationTitle'>Telegram</p>
                                                    <div className='ApplicationRating'>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-regular fa-star-sharp"></i>
                                                        <i className="fa-regular fa-star-sharp"></i>
                                                    </div>
                                                </div>
                                                <p className='ApplicationDesc'>Social Media</p>
                                                <div className='ApplicationInstallButton'>Install</div>
                                            </div>
                                        </div>
                                        <div className='Application'>
                                            <img src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/apps/scalable/discord.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/discord.svg'} alt="Application" width={45} height={45}/>
                                            <div style={{ marginLeft: '15px', width: '100%' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                                    <p className='ApplicationTitle'>Discord</p>
                                                    <div className='ApplicationRating'>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-regular fa-star-sharp"></i>
                                                    </div>
                                                </div>
                                                <p className='ApplicationDesc'>Social Media</p>
                                                <div className='ApplicationInstallButton'>Install</div>
                                            </div>
                                        </div>
                                        <div className='Application'>
                                            <img src='https://www.callmebot.com/wp-content/uploads/Logo_Messenger_NewBlurple-399x399-1.png' alt="Application" width={45} height={45}/>
                                            <div style={{ marginLeft: '15px', width: '100%' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                                    <p className='ApplicationTitle'>Caprine</p>
                                                    <div className='ApplicationRating'>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-regular fa-star-sharp"></i>
                                                        <i className="fa-regular fa-star-sharp"></i>
                                                    </div>
                                                </div>
                                                <p className='ApplicationDesc'>Social Media</p>
                                                <div className='ApplicationInstallButton'>Install</div>
                                            </div>
                                        </div>
                                        <div className='Application'>
                                            <img src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/apps/scalable/visual-studio-code.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/visual-studio-code.svg'} alt="Application" width={45} height={45}/>
                                            <div style={{ marginLeft: '15px', width: '100%' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                                    <p className='ApplicationTitle'>Visual Studio Code</p>
                                                    <div className='ApplicationRating'>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-regular fa-star-sharp"></i>
                                                    </div>
                                                </div>
                                                <p className='ApplicationDesc'>Developer Tools</p>
                                                <div className='ApplicationInstallButton installed'>Installed</div>
                                            </div>
                                        </div>
                                        <div className='Application'>
                                            <img src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/apps/scalable/sublime-text.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/sublime-text.svg'} alt="Application" width={45} height={45}/>
                                            <div style={{ marginLeft: '15px', width: '100%' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                                    <p className='ApplicationTitle'>Sublime Text</p>
                                                    <div className='ApplicationRating'>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-regular fa-star-sharp-half-stroke"></i>
                                                        <i className="fa-regular fa-star-sharp"></i>
                                                    </div>
                                                </div>
                                                <p className='ApplicationDesc'>Developer Tools</p>
                                                <div className='ApplicationInstallButton'>Install</div>
                                            </div>
                                        </div>
                                        <div className='Application'>
                                            <img src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/apps/scalable/github-desktop.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/github-desktop.svg'} alt="Application" width={45} height={45}/>
                                            <div style={{ marginLeft: '15px', width: '100%' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                                    <p className='ApplicationTitle'>GitHub Desktop</p>
                                                    <div className='ApplicationRating'>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-regular fa-star-sharp"></i>
                                                    </div>
                                                </div>
                                                <p className='ApplicationDesc'>Developer Tools</p>
                                                <div className='ApplicationInstallButton installed'>Installed</div>
                                            </div>
                                        </div>
                                        <div className='Application'>
                                            <img src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/apps/scalable/vim.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/vim.svg'} alt="Application" width={45} height={45}/>
                                            <div style={{ marginLeft: '15px', width: '100%' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                                    <p className='ApplicationTitle'>Vim</p>
                                                    <div className='ApplicationRating'>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-regular fa-star-sharp-half-stroke"></i>
                                                        <i className="fa-regular fa-star-sharp"></i>
                                                        <i className="fa-regular fa-star-sharp"></i>
                                                    </div>
                                                </div>
                                                <p className='ApplicationDesc'>Developer Tools</p>
                                                <div className='ApplicationInstallButton installed'>Installed</div>
                                            </div>
                                        </div>
                                        <div className='Application'>
                                            <img src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/apps/scalable/vlc.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/vlc.svg'} alt="Application" width={45} height={45}/>
                                            <div style={{ marginLeft: '15px', width: '100%' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                                    <p className='ApplicationTitle'>VLC</p>
                                                    <div className='ApplicationRating'>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-regular fa-star-sharp"></i>
                                                        <i className="fa-regular fa-star-sharp"></i>
                                                    </div>
                                                </div>
                                                <p className='ApplicationDesc'>Media</p>
                                                <div className='ApplicationInstallButton'>Install</div>
                                            </div>
                                        </div>
                                        <div className='Application'>
                                            <img src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/apps/scalable/brave.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/brave.svg'} alt="Application" width={45} height={45}/>
                                            <div style={{ marginLeft: '15px', width: '100%' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                                    <p className='ApplicationTitle'>Brave</p>
                                                    <div className='ApplicationRating'>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-regular fa-star-sharp"></i>
                                                    </div>
                                                </div>
                                                <p className='ApplicationDesc'>Utilities</p>
                                                <div className='ApplicationInstallButton'>Install</div>
                                            </div>
                                        </div>
                                        <div className='Application'>
                                            <img src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/apps/scalable/firefox.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/firefox.svg'} alt="Application" width={45} height={45}/>
                                            <div style={{ marginLeft: '15px', width: '100%' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                                    <p className='ApplicationTitle'>Firefox</p>
                                                    <div className='ApplicationRating'>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-regular fa-star-sharp"></i>
                                                        <i className="fa-regular fa-star-sharp"></i>
                                                    </div>
                                                </div>
                                                <p className='ApplicationDesc'>Utilities</p>
                                                <div className='ApplicationInstallButton installed'>Installed</div>
                                            </div>
                                        </div>
                                        <div className='Application'>
                                            <img src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/apps/scalable/google-chrome.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/chrome.svg'} alt="Application" width={45} height={45}/>
                                            <div style={{ marginLeft: '15px', width: '100%' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                                    <p className='ApplicationTitle'>Google Chrome</p>
                                                    <div className='ApplicationRating'>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp-half-stroke"></i>
                                                        <i className="fa-regular fa-star-sharp"></i>
                                                    </div>
                                                </div>
                                                <p className='ApplicationDesc'>Utilities</p>
                                                <div className='ApplicationInstallButton'>Install</div>
                                            </div>
                                        </div>
                                        <div className='Application'>
                                            <img src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/apps/scalable/opera.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/opera.svg'} alt="Application" width={45} height={45}/>
                                            <div style={{ marginLeft: '15px', width: '100%' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                                    <p className='ApplicationTitle'>Opera</p>
                                                    <div className='ApplicationRating'>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp-half-stroke"></i>
                                                        <i className="fa-regular fa-star-sharp"></i>
                                                    </div>
                                                </div>
                                                <p className='ApplicationDesc'>Utilities</p>
                                                <div className='ApplicationInstallButton'>Install</div>
                                            </div>
                                        </div>
                                        <div className='Application'>
                                            <img src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/apps/scalable/thunderbird.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/internet-mail.svg'} alt="Application" width={45} height={45}/>
                                            <div style={{ marginLeft: '15px', width: '100%' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                                    <p className='ApplicationTitle'>Thunderbird</p>
                                                    <div className='ApplicationRating'>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp-half-stroke"></i>
                                                        <i className="fa-regular fa-star-sharp"></i>
                                                    </div>
                                                </div>
                                                <p className='ApplicationDesc'>Efficient</p>
                                                <div className='ApplicationInstallButton installed'>Installed</div>
                                            </div>
                                        </div>
                                        <div className='Application'>
                                            <img src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/apps/scalable/2048.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/2048.svg'} alt="Application" width={45} height={45}/>
                                            <div style={{ marginLeft: '15px', width: '100%' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                                    <p className='ApplicationTitle'>2048</p>
                                                    <div className='ApplicationRating'>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-regular fa-star-sharp-half-stroke"></i>
                                                        <i className="fa-regular fa-star-sharp"></i>
                                                        <i className="fa-regular fa-star-sharp"></i>
                                                    </div>
                                                </div>
                                                <p className='ApplicationDesc'>Games</p>
                                                <div className='ApplicationInstallButton'>Install</div>
                                            </div>
                                        </div>
                                        <div className='Application'>
                                            <img src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/apps/scalable/gnome-mahjongg.svg' : 'https://linuxkamarada.com/files/2019/12/kmahjongg.svg'} alt="Application" width={45} height={45}/>
                                            <div style={{ marginLeft: '15px', width: '100%' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                                    <p className='ApplicationTitle'>Mahjongg</p>
                                                    <div className='ApplicationRating'>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-regular fa-star-sharp"></i>
                                                        <i className="fa-regular fa-star-sharp"></i>
                                                        <i className="fa-regular fa-star-sharp"></i>
                                                    </div>
                                                </div>
                                                <p className='ApplicationDesc'>Games</p>
                                                <div className='ApplicationInstallButton'>Install</div>
                                            </div>
                                        </div>
                                        <div className='Application'>
                                            <img src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/apps/scalable/chess.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/chess.svg'} alt="Application" width={45} height={45}/>
                                            <div style={{ marginLeft: '15px', width: '100%' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                                    <p className='ApplicationTitle'>Chess</p>
                                                    <div className='ApplicationRating'>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-regular fa-star-sharp"></i>
                                                        <i className="fa-regular fa-star-sharp"></i>
                                                    </div>
                                                </div>
                                                <p className='ApplicationDesc'>Games</p>
                                                <div className='ApplicationInstallButton'>Install</div>
                                            </div>
                                        </div>
                                        <div className='Application'>
                                            <img src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/apps/scalable/ksudoku.svg' : 'https://linuxkamarada.com/files/2019/12/ksudoku.svg'} alt="Application" width={45} height={45}/>
                                            <div style={{ marginLeft: '15px', width: '100%' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                                    <p className='ApplicationTitle'>Sudoku</p>
                                                    <div className='ApplicationRating'>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp-half-stroke"></i>
                                                        <i className="fa-regular fa-star-sharp"></i>
                                                        <i className="fa-regular fa-star-sharp"></i>
                                                    </div>
                                                </div>
                                                <p className='ApplicationDesc'>Games</p>
                                                <div className='ApplicationInstallButton'>Install</div>
                                            </div>
                                        </div>
                                        <div className='Application'>
                                            <img src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/apps/scalable/iagno.svg' : 'https://linuxkamarada.com/files/2019/12/qgo.svg'} alt="Application" width={45} height={45}/>
                                            <div style={{ marginLeft: '15px', width: '100%' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                                    <p className='ApplicationTitle'>Othello</p>
                                                    <div className='ApplicationRating'>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-solid fa-star-sharp"></i>
                                                        <i className="fa-regular fa-star-sharp-half-stroke"></i>
                                                        <i className="fa-regular fa-star-sharp"></i>
                                                        <i className="fa-regular fa-star-sharp"></i>
                                                    </div>
                                                </div>
                                                <p className='ApplicationDesc'>Games</p>
                                                <div className='ApplicationInstallButton'>Install</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    )
                case 'installed':
                    return (
                        <div className='installed'>
                            <div className='InstalledAppContainer'>
                                <div className='Application'>
                                    <img src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/apps/scalable/firefox.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/firefox.svg'} alt="Application" width={45} height={45}/>
                                    <div style={{ marginLeft: '15px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <p className='ApplicationTitle'>Firefox</p>
                                        <div className='ApplicationInstallButton'>
                                            <i class="fa-regular fa-trash"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className='Application'>
                                    <img src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/alternative/apps/preferences-system-time.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/preferences-system-time.svg'} alt="Application" width={45} height={45}/>
                                    <div style={{ marginLeft: '15px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <p className='ApplicationTitle'>Clock</p>
                                        <div className='ApplicationInstallButton'>
                                            <i class="fa-regular fa-trash"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className='Application'>
                                    <img src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/devices/scalable/camera-photo.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/accessories-camera.svg'} alt="Application" width={45} height={45}/>
                                    <div style={{ marginLeft: '15px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <p className='ApplicationTitle'>Camera</p>
                                        <div className='ApplicationInstallButton'>
                                            <i class="fa-regular fa-trash"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className='Application'>
                                    <img src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/original/calc.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/accessories-calculator.svg'} alt="Application" width={45} height={45}/>
                                    <div style={{ marginLeft: '15px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <p className='ApplicationTitle'>Calculator</p>
                                        <div className='ApplicationInstallButton'>
                                            <i class="fa-regular fa-trash"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className='Application'>
                                    <img src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/apps/scalable/text-editor.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/accessories-text-editor.svg'} alt="Application" width={45} height={45}/>
                                    <div style={{ marginLeft: '15px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <p className='ApplicationTitle'>Text Editor</p>
                                        <div className='ApplicationInstallButton'>
                                            <i class="fa-regular fa-trash"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className='Application'>
                                    <img src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/original/calendar.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/calendar.svg'} alt="Application" width={45} height={45}/>
                                    <div style={{ marginLeft: '15px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <p className='ApplicationTitle'>Calendar</p>
                                        <div className='ApplicationInstallButton'>
                                            <i class="fa-regular fa-trash"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className='Application'>
                                    <img src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/original/terminal.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/utilities-x-terminal.svg'} alt="Application" width={45} height={45}/>
                                    <div style={{ marginLeft: '15px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <p className='ApplicationTitle'>Terminal</p>
                                        <div className='ApplicationInstallButton'>
                                            <i class="fa-regular fa-trash"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className='Application'>
                                    <img src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/apps/scalable/thunderbird.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/internet-mail.svg'} alt="Application" width={45} height={45}/>
                                    <div style={{ marginLeft: '15px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <p className='ApplicationTitle'>Thunderbird</p>
                                        <div className='ApplicationInstallButton'>
                                            <i class="fa-regular fa-trash"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className='Application'>
                                    <img src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/apps/scalable/github-desktop.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/github-desktop.svg'} alt="Application" width={45} height={45}/>
                                    <div style={{ marginLeft: '15px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <p className='ApplicationTitle'>GitHub Desktop</p>
                                        <div className='ApplicationInstallButton'>
                                            <i class="fa-regular fa-trash"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className='Application'>
                                    <img src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/apps/scalable/visual-studio-code.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/visual-studio-code.svg'} alt="Application" width={45} height={45}/>
                                    <div style={{ marginLeft: '15px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <p className='ApplicationTitle'>Visual Studio Code</p>
                                        <div className='ApplicationInstallButton'>
                                            <i class="fa-regular fa-trash"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className='Application'>
                                    <img src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/apps/scalable/vim.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/vim.svg'} alt="Application" width={45} height={45}/>
                                    <div style={{ marginLeft: '15px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <p className='ApplicationTitle'>Vim</p>
                                        <div className='ApplicationInstallButton'>
                                            <i class="fa-regular fa-trash"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                case 'updates':
                    return (
                        <div className='updates'>
                            <i className='fa-solid fa-circle-check' style={{ fontSize: '80px' }}></i>
                            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                                <h1>Up to Date</h1>
                                <p className='font-normal'>Last checked: Just now</p>
                            </div>
                        </div>
                    )
            }
        }

        return (
            <>
                <TopBar title='Software Store' onDblClick={minimize}>
                    <TopBarInteraction action='hide' onHide={() => dispatch(setHide(true))}/>
                    <TopBarInteraction action={min ? 'max' : 'min'} onMinMax={minimize}/>
                    <TopBarInteraction action='close' onClose={close}/>
                </TopBar>
                <WindowBody>
                    <div className='SoftwareStore'>
                        <i class="fa-light fa-table-layout SoftwareTableLayout" onClick={() => setTabLayout(!tabLayout)}></i>
                        <div className={`NavPanel ${tabLayout ? '' : 'inactive'}`}>
                            <div className='Category'>
                                <h2 className='CategoryTitle'>Categories</h2>
                                <div className='Categories'>
                                    <div className='CategoryItem create'>
                                        <i className="fa-regular fa-pen-to-square fa-sm" style={{ marginRight: '7px' }}></i>
                                        <p className='font-bold'>Create</p>
                                    </div>
                                    <div className='CategoryItem work'>
                                        <i className="fa-regular fa-list-check" style={{ marginRight: '7px' }}></i>
                                        <p className='font-bold'>Work</p>
                                    </div>
                                    <div className='CategoryItem play'>
                                        <i className="fa-regular fa-gamepad-modern" style={{ marginRight: '7px' }}></i>
                                        <p className='font-bold'>Play</p>
                                    </div>
                                    <div className='CategoryItem socialize'>
                                        <i className="fa-regular fa-globe" style={{ marginRight: '7px' }}></i>
                                        <p className='font-bold'>Socialize</p>
                                    </div>
                                    <div className='CategoryItem learn'>
                                        <i className="fa-regular fa-chalkboard-user" style={{ marginRight: '7px' }}></i>
                                        <p className='font-bold'>Learn</p>
                                    </div>
                                    <div className='CategoryItem develop'>
                                        <i className="fa-regular fa-laptop-code" style={{ marginRight: '7px' }}></i>
                                        <p className='font-bold'>Develop</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='SoftwareContainer'>
                            <div className='SoftwareTab'>
                                {search ? (
                                    <div className='SoftwareNav'>
                                        <input className='SoftwareSearchbar' id='softwaresearch' spellCheck={false} placeholder='Search apps...' autoFocus='1'/>
                                        <i className='fa-regular fa-xmark CloseSearchbar' onClick={() => onSearch(!search)}></i>
                                    </div>
                                ) : (
                                    <div className='SoftwareNav' value={value}>
                                        <div className='SoftwareNavItem explorer' onClick={explorerTab}>
                                            <i className="fa-regular fa-burst" style={{ marginRight: '7px' }}></i>
                                            <p className='font-bold'>Explorer</p>
                                        </div>
                                        <div className='SoftwareNavItem installed' onClick={installedTab}>
                                            <i className="fa-regular fa-circle-check" style={{ marginRight: '7px' }}></i>
                                            <p className='font-bold'>Installed</p>
                                        </div>
                                        <div className='SoftwareNavItem updates' onClick={updatesTab}>
                                            <i className="fa-regular fa-rotate" style={{ marginRight: '7px' }}></i>
                                            <p className='font-bold'>Updates</p>
                                        </div>
                                    </div>
                                )}
                                <i className="fa-regular fa-magnifying-glass SoftwareSearch" onClick={() => onSearch(!search)}></i>
                            </div>
                            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                <div className='Software'>
                                    {switchTab()}
                                </div>
                            </div>
                        </div>
                    </div>
                </WindowBody>
            </>
        )
    }

    return (
        <div className='SoftwareStoreWindow'>   
                <div
                    className='Window softwarestore'
                    key={Math.random()}
                >
                    <SoftwareStoreWindow/>
                </div> 
        </div>
    )
}