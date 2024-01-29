import { useDispatch } from 'react-redux';
import * as ImgView from '@/store/reducers/imgview';
import { openApp } from '@/store/reducers/apps';

export default function usePathInteraction() {
  const dispatch = useDispatch();

  function executeCommandWithPath(path: string, location: string, content?: any) {
    if (path === 'txt') {
      dispatch(openApp("texteditor"));
    } else if (path === 'png' || path === 'jpg' || path === 'jpeg') {
      dispatch(ImgView.openPic(content));
      dispatch(ImgView.setLocation(location));
      dispatch(openApp("imgview"))
    }
  }

  return { executeCommandWithPath };
}