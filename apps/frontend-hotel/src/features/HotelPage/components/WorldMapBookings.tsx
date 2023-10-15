import React, { useEffect, useState } from "react";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
  ZoomableGroup
} from "react-simple-maps";
import ReactTooltip from 'react-tooltip';

const geoUrl = "/features.json";

const MapChart = () => {
  const [data, setData] = useState([]);
  const [maxPeople, setMaxPeople] = useState(0);
  const [topCountries, setTopCountries] = useState([]);
  const [bottomCountries, setBottomCountries] = useState([]);

  const [tooltipContent, setTooltipContent] = useState("Country");

  const getTooltipContent = (countryCode: string | number, count: never) => {
    const countryName = countryNames[countryCode] || countryCode;
    return `${countryName}: ${count || "No"} bookings`;
  };

  useEffect(() => {
    csv(`/vulnerability.csv`).then((peopleData) => {
      const countryCount = {};
      peopleData.forEach(person => {
        countryCount[person.ISO3] = (countryCount[person.ISO3] || 0) + 1;
      });

      // Sorting and extracting top/bottom 5 countries
      const sortedCountries = Object.entries(countryCount).sort(([,a],[,b]) => b-a);
      setTopCountries(sortedCountries.slice(0, 5));
      setBottomCountries(sortedCountries.slice(-5).reverse());

      const maxCount = Math.max(...Object.values(countryCount));
      setMaxPeople(maxCount);
      setData(countryCount);
    });
  }, []);

  const colorScale = scaleLinear()
    .domain([0, maxPeople])
    .range(["#eeeeee", "#010048"]);

  const countryNames = {
    "USA": "United States",
    "CAN": "Canada",
    "BRA": "Brazil",
    "AUS": "Australia",
    "IND": "India",
    "GBR": "United Kingdom",
    "FRA": "France",
    "GER": "Germany",
    "ITA": "Italy",
    "MEX": "Mexico",
    "ARG": "Argentina",
    "RSA": "South Africa",
    "CHN": "China",
    "RUS": "Russia",
    "KOR": "South Korea",
    "ESP": "Spain",
    "NLD": "Netherlands",
    "SWE": "Sweden",
    "NOR": "Norway",
    "FIN": "Finland",
    "POL": "Poland",
    "CHE": "Switzerland",
    "UKR": "Ukraine",
    "THA": "Thailand",
    "IDN": "Indonesia",
    "SAU": "Saudi Arabia",
    "NGA": "Nigeria",
    "EGY": "Egypt",
    "COL": "Colombia",
    "PAK": "Pakistan",
    "BGD": "Bangladesh",
    "IRN": "Iran",
    "TUR": "Turkey",
    "ZAF": "South Africa",
    "KAZ": "Kazakhstan",
    "JPN": "Japan",
    "DEU": "Germany",
    "KEN": "Kenya",
    "NZL": "New Zealand",
    "IRL": "Ireland",
    "BEL": "Belgium",
    "PER": "Peru",
    "PRT": "Portugal",
    "CHL": "Chile",
    "AUT": "Austria",
    "VNM": "Vietnam",
    "ROU": "Romania",
    "ISR": "Israel",
    "QAT": "Qatar",
    "VEN": "Venezuela",
    "HUN": "Hungary",
    "JOR": "Jordan",
    "PHL": "Philippines",
    "CRI": "Costa Rica",
    "MAR": "Morocco",
    "HRV": "Croatia",
    "BGR": "Bulgaria",
    "SGP": "Singapore",
    "PAN": "Panama",
    "CZE": "Czech Republic",
    "URY": "Uruguay",
    "LBN": "Lebanon",
    "NGR": "Nigeria",
    "MYS": "Malaysia",
    "GRC": "Greece",
    "SRB": "Serbia",
    "LKA": "Sri Lanka",
    "KWT": "Kuwait",
    "ARE": "United Arab Emirates",
    "ECU": "Ecuador",
    "BHR": "Bahrain",
    "AFG": "Afghanistan",
    "BLR": "Belarus",
    "DNK": "Denmark",
    "DOM": "Dominican Republic",
    "EST": "Estonia",
    "TUN": "Tunisia",
    "GHA": "Ghana",
    "DZA": "Algeria",
    "ETH": "Ethiopia",
    "SEN": "Senegal",
    "TZA": "Tanzania",
    "ZWE": "Zimbabwe",
    "CIV": "Côte d'Ivoire",
    "CMR": "Cameroon",
    "AGO": "Angola",
    "UGA": "Uganda",
    "MOZ": "Mozambique",
    "NAM": "Namibia",
    "BFA": "Burkina Faso",
    "MLI": "Mali",
    "ZMB": "Zambia",
    "SOM": "Somalia",
    "BEN": "Benin",
    "BWA": "Botswana",
    "BDI": "Burundi",
    "CPV": "Cape Verde",
    "CAF": "Central African Republic",
    "TCD": "Chad",
    "COM": "Comoros",
    "COG": "Congo (Brazzaville)",
    "COD": "Congo (Kinshasa)",
    "DJI": "Djibouti",
    "GNQ": "Equatorial Guinea",
    "ERI": "Eritrea",
    "GAB": "Gabon",
    "GMB": "Gambia",
    "GIN": "Guinea",
    "GNB": "Guinea-Bissau",
    "LSO": "Lesotho",
    "LBR": "Liberia",
    "LBY": "Libya",
    "MDG": "Madagascar",
    "MWI": "Malawi",
    "MRT": "Mauritania",
    "MUS": "Mauritius",
    "NER": "Niger",
    "RWA": "Rwanda",
    "STP": "Sao Tome and Principe",
    "SYC": "Seychelles",
    "SLE": "Sierra Leone",
    "SSD": "South Sudan",
    "SDN": "Sudan",
    "SWZ": "Eswatini",
    "TGO": "Togo",
  }



  return (
    <>
      <div className="flex items-center justify-center -mt-6">
        <div className="text-6xl font-extrabold -mb-56">
          World map of people distribution
        </div>
      </div>
      <div className="flex justify-center items-center w-full -mb-40">
        <ComposableMap
          projectionConfig={{
            rotate: [-10, 0, 0],
            scale: 147
          }}
        >
          <ZoomableGroup>
        <Sphere stroke="#E4E5E6" strokeWidth={0.5}/>
          <Graticule stroke="#E4E5E6" strokeWidth={0.5}/>
          <Geographies geography={geoUrl}>
            {({geographies}) => geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={data[geo.id] ? colorScale(data[geo.id]) : "#F5F4F6"}
                onMouseEnter={() => {
                  setTooltipContent(getTooltipContent(geo.id, data[geo.id]));
                }}
                onMouseLeave={() => {
                  setTooltipContent("");
                }}
                data-tip={tooltipContent} // This is the content for the tooltip
              />
            ))}
          </Geographies>
            </ZoomableGroup>
        </ComposableMap>
      </div>

      <div className="flex justify-center mt-8 space-x-16">
        <div className="text-left">
          <h2 className="text-4xl font-bold mb-4 text-blue-600">Top 5 Countries</h2>
          <ul className="mb-8 space-y-2">
            {topCountries.map(([country, count]) => (
              <li key={country} className="p-2 bg-blue-100 rounded-md shadow-md flex justify-between items-center">
                <span className="font-medium">{countryNames[country] || country}</span>
                <span className="bg-blue-500 text-white py-1 px-3 rounded-full">{count}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-left">
          <h2 className="text-4xl font-bold mb-4 text-red-600">Bottom 5 Countries</h2>
          <ul className="space-y-2">
            {bottomCountries.map(([country, count]) => (
              <li key={country} className="p-2 bg-red-100 rounded-md shadow-md flex justify-between items-center">
                <span className="font-medium">{countryNames[country] || country}</span>
                <span className="bg-red-500 text-white py-1 px-3 rounded-full">{count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>


    </>
  );
};

export default MapChart;
