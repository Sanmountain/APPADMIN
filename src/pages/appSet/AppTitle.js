import "../../styles/appTitle.css";

export default function AppTitle() {
  return (
    <>
      <div className='appTitleFormDiv'>
        <div className='appTiTitle'>현재 메인 문구</div>
        <div className='apptitleObject'>
          <div className='apptitleInput'>
            <input
              type='text'
              className='form-control validate program'
              readOnly
            />
          </div>
        </div>
      </div>
      <div className='appTitleFormDiv'>
        <div className='appTiTitle'>변경할 메인 문구</div>
        <div className='apptitleObject'>
          <div className='apptitleInput'>
            <input type='text' className='form-control validate program' />
            <button className='commonAppBtn'>변경</button>
          </div>
        </div>
      </div>
    </>
  );
}
