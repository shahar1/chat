import React from "react";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import * as ChatActions from "./store/actions/chatActions";
import Auth from "./components/pages/Auth";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  componentDidMount() {
      this.props.setupSocket();
  }

  render() {
      return (
          <div className={"App"}>
              <BrowserRouter>
                  <Switch>
                      <Route
                          path={"/login"}
                          component={Auth}/>

                      <Route
                          path={"/signup"}
                          component={Auth}/>
                      <Route
                          path={"/"}
                          render={props => {
                              if(!this.props.token){
                                  return <Redirect to={"/login"}/>
                              }

                              return <h1>Root</h1>
                          }}/>
                  </Switch>
              </BrowserRouter>
          </div>
      );
  }
}


const mapStateToProps = state => ({
    ...state.auth,
    ...state.chat,
});

const mapDispatchToProps = dispatch => ({
    setupSocket: () => {
        dispatch(ChatActions.setupSocket())
    }
});


export default connect(mapStateToProps,mapDispatchToProps)(App);
