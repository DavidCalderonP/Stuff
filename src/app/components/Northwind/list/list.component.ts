import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ListService} from "../list.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {environment} from "../../../../environments/environment";

export interface Employee {
  EmployeeID?: number;
  LastName: string;
  FirstName: string;
  Title?: string;
  TitleOfCourtesy?: string;
  BirthDate?: string;
  HireDate?: string;
  Address?: string;
  City?: string;
  Region?: string;
  PostalCode?: string;
  Country?: string;
  HomePhone?: string;
  Extension?: string;
  Photo?: string;
  Notes?: string;
  ReportsTo?: number;
  PhotoPath?: string;
  Salary?: number;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  selectedStates: any[] = [];

  codes = [
    {
      "country": "Afghanistan",
      "prefijo": "AF",
      "codigo": "004"
    },
    {
      "country": "Albania",
      "prefijo": "AL",
      "codigo": "008"
    },
    {
      "country": "Algeria",
      "prefijo": "DZ",
      "codigo": "012"
    },
    {
      "country": "American Samoa",
      "prefijo": "AS",
      "codigo": "016"
    },
    {
      "country": "Andorra",
      "prefijo": "AD",
      "codigo": "020"
    },
    {
      "country": "Angola",
      "prefijo": "AO",
      "codigo": "024"
    },
    {
      "country": "Anguilla",
      "prefijo": "AI",
      "codigo": "660"
    },
    {
      "country": "Antarctica",
      "prefijo": "AQ",
      "codigo": "010"
    },
    {
      "country": "Antigua and Barbuda",
      "prefijo": "AG",
      "codigo": "028"
    },
    {
      "country": "Argentina",
      "prefijo": "AR",
      "codigo": "032"
    },
    {
      "country": "Armenia",
      "prefijo": "AM",
      "codigo": "051"
    },
    {
      "country": "Aruba",
      "prefijo": "AW",
      "codigo": "533"
    },
    {
      "country": "Australia",
      "prefijo": "AU",
      "codigo": "036"
    },
    {
      "country": "Austria",
      "prefijo": "AT",
      "codigo": "040"
    },
    {
      "country": "Azerbaijan",
      "prefijo": "AZ",
      "codigo": "031"
    },
    {
      "country": "Bahamas (the)",
      "prefijo": "BS",
      "codigo": "044"
    },
    {
      "country": "Bahrain",
      "prefijo": "BH",
      "codigo": "048"
    },
    {
      "country": "Bangladesh",
      "prefijo": "BD",
      "codigo": "050"
    },
    {
      "country": "Barbados",
      "prefijo": "BB",
      "codigo": "052"
    },
    {
      "country": "Belarus",
      "prefijo": "BY",
      "codigo": "112"
    },
    {
      "country": "Belgium",
      "prefijo": "BE",
      "codigo": "056"
    },
    {
      "country": "Belize",
      "prefijo": "BZ",
      "codigo": "084"
    },
    {
      "country": "Benin",
      "prefijo": "BJ",
      "codigo": "204"
    },
    {
      "country": "Bermuda",
      "prefijo": "BM",
      "codigo": "060"
    },
    {
      "country": "Bhutan",
      "prefijo": "BT",
      "codigo": "064"
    },
    {
      "country": "Bolivia (Plurinational State of)",
      "prefijo": "BO",
      "codigo": "068"
    },
    {
      "country": "Bonaire, Sint Eustatius and Saba",
      "prefijo": "BQ",
      "codigo": "535"
    },
    {
      "country": "Bosnia and Herzegovina",
      "prefijo": "BA",
      "codigo": "070"
    },
    {
      "country": "Botswana",
      "prefijo": "BW",
      "codigo": "072"
    },
    {
      "country": "Bouvet Island",
      "prefijo": "BV",
      "codigo": "074"
    },
    {
      "country": "Brazil",
      "prefijo": "BR",
      "codigo": "076"
    },
    {
      "country": "British Indian Ocean Territory (the)",
      "prefijo": "IO",
      "codigo": "086"
    },
    {
      "country": "Brunei Darussalam",
      "prefijo": "BN",
      "codigo": "096"
    },
    {
      "country": "Bulgaria",
      "prefijo": "BG",
      "codigo": "100"
    },
    {
      "country": "Burkina Faso",
      "prefijo": "BF",
      "codigo": "854"
    },
    {
      "country": "Burundi",
      "prefijo": "BI",
      "codigo": "108"
    },
    {
      "country": "Cabo Verde",
      "prefijo": "CV",
      "codigo": "132"
    },
    {
      "country": "Cambodia",
      "prefijo": "KH",
      "codigo": "116"
    },
    {
      "country": "Cameroon",
      "prefijo": "CM",
      "codigo": "120"
    },
    {
      "country": "Canada",
      "prefijo": "CA",
      "codigo": "124"
    },
    {
      "country": "Cayman Islands (the)",
      "prefijo": "KY",
      "codigo": "136"
    },
    {
      "country": "Central African Republic (the)",
      "prefijo": "CF",
      "codigo": "140"
    },
    {
      "country": "Chad",
      "prefijo": "TD",
      "codigo": "148"
    },
    {
      "country": "Chile",
      "prefijo": "CL",
      "codigo": "152"
    },
    {
      "country": "China",
      "prefijo": "CN",
      "codigo": "156"
    },
    {
      "country": "Christmas Island",
      "prefijo": "CX",
      "codigo": "162"
    },
    {
      "country": "Cocos (Keeling) Islands (the)",
      "prefijo": "CC",
      "codigo": "166"
    },
    {
      "country": "Colombia",
      "prefijo": "CO",
      "codigo": "170"
    },
    {
      "country": "Comoros (the)",
      "prefijo": "KM",
      "codigo": "174"
    },
    {
      "country": "Congo (the Democratic Republic of the)",
      "prefijo": "CD",
      "codigo": "180"
    },
    {
      "country": "Congo (the)",
      "prefijo": "CG",
      "codigo": "178"
    },
    {
      "country": "Cook Islands (the)",
      "prefijo": "CK",
      "codigo": "184"
    },
    {
      "country": "Costa Rica",
      "prefijo": "CR",
      "codigo": "188"
    },
    {
      "country": "Croatia",
      "prefijo": "HR",
      "codigo": "191"
    },
    {
      "country": "Cuba",
      "prefijo": "CU",
      "codigo": "192"
    },
    {
      "country": "Curaçao",
      "prefijo": "CW",
      "codigo": "531"
    },
    {
      "country": "Cyprus",
      "prefijo": "CY",
      "codigo": "196"
    },
    {
      "country": "Czechia",
      "prefijo": "CZ",
      "codigo": "203"
    },
    {
      "country": "Côte d'Ivoire",
      "prefijo": "CI",
      "codigo": "384"
    },
    {
      "country": "Denmark",
      "prefijo": "DK",
      "codigo": "208"
    },
    {
      "country": "Djibouti",
      "prefijo": "DJ",
      "codigo": "262"
    },
    {
      "country": "Dominica",
      "prefijo": "DM",
      "codigo": "212"
    },
    {
      "country": "Dominican Republic (the)",
      "prefijo": "DO",
      "codigo": "214"
    },
    {
      "country": "Ecuador",
      "prefijo": "EC",
      "codigo": "218"
    },
    {
      "country": "Egypt",
      "prefijo": "EG",
      "codigo": "818"
    },
    {
      "country": "El Salvador",
      "prefijo": "SV",
      "codigo": "222"
    },
    {
      "country": "Equatorial Guinea",
      "prefijo": "GQ",
      "codigo": "226"
    },
    {
      "country": "Eritrea",
      "prefijo": "ER",
      "codigo": "232"
    },
    {
      "country": "Estonia",
      "prefijo": "EE",
      "codigo": "233"
    },
    {
      "country": "Eswatini",
      "prefijo": "SZ",
      "codigo": "748"
    },
    {
      "country": "Ethiopia",
      "prefijo": "ET",
      "codigo": "231"
    },
    {
      "country": "Falkland Islands (the) [Malvinas]",
      "prefijo": "FK",
      "codigo": "238"
    },
    {
      "country": "Faroe Islands (the)",
      "prefijo": "FO",
      "codigo": "234"
    },
    {
      "country": "Fiji",
      "prefijo": "FJ",
      "codigo": "242"
    },
    {
      "country": "Finland",
      "prefijo": "FI",
      "codigo": "246"
    },
    {
      "country": "France",
      "prefijo": "FR",
      "codigo": "250"
    },
    {
      "country": "French Guiana",
      "prefijo": "GF",
      "codigo": "254"
    },
    {
      "country": "French Polynesia",
      "prefijo": "PF",
      "codigo": "258"
    },
    {
      "country": "French Southern Territories (the)",
      "prefijo": "TF",
      "codigo": "260"
    },
    {
      "country": "Gabon",
      "prefijo": "GA",
      "codigo": "266"
    },
    {
      "country": "Gambia (the)",
      "prefijo": "GM",
      "codigo": "270"
    },
    {
      "country": "Georgia",
      "prefijo": "GE",
      "codigo": "268"
    },
    {
      "country": "Germany",
      "prefijo": "DE",
      "codigo": "276"
    },
    {
      "country": "Ghana",
      "prefijo": "GH",
      "codigo": "288"
    },
    {
      "country": "Gibraltar",
      "prefijo": "GI",
      "codigo": "292"
    },
    {
      "country": "Greece",
      "prefijo": "GR",
      "codigo": "300"
    },
    {
      "country": "Greenland",
      "prefijo": "GL",
      "codigo": "304"
    },
    {
      "country": "Grenada",
      "prefijo": "GD",
      "codigo": "308"
    },
    {
      "country": "Guadeloupe",
      "prefijo": "GP",
      "codigo": "312"
    },
    {
      "country": "Guam",
      "prefijo": "GU",
      "codigo": "316"
    },
    {
      "country": "Guatemala",
      "prefijo": "GT",
      "codigo": "320"
    },
    {
      "country": "Guernsey",
      "prefijo": "GG",
      "codigo": "831"
    },
    {
      "country": "Guinea",
      "prefijo": "GN",
      "codigo": "324"
    },
    {
      "country": "Guinea-Bissau",
      "prefijo": "GW",
      "codigo": "624"
    },
    {
      "country": "Guyana",
      "prefijo": "GY",
      "codigo": "328"
    },
    {
      "country": "Haiti",
      "prefijo": "HT",
      "codigo": "332"
    },
    {
      "country": "Heard Island and McDonald Islands",
      "prefijo": "HM",
      "codigo": "334"
    },
    {
      "country": "Holy See (the)",
      "prefijo": "VA",
      "codigo": "336"
    },
    {
      "country": "Honduras",
      "prefijo": "HN",
      "codigo": "340"
    },
    {
      "country": "Hong Kong",
      "prefijo": "HK",
      "codigo": "344"
    },
    {
      "country": "Hungary",
      "prefijo": "HU",
      "codigo": "348"
    },
    {
      "country": "Iceland",
      "prefijo": "IS",
      "codigo": "352"
    },
    {
      "country": "India",
      "prefijo": "IN",
      "codigo": "356"
    },
    {
      "country": "Indonesia",
      "prefijo": "ID",
      "codigo": "360"
    },
    {
      "country": "Iran (Islamic Republic of)",
      "prefijo": "IR",
      "codigo": "364"
    },
    {
      "country": "Iraq",
      "prefijo": "IQ",
      "codigo": "368"
    },
    {
      "country": "Ireland",
      "prefijo": "IE",
      "codigo": "372"
    },
    {
      "country": "Isle of Man",
      "prefijo": "IM",
      "codigo": "833"
    },
    {
      "country": "Israel",
      "prefijo": "IL",
      "codigo": "376"
    },
    {
      "country": "Italy",
      "prefijo": "IT",
      "codigo": "380"
    },
    {
      "country": "Jamaica",
      "prefijo": "JM",
      "codigo": "388"
    },
    {
      "country": "Japan",
      "prefijo": "JP",
      "codigo": "392"
    },
    {
      "country": "Jersey",
      "prefijo": "JE",
      "codigo": "832"
    },
    {
      "country": "Jordan",
      "prefijo": "JO",
      "codigo": "400"
    },
    {
      "country": "Kazakhstan",
      "prefijo": "KZ",
      "codigo": "398"
    },
    {
      "country": "Kenya",
      "prefijo": "KE",
      "codigo": "404"
    },
    {
      "country": "Kiribati",
      "prefijo": "KI",
      "codigo": "296"
    },
    {
      "country": "Korea (the Democratic People's Republic of)",
      "prefijo": "KP",
      "codigo": "408"
    },
    {
      "country": "Korea (the Republic of)",
      "prefijo": "KR",
      "codigo": "410"
    },
    {
      "country": "Kuwait",
      "prefijo": "KW",
      "codigo": "414"
    },
    {
      "country": "Kyrgyzstan",
      "prefijo": "KG",
      "codigo": "417"
    },
    {
      "country": "Lao People's Democratic Republic (the)",
      "prefijo": "LA",
      "codigo": "418"
    },
    {
      "country": "Latvia",
      "prefijo": "LV",
      "codigo": "428"
    },
    {
      "country": "Lebanon",
      "prefijo": "LB",
      "codigo": "422"
    },
    {
      "country": "Lesotho",
      "prefijo": "LS",
      "codigo": "426"
    },
    {
      "country": "Liberia",
      "prefijo": "LR",
      "codigo": "430"
    },
    {
      "country": "Libya",
      "prefijo": "LY",
      "codigo": "434"
    },
    {
      "country": "Liechtenstein",
      "prefijo": "LI",
      "codigo": "438"
    },
    {
      "country": "Lithuania",
      "prefijo": "LT",
      "codigo": "440"
    },
    {
      "country": "Luxembourg",
      "prefijo": "LU",
      "codigo": "442"
    },
    {
      "country": "Macao",
      "prefijo": "MO",
      "codigo": "446"
    },
    {
      "country": "Madagascar",
      "prefijo": "MG",
      "codigo": "450"
    },
    {
      "country": "Malawi",
      "prefijo": "MW",
      "codigo": "454"
    },
    {
      "country": "Malaysia",
      "prefijo": "MY",
      "codigo": "458"
    },
    {
      "country": "Maldives",
      "prefijo": "MV",
      "codigo": "462"
    },
    {
      "country": "Mali",
      "prefijo": "ML",
      "codigo": "466"
    },
    {
      "country": "Malta",
      "prefijo": "MT",
      "codigo": "470"
    },
    {
      "country": "Marshall Islands (the)",
      "prefijo": "MH",
      "codigo": "584"
    },
    {
      "country": "Martinique",
      "prefijo": "MQ",
      "codigo": "474"
    },
    {
      "country": "Mauritania",
      "prefijo": "MR",
      "codigo": "478"
    },
    {
      "country": "Mauritius",
      "prefijo": "MU",
      "codigo": "480"
    },
    {
      "country": "Mayotte",
      "prefijo": "YT",
      "codigo": "175"
    },
    {
      "country": "Mexico",
      "prefijo": "MX",
      "codigo": "484"
    },
    {
      "country": "Micronesia (Federated States of)",
      "prefijo": "FM",
      "codigo": "583"
    },
    {
      "country": "Moldova (the Republic of)",
      "prefijo": "MD",
      "codigo": "498"
    },
    {
      "country": "Monaco",
      "prefijo": "MC",
      "codigo": "492"
    },
    {
      "country": "Mongolia",
      "prefijo": "MN",
      "codigo": "496"
    },
    {
      "country": "Montenegro",
      "prefijo": "ME",
      "codigo": "499"
    },
    {
      "country": "Montserrat",
      "prefijo": "MS",
      "codigo": "500"
    },
    {
      "country": "Morocco",
      "prefijo": "MA",
      "codigo": "504"
    },
    {
      "country": "Mozambique",
      "prefijo": "MZ",
      "codigo": "508"
    },
    {
      "country": "Myanmar",
      "prefijo": "MM",
      "codigo": "104"
    },
    {
      "country": "Namibia",
      "prefijo": "NA",
      "codigo": "516"
    },
    {
      "country": "Nauru",
      "prefijo": "NR",
      "codigo": "520"
    },
    {
      "country": "Nepal",
      "prefijo": "NP",
      "codigo": "524"
    },
    {
      "country": "Netherlands (the)",
      "prefijo": "NL",
      "codigo": "528"
    },
    {
      "country": "New Caledonia",
      "prefijo": "NC",
      "codigo": "540"
    },
    {
      "country": "New Zealand",
      "prefijo": "NZ",
      "codigo": "554"
    },
    {
      "country": "Nicaragua",
      "prefijo": "NI",
      "codigo": "558"
    },
    {
      "country": "Niger (the)",
      "prefijo": "NE",
      "codigo": "562"
    },
    {
      "country": "Nigeria",
      "prefijo": "NG",
      "codigo": "566"
    },
    {
      "country": "Niue",
      "prefijo": "NU",
      "codigo": "570"
    },
    {
      "country": "Norfolk Island",
      "prefijo": "NF",
      "codigo": "574"
    },
    {
      "country": "Northern Mariana Islands (the)",
      "prefijo": "MP",
      "codigo": "580"
    },
    {
      "country": "Norway",
      "prefijo": "NO",
      "codigo": "578"
    },
    {
      "country": "Oman",
      "prefijo": "OM",
      "codigo": "512"
    },
    {
      "country": "Pakistan",
      "prefijo": "PK",
      "codigo": "586"
    },
    {
      "country": "Palau",
      "prefijo": "PW",
      "codigo": "585"
    },
    {
      "country": "Palestine, State of",
      "prefijo": "PS",
      "codigo": "275"
    },
    {
      "country": "Panama",
      "prefijo": "PA",
      "codigo": "591"
    },
    {
      "country": "Papua New Guinea",
      "prefijo": "PG",
      "codigo": "598"
    },
    {
      "country": "Paraguay",
      "prefijo": "PY",
      "codigo": "600"
    },
    {
      "country": "Peru",
      "prefijo": "PE",
      "codigo": "604"
    },
    {
      "country": "Philippines (the)",
      "prefijo": "PH",
      "codigo": "608"
    },
    {
      "country": "Pitcairn",
      "prefijo": "PN",
      "codigo": "612"
    },
    {
      "country": "Poland",
      "prefijo": "PL",
      "codigo": "616"
    },
    {
      "country": "Portugal",
      "prefijo": "PT",
      "codigo": "620"
    },
    {
      "country": "Puerto Rico",
      "prefijo": "PR",
      "codigo": "630"
    },
    {
      "country": "Qatar",
      "prefijo": "QA",
      "codigo": "634"
    },
    {
      "country": "Republic of North Macedonia",
      "prefijo": "MK",
      "codigo": "807"
    },
    {
      "country": "Romania",
      "prefijo": "RO",
      "codigo": "642"
    },
    {
      "country": "Russian Federation (the)",
      "prefijo": "RU",
      "codigo": "643"
    },
    {
      "country": "Rwanda",
      "prefijo": "RW",
      "codigo": "646"
    },
    {
      "country": "Réunion",
      "prefijo": "RE",
      "codigo": "638"
    },
    {
      "country": "Saint Barthélemy",
      "prefijo": "BL",
      "codigo": "652"
    },
    {
      "country": "Saint Helena, Ascension and Tristan da Cunha",
      "prefijo": "SH",
      "codigo": "654"
    },
    {
      "country": "Saint Kitts and Nevis",
      "prefijo": "KN",
      "codigo": "659"
    },
    {
      "country": "Saint Lucia",
      "prefijo": "LC",
      "codigo": "662"
    },
    {
      "country": "Saint Martin (French part)",
      "prefijo": "MF",
      "codigo": "663"
    },
    {
      "country": "Saint Pierre and Miquelon",
      "prefijo": "PM",
      "codigo": "666"
    },
    {
      "country": "Saint Vincent and the Grenadines",
      "prefijo": "VC",
      "codigo": "670"
    },
    {
      "country": "Samoa",
      "prefijo": "WS",
      "codigo": "882"
    },
    {
      "country": "San Marino",
      "prefijo": "SM",
      "codigo": "674"
    },
    {
      "country": "Sao Tome and Principe",
      "prefijo": "ST",
      "codigo": "678"
    },
    {
      "country": "Saudi Arabia",
      "prefijo": "SA",
      "codigo": "682"
    },
    {
      "country": "Senegal",
      "prefijo": "SN",
      "codigo": "686"
    },
    {
      "country": "Serbia",
      "prefijo": "RS",
      "codigo": "688"
    },
    {
      "country": "Seychelles",
      "prefijo": "SC",
      "codigo": "690"
    },
    {
      "country": "Sierra Leone",
      "prefijo": "SL",
      "codigo": "694"
    },
    {
      "country": "Singapore",
      "prefijo": "SG",
      "codigo": "702"
    },
    {
      "country": "Sint Maarten (Dutch part)",
      "prefijo": "SX",
      "codigo": "534"
    },
    {
      "country": "Slovakia",
      "prefijo": "SK",
      "codigo": "703"
    },
    {
      "country": "Slovenia",
      "prefijo": "SI",
      "codigo": "705"
    },
    {
      "country": "Solomon Islands",
      "prefijo": "SB",
      "codigo": "090"
    },
    {
      "country": "Somalia",
      "prefijo": "SO",
      "codigo": "706"
    },
    {
      "country": "South Africa",
      "prefijo": "ZA",
      "codigo": "710"
    },
    {
      "country": "South Georgia and the South Sandwich Islands",
      "prefijo": "GS",
      "codigo": "239"
    },
    {
      "country": "South Sudan",
      "prefijo": "SS",
      "codigo": "728"
    },
    {
      "country": "Spain",
      "prefijo": "ES",
      "codigo": "724"
    },
    {
      "country": "Sri Lanka",
      "prefijo": "LK",
      "codigo": "144"
    },
    {
      "country": "Sudan (the)",
      "prefijo": "SD",
      "codigo": "729"
    },
    {
      "country": "Suriname",
      "prefijo": "SR",
      "codigo": "740"
    },
    {
      "country": "Svalbard and Jan Mayen",
      "prefijo": "SJ",
      "codigo": "744"
    },
    {
      "country": "Sweden",
      "prefijo": "SE",
      "codigo": "752"
    },
    {
      "country": "Switzerland",
      "prefijo": "CH",
      "codigo": "756"
    },
    {
      "country": "Syrian Arab Republic",
      "prefijo": "SY",
      "codigo": "760"
    },
    {
      "country": "Taiwan (Province of China)",
      "prefijo": "TW",
      "codigo": "158"
    },
    {
      "country": "Tajikistan",
      "prefijo": "TJ",
      "codigo": "762"
    },
    {
      "country": "Tanzania, United Republic of",
      "prefijo": "TZ",
      "codigo": "834"
    },
    {
      "country": "Thailand",
      "prefijo": "TH",
      "codigo": "764"
    },
    {
      "country": "Timor-Leste",
      "prefijo": "TL",
      "codigo": "626"
    },
    {
      "country": "Togo",
      "prefijo": "TG",
      "codigo": "768"
    },
    {
      "country": "Tokelau",
      "prefijo": "TK",
      "codigo": "772"
    },
    {
      "country": "Tonga",
      "prefijo": "TO",
      "codigo": "776"
    },
    {
      "country": "Trinidad and Tobago",
      "prefijo": "TT",
      "codigo": "780"
    },
    {
      "country": "Tunisia",
      "prefijo": "TN",
      "codigo": "788"
    },
    {
      "country": "Turkey",
      "prefijo": "TR",
      "codigo": "792"
    },
    {
      "country": "Turkmenistan",
      "prefijo": "TM",
      "codigo": "795"
    },
    {
      "country": "Turks and Caicos Islands (the)",
      "prefijo": "TC",
      "codigo": "796"
    },
    {
      "country": "Tuvalu",
      "prefijo": "TV",
      "codigo": "798"
    },
    {
      "country": "Uganda",
      "prefijo": "UG",
      "codigo": "800"
    },
    {
      "country": "Ukraine",
      "prefijo": "UA",
      "codigo": "804"
    },
    {
      "country": "United Arab Emirates (the)",
      "prefijo": "AE",
      "codigo": "784"
    },
    {
      "country": "United Kingdom of Great Britain and Northern Ireland (the)",
      "prefijo": "GB",
      "codigo": "826"
    },
    {
      "country": "United States Minor Outlying Islands (the)",
      "prefijo": "UM",
      "codigo": "581"
    },
    {
      "country": "United States of America (the)",
      "prefijo": "US",
      "codigo": "840"
    },
    {
      "country": "Uruguay",
      "prefijo": "UY",
      "codigo": "858"
    },
    {
      "country": "Uzbekistan",
      "prefijo": "UZ",
      "codigo": "860"
    },
    {
      "country": "Vanuatu",
      "prefijo": "VU",
      "codigo": "548"
    },
    {
      "country": "Venezuela (Bolivarian Republic of)",
      "prefijo": "VE",
      "codigo": "862"
    },
    {
      "country": "Viet Nam",
      "prefijo": "VN",
      "codigo": "704"
    },
    {
      "country": "Virgin Islands (British)",
      "prefijo": "VG",
      "codigo": "092"
    },
    {
      "country": "Virgin Islands (U.S.)",
      "prefijo": "VI",
      "codigo": "850"
    },
    {
      "country": "Wallis and Futuna",
      "prefijo": "WF",
      "codigo": "876"
    },
    {
      "country": "Western Sahara",
      "prefijo": "EH",
      "codigo": "732"
    },
    {
      "country": "Yemen",
      "prefijo": "YE",
      "codigo": "887"
    },
    {
      "country": "Zambia",
      "prefijo": "ZM",
      "codigo": "894"
    },
    {
      "country": "Zimbabwe",
      "prefijo": "ZW",
      "codigo": "716"
    },
    {
      "country": "Åland Islands",
      "prefijo": "AX",
      "codigo": "248"
    }
  ];
  isLoading: boolean = false;
  displayedColumns: string[] = ['EmployeeID', 'LastName', 'FirstName', 'Title', 'TitleOfCourtesy', 'BirthDate', 'HireDate', 'Address', 'City', 'Region', 'PostalCode', 'Country', 'HomePhone', 'Extension', 'Notes', 'ReportsTo', 'Salary'];

  dataSource: MatTableDataSource<Employee>;
  perPage = '8';
  page = '1';
  total = 0;

  images = [];
  storage = environment.STORAGE;

  constructor(private empService: ListService, private cdr: ChangeDetectorRef) {
    this.dataSource = new MatTableDataSource<Employee>([]);
    this.selectedStates = this.codes;
  }


  onKey(value: any) {
    this.selectedStates = this.search(value.target.value);
  }

  // Filter the states list and send back to populate the selectedStates**
  search(value: string) {
    let filter = value.toLowerCase();
    return this.codes.filter((option: any) => option.country.toLowerCase().includes(filter) || option.prefijo.toLowerCase().includes(filter) || option.codigo.toLowerCase().includes(filter));
  }

  ngOnInit(): void {
    // this.getEmployees()
    // this.getImages();
    let a: any = {
      hola: "d23"
    }
    console.log(a)
    a = null;
    console.log(a)
    console.log(a.hola.length)
    this.empService.createFile().then(res => {
      console.log("res: ", res)
      //this.uploadImage(res);
    });
  }

  getEmployees() {
    this.isLoading = true;
    this.empService.getAllEmployees(this.perPage, this.page).subscribe((res: any) => {
      console.log(res.data)
      this.total = res.total;
      this.dataSource.data = res.data;
      this.isLoading = false;
      this.cdr.detectChanges();
    });

  }

  pageSelection(page: PageEvent) {
    console.log(page.pageIndex)
    this.page = String(page.pageIndex + 1);
    console.log("pagesize: ", this.paginator.pageSize)
    this.perPage = String(this.paginator.pageSize);
    this.getEmployees();
  }

  async uploadImage(file: any) {
    let bases = []
    for (let i = 0; i < 4; i++) {
      let bse64 = await this.base64(file[i]) as string;
      bases.push(bse64)
    }
    console.log(bases)
    this.empService.fileUpload(bases).subscribe(res => {
      console.log("post: ", res)
    })
  }

  base64(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = err => reject(err)
    })
  }

  async download() {
    const a = document.createElement("a");
    a.href = await this.empService.toDataURL(`${environment.STORAGE}image0.png`);
    a.download = "";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  private getImages() {
    this.empService.getImages().subscribe((res: any) => {
      this.images = res.map((x: any) => `${this.storage}${x.name}`);
      console.log(this.images)
    });
  }
}


