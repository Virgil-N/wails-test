/**
 * Created Date: 2021-07-30 10:08:09
 * Author: Virgil-N
 * Description:
 * -----
 * Last Modified: 2021-08-28 04:06:44
 * Modified By: Virgil-N (lieut9011@126.com)
 * -----
 * Copyright (c) 2019 - 2021 ⚐
 * Virgil-N will save your soul!
 * -----
 */

import React from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import routeList from "@/routes/index";

const generateTitleArr = (routePath, list = [], arr = []) => {
  for (let i = 0; i < list.length; i++) {
    if (routePath.indexOf(list[i].path) !== -1) {
      arr.push(list[i]);
      if (list[i].children && list[i].children.length > 0) {
        generateTitleArr(routePath, list[i].children, arr);
      }
      break;
    }
  }
  return arr;
};

const generateFlatRoutes = (routes, arr) => {
  for (let i = 0; i < routes.length; i++) {
    arr.push(routes[i]);
    if (routes[i].children && routes[i].children.length > 0) {
      generateFlatRoutes(routes[i].children, arr);
    }
  }
  return arr;
};

const findMatchedRouteName = (params, routeList) => {
  const routes = generateFlatRoutes(routeList, []);
  for (let i = 0; i < routes.length; i++) {
    if (routes[i].path === params) {
      return routes[i].name;
    }
  }
  return null;
};

const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

const Breadcrumb = () => {
  const history = useHistory();
  const matchedRoutes = generateTitleArr(
    history.location.pathname,
    routeList,
    []
  );

  const clickBreadcrumb = (params) => {
    const routeName = findMatchedRouteName(params, routeList);
    if (routeName !== null) {
      // dispatch(setDefaultSelectedKey(routeName));
    }
  };

  const generateBreadcrumbItem = (list) => {
    return list.map((v, i) => {
      if (i + 1 === matchedRoutes.length) {
        return (
          <Typography color="textPrimary" key={i}>
            {v.meta.title}
          </Typography>
        );
      }
      return (
        <LinkRouter
          color="inherit"
          key={i}
          to={v.redirect ? v.redirect : v.path}
          onClick={() => clickBreadcrumb(v.redirect ? v.redirect : v.path)}
        >
          {v.meta.title}
        </LinkRouter>
      );
    });
  };

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {generateBreadcrumbItem(matchedRoutes)}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
