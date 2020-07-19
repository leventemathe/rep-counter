import React, { useState, useContext } from 'react';
import { Button } from 'antd';
import { observer } from 'mobx-react';

import Stores from '../../stores';

export default observer(({
  text,
  loadingText,
  action,
  onNetworkResourceLoaded,
  onNetworkError,
  buttonProps,
  className,
  style,
}) => {
  const [loading, setLoading] = useState(false);
  const [resource, setResource] = useState(null);
  const [error, setError] = useState(null);

  const { uiStore } = useContext(Stores);

  const executeAction = async () => {
    try {
      setLoading(true);
      const result = await action();
      setResource(result);
      onNetworkResourceLoaded(resource);
    } catch (e) {
      setError(e);
      uiStore.error = e.message || e;
      onNetworkError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      {...buttonProps}
      style={style}
      className={className}
      onClick={executeAction}
      disabled={loading}
    >
      {loading ? (loadingText || 'Loadint') : (text || 'OK')}
    </Button>
  );
});
