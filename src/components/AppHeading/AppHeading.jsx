import { useContext, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Box, styled, Typography, Dialog } from "@mui/material";
import { AppContext } from "../AppContext/AppContext";
import { STORAGE_KEYS } from "../../utils/constants";
import SignOutDialog from "../SignOutDialog/SignOutDialog";

const Container = styled(Box)(() => ({
  backgroundColor: "wheat",
  color: "black",
  textAlign: "left",
  height: "fit-content",
  padding: "20px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}));

const LinkText = styled(Typography)(() => ({
  color: "black",
  margin: "0 20px",
}));

function AppHeading() {
  const { user } = useContext(AppContext);
  return (
    <>
      <Container>
        <NavLink to="/">
          <LinkText variant="h3">My App</LinkText>
        </NavLink>
        <Container>
          {user?.id && (
            <Typography
              variant="h4"
              sx={{
                color: "lightyellow",
                marginRight: "50px",
                fontStyle: "italic",
              }}
            >
              Hello, {user.name}
            </Typography>
          )}
          <NavLink to="/about">
            <LinkText variant="h4">About</LinkText>
          </NavLink>
          {user?.id ? <UserHeading name={user.name} /> : <PublicHeading />}
        </Container>
      </Container>
      <Outlet />
    </>
  );
}

const UserHeading = () => {
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);

  const openSignOutDialog = (e) => {
    e.preventDefault();
    setOpenDialog(true);
  };

  const handleConfirmSignOut = () => {
    window.localStorage.removeItem(STORAGE_KEYS.USER);
    window.sessionStorage.removeItem(STORAGE_KEYS.USER);

    setUser(null);
    navigate("/signIn");
  };

  return (
    <>
      <NavLink to="/profile">
        <LinkText variant="h4">Profile</LinkText>
      </NavLink>
      <NavLink to="/signOut" onClick={openSignOutDialog}>
        <LinkText variant="h4">Sign out</LinkText>
      </NavLink>
      <SignOutDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        handleConfirm={handleConfirmSignOut}
      />
    </>
  );
};

const PublicHeading = () => {
  return (
    <>
      <NavLink to="/signIn">
        <LinkText variant="h4">Sign in</LinkText>
      </NavLink>
    </>
  );
};

export default AppHeading;
