import React from 'react';
import { withRouter } from 'react-router-dom';

import { PageHeader } from 'antd';

import Page from './Page';

export default withRouter(({ history }) => (
  <Page>
    <PageHeader
      className="site-page-header"
      onBack={() => history.goBack()}
      title="Exercise"
      // subTitle=""
    />
  </Page>
));
