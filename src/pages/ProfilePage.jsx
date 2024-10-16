


import { useEffect, useState } from 'react'

function ProfilePage() {

  const [dataOnlyForLoggedUsers, setData] = useState(null)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      
      // call a private route here...

    } catch (error) {
      console.log(error)
    }
  }

  // loading handler here

  return (
    <div>
      
      <h3>PROFILE PAGE</h3>
      <p>Solo usuarios resgistrados</p>

    </div>
  )
}

export default ProfilePage