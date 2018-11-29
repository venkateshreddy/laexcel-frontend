// import React from 'react';
// import { Router, Route, IndexRoute, hashHistory } from 'react-router';
// import Layout from '../Layout/Layout';
// import Home from '../Home/Home';
// import Browse from '../../screens/Browse/Browse';

// class Routes extends React.Component {
//   render() {
//     console.log(this.props);
//     return (
//       <Router history={hashHistory}>
//         <Route path="/" component={Layout}>
//           <IndexRoute component={Home} />
//           <Route path="/browse" name="Browse" component={Browse} />
//         </Route>
//       </Router>
//     );
//   }
// }

// export default Routes;

import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Layout from '../Layout/Layout';
import Home from '../Home/Home';
// import Browse from '../../screens/Browse/Browse';

class Routes extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Layout}>
          <IndexRoute component={Home} />
          {/* <Route path="/browse" name="Browse" component={Browse} /> */}
        </Route>
      </Router>
    );
  }
}

export default Routes;
