import Units from '../constants/Units';

export default (value, fromUnit, toUnit = Units.METRIC) => {
  if (fromUnit === toUnit) return value;
  if (fromUnit === Units.METRIC) return value * 2.20462;
  return value * 0.453592;
};
