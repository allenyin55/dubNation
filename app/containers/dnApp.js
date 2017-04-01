'use strict';

import React, {Component} from 'react';
import { connect } from 'react-redux';
import DubNation from '../components/dubNation.js';

class DNApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <DubNation/>
    );
  }
}

export default connect()(DNApp);