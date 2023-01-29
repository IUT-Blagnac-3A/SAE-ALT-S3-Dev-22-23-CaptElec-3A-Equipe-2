export default class DefaultDico {
  /** ========= */
  /** @BATTERY */
  /** ======= */
  get BATTERY_UNIT() {
    return "%";
  }

  get MAX_BATTERY() {
    return 100;
  }

  get CRITICAL_BATTERY() {
    return 15;
  }

  /** ===== */
  /** @CO2 */
  /** === */
  get CO2_UNIT() {
    return "ppm";
  }

  get CO2_MIN() {
    return 0;
  }

  get CO2_MAX() {
    return 10000;
  }

  get CRITICAL_CO2() {
    return 1000;
  }

  get CO2_MIN_COLOR() {
    return "#00ff00";
  }

  get CO2_MAX_COLOR() {
    return "#ff0000";
  }

  get CO2_RANGE_COLOR() {
    return ["#00ff00", "#ffff00", "#ff0000"];
  }

  /** ========== */
  /** @HUMIDITY */
  /** ======== */
  get HUMIDITY_UNIT() {
    return "%";
  }

  get HUMIDITY_MIN() {
    return 0;
  }

  get HUMIDITY_MAX() {
    return 100;
  }

  get CRITICAL_HUMIDITY() {
    return 70;
  }

  get HUMIDITY_MIN_COLOR() {
    return "#00ff00";
  }

  get HUMIDITY_MAX_COLOR() {
    return "#ff0000";
  }

  get HUMIDITY_RANGE_COLOR() {
    return ["#0000ff", "#00ffff", "#00ff00", "#ffff00", "#ff0000"];
  }

  /** ============= */
  /** @TEMPERATURE */
  /** =========== */
  get TEMPERATURE_UNIT() {
    return "°C";
  }

  get TEMPERATURE_MIN() {
    return -5;
  }

  get TEMPERATURE_MAX() {
    return 50;
  }

  get CRITICAL_TEMPERATURE() {
    return 40;
  }

  get TEMPERATURE_MIN_COLOR() {
    return "#00ffff";
  }

  get TEMPERATURE_MAX_COLOR() {
    return "#ff0000";
  }

  get TEMPERATURE_RANGE_COLOR() {
    return ["#0000ff", "#00ffff", "#00ff00", "#ffff00", "#ff5000", "#ff0000"];
  }

  /** ========== */
  /** @PRESSURE */
  /** ======== */
  get PRESSURE_UNIT() {
    return "hPa";
  }

  get PRESSURE_MIN() {
    return 900;
  }

  get PRESSURE_MAX() {
    return 1100;
  }

  get PRESSURE_MIN_COLOR() {
    return "#00ff00";
  }

  get PRESSURE_MAX_COLOR() {
    return "#ff0000";
  }

  get PRESSURE_RANGE_COLOR() {
    return ["#00ff00", "#ffff00", "#ff0000"];
  }

  /** ========== */
  /** @ACTIVITY */
  /** ======== */

  get ACTIVITY_UNIT() {
    return "µg/m³";
  }

  get ACTIVITY_MIN() {
    return 0;
  }

  get ACTIVITY_MAX() {
    return 100;
  }

  get ACTIVITY_MIN_COLOR() {
    return "#00ff00";
  }

  get ACTIVITY_MAX_COLOR() {
    return "#ff0000";
  }

  get ACTIVITY_RANGE_COLOR() {
    return ["#00ff00", "#ffff00", "#ff0000"];
  }

  /** ========== */
  /** @DOUBLON */
  /** @deprecated */
  get MAX_CO2() {
    return 5000;
  }
  /** @deprecated */
  get MAX_HUMIDITY() {
    return 100;
  }
  /** @deprecated */
  get MAX_TEMPERATURE() {
    return 50;
  }
}
