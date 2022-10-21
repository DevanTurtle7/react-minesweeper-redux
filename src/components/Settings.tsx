import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectPreferences} from 'redux/selectors/preferences_selectors';
import {setPreferences} from 'redux/slices/preferences_slice';
import '../styles/settings.scss';

const Settings = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [mineCount, setMineCount] = useState(0);
  const preferences = useSelector(selectPreferences);
  const dispatch = useDispatch();

  useEffect(() => {
    const {
      width: widthPreference,
      height: heightPreference,
      mineCount: mineCountPreference,
    } = preferences;

    setWidth(widthPreference);
    setHeight(heightPreference);
    setMineCount(mineCountPreference);
  }, [preferences]);

  const onWidthChange = (e: any) => setWidth(e.target.value);
  const onHeightChange = (e: any) => setWidth(e.target.value);
  const onMineCountChange = (e: any) => setMineCount(e.target.value);
  const onSave = () => dispatch(setPreferences({width, height, mineCount}));

  return (
    <div id='settings'>
      <label htmlFor='width'>Width:</label>
      <input
        name='width'
        onChange={onWidthChange}
        value={width}
        type={'number'}
      />
      <label htmlFor='height'>Height:</label>
      <input
        name='height'
        onChange={onHeightChange}
        value={height}
        type={'number'}
      />
      <label htmlFor='mines'>Mines:</label>
      <input
        name='mines'
        onChange={onMineCountChange}
        value={mineCount}
        type={'number'}
      />
      <button onClick={onSave}>Save</button>
    </div>
  );
};

export default Settings;
