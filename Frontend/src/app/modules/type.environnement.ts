import DefaultDico from "./default.dico";

interface EnvironmentType {
  unit: string;
  min: number;
  max: number;
  minColor: string;
  maxColor: string;
}

const DefineEnvironnementType = function (type: string) {
  const D = new DefaultDico();
  switch (type) {
    case "temperature":
      return {
        unit: D.TEMPERATURE_UNIT,
        min: D.TEMPERATURE_MIN,
        max: D.TEMPERATURE_MAX,
        minColor: D.TEMPERATURE_MIN_COLOR,
        maxColor: D.TEMPERATURE_MAX_COLOR,
      } as EnvironmentType;
    case "humidity":
      return {
        unit: D.HUMIDITY_UNIT,
        min: D.HUMIDITY_MIN,
        max: D.HUMIDITY_MAX,
        minColor: D.HUMIDITY_MIN_COLOR,
        maxColor: D.HUMIDITY_MAX_COLOR,
      } as EnvironmentType;
    case "pressure":
      return {
        unit: D.PRESSURE_UNIT,
        min: D.PRESSURE_MIN,
        max: D.PRESSURE_MAX,
        minColor: D.PRESSURE_MIN_COLOR,
        maxColor: D.PRESSURE_MAX_COLOR,
      } as EnvironmentType;
    case "co2":
      return {
        unit: D.CO2_UNIT,
        min: D.CO2_MIN,
        max: D.CO2_MAX,
        minColor: D.CO2_MIN_COLOR,
        maxColor: D.CO2_MAX_COLOR,
      } as EnvironmentType;
    case "activity":
      return {
        unit: D.ACTIVITY_UNIT,
        min: D.ACTIVITY_MIN,
        max: D.ACTIVITY_MAX,
        minColor: D.ACTIVITY_MIN_COLOR,
        maxColor: D.ACTIVITY_MAX_COLOR,
      } as EnvironmentType;
    default:
      return {
        unit: "An error occured",
        min: 0,
        max: 0,
        minColor: "#000000",
        maxColor: "#000000",
      } as EnvironmentType;
  }
};

export default DefineEnvironnementType;
