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
  get CRITICAL_CO2(){
    return 1000;
  }
  get CRITICAL_HUMIDITY(){
    return 70;
  }
  get CRITICAL_TEMPERATURE(){
    return 40;
  }
  get MAX_CO2(){
    return 5000;
  }
  get MAX_HUMIDITY(){
    return 100;
  }
  get MAX_TEMPERATURE(){
    return 50;
  }
};
