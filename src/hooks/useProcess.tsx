import {
  setOptionsMenuShown,
  setSplashScreenWrapperHideInfo,
} from '@/store/reducers/lock';
import { setLocked, setSleeping } from '@/store/reducers/settings';
import { setHeaderActive } from '@/store/reducers/header';
import { setDockActive } from '@/store/reducers/dock';
import { setDesktopBodyActive } from '@/store/reducers/desktopbody';
import {
  setDesktopBlackScr,
  setDesktopHideCursor,
  setDesktopPoweroff,
} from '@/store/reducers/desktop';
import { setTerminalWindowActive } from '@/store/reducers/terminalwindow';
import { clearItem, pushItem } from '@/store/reducers/shutdown';
import LogoD from '@/images/logo-d.svg';
import { setWallpaperActive } from '@/store/reducers/wallpaper';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { quitApp } from '@/store/reducers/apps';

export default function useProcess() {
  const dispatch = useAppDispatch();
  const appIsActive = useAppSelector(state => state.apps.appIsActive);

  function sleep() {
    setTimeout(() => dispatch(setSplashScreenWrapperHideInfo(true)), 50);

    setTimeout(() => {
      dispatch(setSleeping(true));
      dispatch(setOptionsMenuShown(false));
    }, 300);

    document.addEventListener('keypress', () => {
      setTimeout(() => {
        dispatch(setSleeping(false));
        dispatch(setSplashScreenWrapperHideInfo(false));
      }, 100);
    });
  }

  function hibernate() {
    setTimeout(() => {
      dispatch(setSplashScreenWrapperHideInfo(true));
      dispatch(setHeaderActive(false));
      dispatch(setDockActive(false));
      dispatch(setDesktopBodyActive(false));
      for (const id in appIsActive) {
        dispatch(quitApp(id));
      }
    }, 50);

    setTimeout(() => {
      dispatch(setDesktopHideCursor(true));
      dispatch(setOptionsMenuShown(false));
    }, 800);

    setTimeout(() => {
      dispatch(setTerminalWindowActive(true));
      dispatch(pushItem(<pre>Initiating shutdown...</pre>));
    }, 2500);

    setTimeout(
      () => dispatch(pushItem(<pre>Stopped Load/Save Random Seed... OK</pre>)),
      3000,
    );

    setTimeout(() => {
      dispatch(pushItem(<pre>Stopped Session 1 of localhost... OK</pre>));
      dispatch(pushItem(<pre>Removed slice system-getty.slice... OK</pre>));
      dispatch(pushItem(<pre>Stopped Login Service... OK</pre>));
    }, 3500);

    setTimeout(() => {
      dispatch(pushItem(<pre>Stopped Initializes Pacman keyring... OK</pre>));
      dispatch(pushItem(<pre>Stopping Breeze Desktop Environment...</pre>));
    }, 3600);

    setTimeout(() => {
      dispatch(pushItem(<pre>Starting Plymouth Service...</pre>));
    }, 4000);

    setTimeout(() => {
      dispatch(clearItem());
      dispatch(setLocked(false));
      dispatch(
        pushItem(
          <div className="BootSplash">
            <img src={LogoD} width={431} height={240} />
          </div>,
        ),
      );
    }, 4800);

    setTimeout(() => {
      dispatch(clearItem());
      dispatch(setDesktopPoweroff(true));
      dispatch(setWallpaperActive(false));
    }, 13200);
  }

  function shutdown() {
    hibernate();
  }

  function restart() {
    hibernate();

    setTimeout(() => dispatch(setDesktopPoweroff(false)), 16500);

    setTimeout(() => {
      dispatch(setDesktopBlackScr(false));
      dispatch(clearItem());
      dispatch(pushItem(<pre>Reached target Startup... OK</pre>));
    }, 19000);

    setTimeout(() => {
      dispatch(pushItem(<pre>Started Startup... OK</pre>));
    }, 19700);

    setTimeout(() => {
      dispatch(pushItem(<pre>Starting Plymouth Service...</pre>));
    }, 20200);

    setTimeout(() => {
      dispatch(clearItem());
      dispatch(setHeaderActive(false));
      dispatch(setDockActive(false));
      dispatch(setDesktopBodyActive(false));
      dispatch(
        pushItem(
          <div className="BootSplash">
            <img src={LogoD} width={431} height={240} />
          </div>,
        ),
      );
    }, 21500);

    setTimeout(() => {
      dispatch(setDesktopHideCursor(false));
      dispatch(clearItem());
      dispatch(pushItem(<pre>Initiating shutdown...</pre>));
      dispatch(setTerminalWindowActive(false));
      dispatch(setWallpaperActive(true));
      dispatch(setLocked(true));
      dispatch(setSplashScreenWrapperHideInfo(false));
    }, 36000);
  }

  return { sleep, shutdown, restart };
}
