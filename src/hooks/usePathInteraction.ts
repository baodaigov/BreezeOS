import { useDispatch } from 'react-redux';
import * as TextEditor from '@/store/reducers/apps/texteditor';
import * as ImgView from '@/store/reducers/imgview';

export default function usePathInteraction() {
  const dispatch = useDispatch();

  function executeCommandWithPath(path: string, location: string, content?: any) {
    if (path === 'txt') {
      dispatch(TextEditor.setActive(true));
    } else if (path === 'png' || path === 'jpg') {
      dispatch(ImgView.openPic(content));
      dispatch(ImgView.setLocation(location));
    }
  }

  return { executeCommandWithPath };
}
