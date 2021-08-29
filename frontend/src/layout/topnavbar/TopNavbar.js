/**
 * Created Date: 2021-07-28 04:07:17
 * Author: Virgil-N
 * Description:
 * -----
 * Last Modified: 2021-08-09 11:55:48
 * Modified By: Virgil-N (lieut9011@126.com)
 * -----
 * Copyright (c) 2019 - 2021 ⚐
 * Virgil-N will save your soul!
 * -----
 */

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Badge,
  Menu,
  MenuItem,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  // InputBase,
  alpha,
  makeStyles
} from "@material-ui/core";
import clsx from "clsx";
import MenuIcon from "@material-ui/icons/Menu";
// import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import config from "@/configs/config";
import { useSnackbar } from "notistack";
import {
  userLogout,
  setAccessToken,
  setRefreshToken,
  setUserLoginState
} from "@/store/reducers/user";
import {
  resetAppState,
  setSidebarOpend
} from "@/store/reducers/appState";


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    marginLeft: theme.spacing(7) + 1,
    width: `calc(100% - ${theme.spacing(7) + 1}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: config.drawerWidth,
    width: `calc(100% - ${config.drawerWidth})`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: "none",
  },
  menuButton: {
    marginRight: 36,
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const TopNavbar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const sidebarOpend = useSelector((state) => {
    return state.appState.sidebarOpend;
  })

  const handleSidebar = (e) => {
    e.stopPropagation();
    dispatch(setSidebarOpend(!sidebarOpend));
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const logout = async () => {
    const res = await dispatch(userLogout());
    if (res && res.error) {
      enqueueSnackbar(res.error.message + ", 正在跳转到登录页面...", {variant: "error"});
      const t = setTimeout(() => {
        dispatch(setAccessToken(""));
        dispatch(setRefreshToken(""));
        dispatch(setUserLoginState(false));
        dispatch(resetAppState());
        clearInterval(t);
      }, 5000);
    } else {
      if (res && res.payload
        && (res.payload.code === 2000
        || res.payload.code === 5001
        || res.payload.code === 5002
        || res.payload.code === 5003
        || res.payload.code === 5004
        || res.payload.code === 5005
        || res.payload.code === 5006)) {
        dispatch(setAccessToken(""));
        dispatch(setRefreshToken(""));
        dispatch(setUserLoginState(false));
        dispatch(resetAppState());
      }
    }
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem> */}
      <MenuItem onClick={logout}>注销</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  
  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: sidebarOpend,
      })}
    >
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="open drawer"
          onClick={(e) => handleSidebar(e)}
        >
          {sidebarOpend ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>
        <Typography className={classes.title} variant="h5" noWrap>
          {config.appName + " (v" + config.appVersion + ")"}
        </Typography>
        {/* <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </div> */}
        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
          {/* <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton> */}
          {/* <IconButton aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={17} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </div>
        <div className={classes.sectionMobile}>
          <IconButton
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </div>
      </Toolbar>
      {renderMobileMenu}
      {renderMenu}
    </AppBar>
  )
};

export default TopNavbar;