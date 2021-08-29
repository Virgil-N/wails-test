/**
 * Created Date: 2020-12-30 01:57:35
 * Author: Virgil-N
 * Description:
 * -----
 * Last Modified: 2021-08-28 05:06:08
 * Modified By: Virgil-N (lieut9011@126.com)
 * -----
 * Copyright (c) 2019 - 2020 ⚐
 * Virgil-N will save your soul!
 * -----
 */

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"
import PropTypes from "prop-types";
import clsx from "clsx";
import _JSXStyle from "styled-jsx/style";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Drawer
} from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import config from "@/configs/config";
import sidebarOpendImg from "@/assets/images/temp.jpg";
import sidebarClosedImg from "@/assets/images/logo.png";
import { gradientColor } from "@/utils/color";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: config.drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    color: theme.palette.common.white
  },
  drawerPaper: {
    width: config.drawerWidth,
  },
  drawerOpen: {
    width: config.drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      // width: theme.spacing(9) + 1,
      width: theme.spacing(7) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    position: "sticky",
    top: 0,
    backgroundColor: theme.palette.common.white,
    zIndex: theme.zIndex.drawer + 1,
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  sidebarOpendLogoImg: {
    height: "64px",
    width: parseFloat(config.drawerWidth) - 1 + "px",
    backgroundSize: "auto",
    backgroundRepeat: "no-repeat",
    padding: 0
  },
  sidebarClosedLogoImg: {
    height: "57px",
    width: "57px",
    backgroundSize: "auto",
    backgroundRepeat: "no-repeat",
    padding: "2px 0px"
  },
  divider: {
    position: "sticky",
    top: "64px",
  },
  whiteColor: {
    color: theme.palette.common.white
  }
}));

const Sidebar = (props) => {
  const classes = useStyles();
  // const dispatch = useDispatch();
  const history = useHistory()

  // const sidebarOpend = useSelector((state) => {
  //   return state.appState.sidebarOpend;
  // });

  // const defaultSelectedKey = useSelector((state) => {
  //   return state.appState.defaultSelectedKey;
  // });

  // const defaultOpendKeys = useSelector((state) => {
  //   return state.appState.defaultOpendKeys;
  // });

  const [opendMenus, setOpendMenus] = useState(() => {
    return [];
  });

  const generateFlatRoutes = (routes, arr) => {
    for (let i = 0; i < routes.length; i++) {
      arr.push(routes[i].path);
      if (routes[i].children && routes[i].children.length > 0) {
        generateFlatRoutes(routes[i].children, arr);
      }
    }
    return arr;
  }

  const countMenuLeves = (arr) => {
    let max = 0;
    for (let i = 0; i < arr.length; i++) {
      const len = arr[i].split("/").length - 1; // ~ 除去空格
      if (len > max) {
        max = len;
      }
    }
    return max;
  }

  const flatRoutes = generateFlatRoutes(props.routeList, []);
  const maxLevel = countMenuLeves(flatRoutes);
  const colors = new gradientColor(config.sidebarStartBgColor, config.sidebarEndBgColor, maxLevel);

  // useEffect(() => {
  //   setOpendMenus(defaultOpendKeys);
  // }, [sidebarOpend, defaultOpendKeys])

  // const clickNestMenu = async (e, menuName) => {
  //   e.stopPropagation();
  //   let tempArr = defaultOpendKeys.split(" ");
  //   if (tempArr.includes(menuName)) {
  //     for (let i = tempArr.length - 1; i > 0; i--) {
  //       if (tempArr[i] === menuName || tempArr[i].search(menuName + "-") !== -1) {
  //         tempArr.splice(i, 1);
  //       }
  //     }
  //   } else {
  //     tempArr.push(menuName);
  //   }
  //   setOpendMenus(tempArr);
  //   dispatch(setDefaultOpendKeys(tempArr.join(" ")));
  // }

  const selectMenu = (e, params) => {
    e.stopPropagation();
    // dispatch(setDefaultSelectedKey(params.name));
    // history.push(params.path)
  };

  const generateSidebarItem = (menu, parentName, level) => {
    let content = null;
    level++; // ~ level必须和color长度值一致
    if (menu.children && menu.children instanceof Array && menu.children.length > 0) {
      content = menu.children.map(item => {
        return generateSidebarItem(item, menu.name, level);
      })
      if (level === 1) {
        return (
          <List
            component="div"
            key={menu.name + "-list"}
            style={{backgroundColor: colors[level - 1]}}
            disablePadding
          >
            {/* <ListItem
              button
              className={`${classes.whiteColor} ${defaultSelectedKey === menu.name ? "selected" : ""}`}
              onClick={(e) => clickNestMenu(e, menu.name)}
            >
              <ListItemIcon className={classes.whiteColor}>
                {menu.meta.icon ? <menu.meta.icon /> : null}
              </ListItemIcon>
              <ListItemText primary={menu.meta.title || ""} />
              {opendMenus.includes(parentName) ? <ExpandLess /> : <ExpandMore />}
            </ListItem> */}
            {content}
          </List>
        );
      } else {
        return (
          <Collapse
            key={menu.name + "-collapse"}
            in={opendMenus.includes(parentName)}
            style={{backgroundColor: colors[level]}}
            timeout="auto"
            unmountOnExit
          >
            {/* <List component="div" disablePadding>
              <ListItem
                button
                className={`${classes.whiteColor} ${defaultSelectedKey === menu.name ? "selected" : ""}`}
                onClick={(e) => clickNestMenu(e, menu.name)}
              >
                <ListItemIcon className={classes.whiteColor}>
                  {menu.meta.icon ? <menu.meta.icon /> : null}
                </ListItemIcon>
                <ListItemText primary={menu.meta.title || ""} />
                {opendMenus.includes(menu.name) ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              {content}
            </List> */}
          </Collapse>
        );
      }
    } else {
      if (menu.meta.hide) {
        return null;
      }
      return (
        <Collapse
          key={menu.name + "-collapse"}
          in={opendMenus.includes(parentName)}
          style={{backgroundColor: colors[level]}}
          timeout="auto"
          unmountOnExit
        >
          {/* <List component="div" disablePadding>
            <ListItem
              button
              key={menu.name}
              className={`${classes.whiteColor} ${defaultSelectedKey === menu.name ? "selected" : ""}`}
              onClick={(e) => selectMenu(e, menu)}
            >
              <ListItemIcon className={classes.whiteColor}>
                {menu.meta.icon ? <menu.meta.icon /> : null}
              </ListItemIcon>
              <ListItemText primary={menu.meta.title || ""} />
            </ListItem>
          </List> */}
        </Collapse>
      );
    }
  };

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, "drawer-wrap", {
        // [classes.drawerOpen]: sidebarOpend,
        // [classes.drawerClose]: !sidebarOpend,
      })}
      classes={{
        paper: clsx({
          // [classes.drawerOpen]: sidebarOpend,
          // [classes.drawerClose]: !sidebarOpend,
        })
      }}
      style={{backgroundColor: colors[0]}}
    >
      {/* {
        sidebarOpend ? (
          <img
            className={clsx(classes.toolbar, classes.sidebarOpendLogoImg, {
              [classes.drawerOpen]: sidebarOpend,
              [classes.drawerClose]: !sidebarOpend,
            })}
            src={sidebarOpendImg}
          />
        ) : (
          <img
            className={clsx(classes.toolbar, classes.sidebarClosedLogoImg, {
              [classes.drawerOpen]: sidebarOpend,
              [classes.drawerClose]: !sidebarOpend,
            })}
            src={sidebarClosedImg}
          />
        )
      } */}
      
      {/* <Divider /> */}
      {props.routeList.map((menu) => {
        if (menu.children && menu.children instanceof Array && menu.children.length > 0) {
          if (menu.meta.hide) {
            return null;
          }
          return generateSidebarItem(menu, menu.name, 0);
        } else {
          if (menu.meta.hide) {
            return null;
          }
          return (
            <List
              component="nav"
              key={menu.name + "-list"}
              style={{backgroundColor: colors[0]}}
            >
              {/* <ListItem
                button
                className={`${classes.whiteColor} ${defaultSelectedKey === menu.name ? "selected" : ""}`}
                onClick={(e) => selectMenu(e, menu)}
              >
                <ListItemIcon className={classes.whiteColor}>
                  {menu.meta.icon ? <menu.meta.icon /> : null}
                </ListItemIcon>
                <ListItemText primary={menu.meta.title || ""} className={classes.whiteColor} />
              </ListItem> */}
            </List>
          );
        }
      })}
      <style jsx>{`
        :global(.drawer-wrap > div) {
          background-color: ${colors[0]};
        }
        :global(.drawer-wrap .selected) {
          background-color: ${config.sidebarItemSelectedBgColor};
        }
      `}</style>
    </Drawer>
  );
};

Sidebar.defaultProps = {
  routeList: []
}

Sidebar.propTypes = {
  routeList: PropTypes.array
}

export default Sidebar;