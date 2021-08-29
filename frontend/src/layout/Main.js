/**
 * Created Date: 2020-12-29 02:22:53
 * Author: Virgil-N
 * Description:
 * -----
 * Last Modified: 2021-08-16 04:46:20
 * Modified By: Virgil-N (lieut9011@126.com)
 * -----
 * Copyright (c) 2019 - 2020 ⚐
 * Virgil-N will save your soul!
 * -----
 */

import React from "react";
import routeList from "@/routes/index";
import _JSXStyle from "styled-jsx/style";
import { Box, CssBaseline, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PrivateRoute from "@/routes/privateRoute/PrivateRoute";
import ReactShadowScroll from 'react-shadow-scroll';
import TopNavbar from "@/layout/topnavbar/TopNavbar";
import Sidebar from "@/layout/sidebar/Sidebar";
import Breadcrumb from "@/layout/breadcrumb/Breadcrumb";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  wrap: {
    flexGrow: 1,
    marginTop: theme.spacing(8),
  },
  breadcrumbBox: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    position: "fixed",
    width: "100%",
    backgroundColor: theme.palette.common.white,
  },
  divider: {
    position: "fixed",
    width:"100%",
    marginTop: theme.spacing(7),
  },
  content: {
    paddingTop: theme.spacing(7),
    width: "100%",
    height: "100%",
  },
}));

const Main = () => {
  const classes = useStyles();
  return (
    <Box id="main-layout" className={classes.root}>
      <CssBaseline />
      <TopNavbar></TopNavbar>
      <Sidebar routeList={routeList}></Sidebar>
      <main className={classes.wrap}>
        <Box className={classes.breadcrumbBox}>
          <Breadcrumb></Breadcrumb>
        </Box>
        <Divider className={classes.divider} />
        <Box className={classes.content}>
          <ReactShadowScroll isShadow={false} style={{height: "100%"}}>
            <PrivateRoute routeList={routeList} />
          </ReactShadowScroll>
        </Box>
      </main>
      <style jsx>{`
        :global(#main-layout) {
          width: 100%;
        }
      `}</style>
    </Box>
  )
}

export default Main;