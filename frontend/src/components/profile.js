import { useNavigate } from "react-router-dom";
import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { UserDataContext } from "./ContextAPI/UserDataContext";

function Profile() {
  const navigator = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [char, setChar] = useState(null);
  const {setUser} = React.useContext(UserDataContext);
  const { instance, accounts} = useMsal();

  const onProfile = ()=>{
    navigator('/MyPortfolio');
  }

  React.useEffect(()=>{
    try{
        setChar(accounts[0].name[0])
    }catch(err){
      console.log(err);
    }
  }, []);
  

  const handleLogout = () => {
    setUser(null);
    instance.logoutPopup({
      postLogoutRedirectUri: "/",
      mainWindowRedirectUri: "/",
    });
  };

  return (
    <>
      <div style={{cursor:'pointer',color:'white'}}>
            <span style = {styles.Tag} onClick = {handleClick}>
              <p style = {{margin: 0, fontSize: 20, fontWeight: '500'}}>{char}</p>
            </span>
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={onProfile}>My Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
}


const styles = {
    Tag:{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: 40,
      height: 40,
      borderRadius: '200%',
      borderStyle: "solid",
      borderColor: 'white',
      alignSelf: 'center',
      marginRight: 11
    }
}


export default Profile;
