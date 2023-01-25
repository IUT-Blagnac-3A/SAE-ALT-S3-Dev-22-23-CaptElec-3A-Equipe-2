export default class DefaultDico {
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
  static CRITICAL_CO2(){
    return 1000;
  }
  static CRITICAL_HUMIDITY(){
    return 70;
  }
  static CRITICAL_TEMPERATURE(){
    return 40;
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
