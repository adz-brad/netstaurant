import React from "react"
import { useAuth0 } from "../../services/auth";

const Profile = () => {

  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  console.log(user)


  return(
    <React.Fragment>
      
        <div className="border-b-2 border-primary-700 m-2 pb-1">
            <h1 className="text-3xl lg:text-5xl font-bold tracking-tight pb-2 font-headers">Your Profile</h1>
        </div>

        <div className="flex flex-row m-2">

          <img src={user.picture} alt="Profile" />

          <div className="flex flex-col">


          </div>

        <span>{user.name}</span>
        <span>{user.email}</span>
        {user.sub}

        </div>


    </React.Fragment>
  )
}

export default Profile