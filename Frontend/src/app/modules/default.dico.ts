export default class DefaultDico {
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

  get CO2_MIN() {
    return 0;
  }

  get CO2_MAX() {
    return 10000;
  }

  get HUMIDITY_MIN() {
    return 0;
  }

  get HUMIDITY_MAX() {
    return 100;
  }

  get TEMPERATURE_MIN() {
    return -5;
  }

  get TEMPERATURE_MAX() {
    return 50;
  }

  get PRESSURE_MIN() {
    return 900;
  }

  get PRESSURE_MAX() {
    return 1100;
  }

  get ACTIVITY_MIN() {
    return 0;
  }

  get ACTIVITY_MAX() {
    return 100;
  }

  get CO2_MIN_COLOR() {
    return "#00ff00";
  }

  get CO2_MAX_COLOR() {
    return "#ff0000";
  }

  get HUMIDITY_MIN_COLOR() {
    return "#00ff00";
  }

  get HUMIDITY_MAX_COLOR() {
    return "#ff0000";
  }

  get TEMPERATURE_MIN_COLOR() {
    // Light blue
    return "#00ffff";
  }

  get TEMPERATURE_MAX_COLOR() {
    return "#ff0000";
  }

  get PRESSURE_MIN_COLOR() {
    return "#00ff00";
  }

  get PRESSURE_MAX_COLOR() {
    return "#ff0000";
  }

  get ACTIVITY_MIN_COLOR() {
    return "#00ff00";
  }

  get ACTIVITY_MAX_COLOR() {
    return "#ff0000";
  }
}
