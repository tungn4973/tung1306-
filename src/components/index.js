import React from "react";
import {
  Home,
  ProtectedRoute,
  AdminProtectedRoute,
  PageNotFound,
  Shop,
  AllDoctors,
  DoctorDetails,
  Skills,
  Certificates,
  Contracts,
} from "./shop";
import Layout from "./shop/layout";
import PersonalInfo from "./shop/pages/PersonalInfo";
import { UserProfile, UserOrders, SettingUser } from "./shop/dashboardUser";
import VerifyEmail from "./shop/auth/VerifyEmail";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

/* Routing All page will be here */
const Routes = () => {
  return (
    <Router>
      <Switch>
        {/* Shop & Public Routes */}
        <Route exact path="/" component={Home} />
        <Route exact path="/shop" component={Shop} />
        <Route
          exact
          path="/skills"
          render={() => (
            <Layout>
              <Skills />
            </Layout>
          )}
        />
        <Route
          exact
          path="/certificates"
          render={() => (
            <Layout>
              <Certificates />
            </Layout>
          )}
        />
        <Route
          exact
          path="/contracts"
          render={() => (
            <Layout>
              <Contracts />
            </Layout>
          )}
        />
        <Route
          exact
          path="/profile"
          render={() => (
            <Layout>
              <PersonalInfo />
            </Layout>
          )}
        />
        <Route exact path="/doctors" component={AllDoctors} />
        <Route exact path="/doctors/:id" component={DoctorDetails} />
        <Route
          exact
          path="/products/category/:catId"
          component={Shop}
        />
        <Route exact path="/verify-email/:token" component={VerifyEmail} />
        {/* Shop & Public Routes End */}

        {/* Admin Routes removed */}

        {/* User Dashboard */}
        <ProtectedRoute
          exact={true}
          path="/user/profile"
          component={UserProfile}
        />
            {/* Orders route removed (UserOrders deleted) */}
        <ProtectedRoute
          exact={true}
          path="/user/setting"
          component={SettingUser}
        />
        {/* User Dashboard End */}

        {/* 404 Page */}
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
