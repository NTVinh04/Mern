//logo
import logo from '../assest/logo.png';

const Logo = ({ w, h }) => {
  return (
    <div style={{ width: w, height: h }}>
      <img src={logo} alt="Logo" style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default Logo;
