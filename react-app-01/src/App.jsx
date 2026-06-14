import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [userData, setUserData] = useState([])

  const fetchData = async () => {

    const response = await fetch("https://api.freeapi.app/api/v1/public/randomusers")

    const userData = await response.json()

    const data = await userData?.data?.data

    console.log(data)

    setUserData(data)

  }

  useEffect(() => {
    fetchData()
  }, [])


  return (
    <>

      <div className="user-container">
        {userData?.map((user) => {
          return (
            <div key={user?.id} className="user-card">
              <img src={user?.picture?.large} alt="card-photo" />

              <h1>
                {user?.name?.first} {user?.name?.last}
              </h1>

              <h3>{user?.email}</h3>

              <p>{user?.location?.country}</p>
              <p>{user?.phone}</p>
            </div>
          );
        })}
      </div>

    </>
  )
}

export default App
