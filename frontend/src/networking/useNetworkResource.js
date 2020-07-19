import { useState, useEffect, useContext } from 'react';

import Stores from '../stores';

export default (action, trigger) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resource, setResource] = useState(null);

  const { uiStore } = useContext(Stores);

  useEffect(() => {
    const executeAction = async () => {
      try {
        setLoading(true);
        const result = await action();
        setResource(result);
        setLoading(false);
      } catch (e) {
        uiStore.error = e.message || e;
        setError(e);
      }
    };
    executeAction();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  return {
    loading,
    error,
    resource,
  };
};
