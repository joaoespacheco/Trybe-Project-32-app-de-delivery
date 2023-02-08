import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormUserRegistration from '../components/FormUserRegistration';
import Header from '../components/Header';
import Loading from '../components/Loading';
import UsersTable from '../components/UsersTable';
import {
  requestAllUsers,
  requestCreateUser,
  requestDeleteUser,
  setToken,
} from '../services/requests';

export default function AdminManage() {
  const [user, setUser] = useState('');
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setfetchError] = useState('');

  const navigate = useNavigate();

  const getStorageData = (storageName) => {
    const data = JSON.parse(localStorage.getItem(storageName));
    if (data === null) {
      return navigate('/login');
    }
    return data;
  };

  const fetchUsers = async () => {
    try {
      setToken(user.token);
      const users = await requestAllUsers();
      const filteredUser = users.filter(
        (userResponse) => userResponse.id !== user.id,
      );
      setRegisteredUsers(filteredUser);
    } catch (error) {
      console.log(error.message);
      setfetchError(error.message);
    }
  };

  const createUser = async (event, body) => {
    event.preventDefault();
    try {
      setToken(user.token);
      const newUser = await requestCreateUser(body);
      setRegisteredUsers([...registeredUsers, newUser]);
    } catch (error) {
      console.log(error.message);
      setfetchError(error.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      setToken(user.token);
      await requestDeleteUser(id);
      const restOfUsers = registeredUsers.filter(
        (registredUser) => registredUser.id !== id,
      );
      setRegisteredUsers(restOfUsers);
    } catch (error) {
      console.log(error.message);
      setfetchError(error.message);
    }
  };

  useEffect(() => {
    setUser(getStorageData('user'));
  }, []);

  useEffect(() => {
    if (user.id) {
      fetchUsers();
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="adminManage-container">
      <Header { ...user } />
      <div className="adminManage-container-content">
        <h2>Cadastrar novo usuário</h2>
        <FormUserRegistration
          createUser={ createUser }
        />
        <div
          className="error-container-content"
        >
          {
            fetchError && (
              <p data-testid="admin_manage__element-invalid-register">
                Erro: Falha ao cadastrar um novo usúario
              </p>
            )
          }
        </div>
        <h2>
          Quadro de usuários
        </h2>
        <div>
          <UsersTable
            users={ registeredUsers }
            deleteUser={ deleteUser }
          />
        </div>
      </div>
    </div>
  );
}
