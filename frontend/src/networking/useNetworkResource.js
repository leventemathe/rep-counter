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
        console.log(e);
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
