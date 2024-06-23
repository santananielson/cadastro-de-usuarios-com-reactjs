import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/trash.svg'
import api from '../../services/api'


export default function Home() {
  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function getUsers() {
    const usersFromApi = await api.get('/usuarios')

    setUsers(usersFromApi.data)
  }

  async function createUsers() {
      await api.post('/usuarios', {
        name: inputName.current.value,
        age: inputAge.current.value,
        email: inputEmail.current.value
      })

      getUsers()
  }

  async function deleteUsers(id) {
      await api.delete(`/usuarios/${id}`)

      getUsers()
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
      <div className='container'>
        <form action="">
          <h1>Cadastro de Usuário</h1>
          <input type="text" name="nome" id="nome" placeholder="Nome"  ref={inputName}/>
          <input type="number" name="idade" id="idade" placeholder="Sua idade"  ref={inputAge}/>
          <input type="email" name="email" id="email" placeholder="Email"  ref={inputEmail}/>
          <button type="button" onClick={createUsers}>Cadastrar</button>
        </form>

        { users.map( (user) => (
          <div key={user.id} className='card'>
            <div>
              <p>Nome: <span>{user.name}</span></p>
              <p>Idade: <span>{user.age}</span></p>
              <p>Email: <span>{user.email}</span></p>
            </div>
            <button className='reset-btn' onClick={() => deleteUsers(user.id)}>
              <img src={Trash} alt="" />
            </button>
          </div>
        ))}

      </div>
  )
}

