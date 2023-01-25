export default class DefaultDico {
  static BATTERY_UNIT() {
    return "%";
  }
  static CO2_UNIT() {
    return "ppm";
  }
  static HUMIDITY_UNIT() {
    return "%";
  }
  static TEMPERATURE_UNIT() {
    return "°C";
  }
  static PRESSURE_UNIT() {
    return "hPa";
  }
  static ACTIVITY_UNIT() {
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
  static CRITICAL_BATTERY(){
    return 15;
  }
  static CRITICAL_CO2(){
    return 1000;
  }
  static CRITICAL_HUMIDITY(){
    return 70;
  }
  static CRITICAL_TEMPERATURE(){
    return 40;
  }
  static MAX_BATTERY(){
    return 100;
  }
  static MAX_CO2(){
    return 5000;
  }
  static MAX_HUMIDITY(){
    return 100;
  }
  static MAX_TEMPERATURE(){
    return 50;
  }
};
