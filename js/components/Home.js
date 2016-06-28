import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as HomeActions from '../actions/HomeActions';
import styles from '../../css/app.css';


class Home extends Component {
  render() {
    return (
      <div>
        <main>
          {this.props.children}
        </main>
      </div>
    );
  }
}

export default Home
