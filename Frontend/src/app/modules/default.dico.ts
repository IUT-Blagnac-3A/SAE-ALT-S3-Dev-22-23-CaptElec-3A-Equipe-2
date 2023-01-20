module.exports = class DefaultDico {
  get CO2_UNIT() {
    return "ppm";
  }
  get HUMIDITY_UNIT() {
    return "%";
  }
  get TEMPERATURE_UNIT() {
    return "°C";
  }
  get PRESSURE_UNIT() {
    return "hPa";
  }
  get ACTIVITY_UNIT() {
    return "µg/m³";
  }
};
