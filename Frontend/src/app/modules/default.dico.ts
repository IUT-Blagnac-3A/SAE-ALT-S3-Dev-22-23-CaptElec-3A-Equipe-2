export default class DefaultDico {
  get BATTERY_UNIT() {
    return "%";
  }
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

  get CRITICAL_BATTERY() {
    return 15;
  }
  get CRITICAL_CO2() {
    return 1000;
  }
  get CRITICAL_HUMIDITY() {
    return 70;
  }
  get CRITICAL_TEMPERATURE() {
    return 40;
  }
  get MAX_BATTERY() {
    return 100;
  }
  get MAX_CO2() {
    return 5000;
  }
  get MAX_HUMIDITY() {
    return 100;
  }
  get MAX_TEMPERATURE() {
    return 50;
  }
}
