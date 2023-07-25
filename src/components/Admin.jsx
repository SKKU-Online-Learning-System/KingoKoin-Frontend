import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCog } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/main/users');
  };

  return (
    <FontAwesomeIcon icon={faUserCog} type='button' onClick={handleClick} />
  );
}

export default Admin;
