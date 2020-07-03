import { useState, useEffect } from 'react';

export default (action, trigger) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resource, setResource] = useState(null);

  useEffect(() => {
    const executeAction = async () => {
      try {
        setLoading(true);
        const result = await action();
        setResource(result);
        setLoading(false);
      } catch (e) {
        setError(e);
      }
    };
    executeAction();
  }, [action, trigger]);

  return {
    loading,
    error,
    resource,
  };
};
