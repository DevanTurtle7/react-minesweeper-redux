import '../styles/settings.scss';

const Settings = () => {
  return (
    <div id='settings'>
      <label htmlFor='width'>Width:</label>
      <input name='width'></input>
      <label htmlFor='width'>Height:</label>
      <input name='width'></input>
      <label htmlFor='width'>Mines:</label>
      <input name='width'></input>
      <button>Save</button>
    </div>
  );
};

export default Settings;
