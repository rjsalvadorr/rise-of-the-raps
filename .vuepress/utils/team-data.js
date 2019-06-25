const TEAM_ABBREVS = {
  "Atlanta Hawks": "ATL",
  "Brooklyn Nets": "BKN",
  "Boston Celtics": "BOS",
  "Charlotte Hornets": "CHO",
  "Charlotte Bobcats": "CHA",
  "Chicago Bulls": "CHI",
  "Cleveland Cavaliers": "CLE",
  "Dallas Mavericks": "DAL",
  "Denver Nuggets": "DEN",
  "Detroit Pistons": "DET",
  "Golden State Warriors": "GSW",
  "Houston Rockets": "HOU",
  "Indiana Pacers": "IND",
  "Los Angeles Clippers": "LAC",
  "Los Angeles Lakers": "LAL",
  "Memphis Grizzlies": "MEM",
  "Miami Heat": "MIA",
  "Milwaukee Bucks": "MIL",
  "Minnesota Timberwolves": "MIN",
  "New Jersey Nets": "NJN",
  "New Orleans Hornets": "NOH",
  "New Orleans/Oklahoma City Hornets": "NOK",
  "Oklahoma City Hornets": "OKH",
  "Oklahoma City Thunder": "OKC",
  "New Orleans Pelicans": "NOP",
  "New York Knickerbockers": "NYK",
  "New York Knicks": "NYK",
  "Orlando Magic": "ORL",
  "Philadelphia 76ers": "PHI",
  "Phoenix Suns": "PHX",
  "Portland Trailblazers": "POR",
  "Portland Trail Blazers": "POR",
  "Sacramento Kings": "SAC",
  "Sacramento Kings": "SAC",
  "San Antonio Spurs": "SAS",
  "Seattle Supersonics": "SEA",
  "Seattle SuperSonics": "SEA",
  "Toronto Raptors": "TOR",
  "Toronto Huskies": "TRH",
  "Utah Jazz": "UTA",
  "Vancouver Grizzlies": "VAN",
  "Washington Wizards": "WAS",
  "Washington Bullets": "WAS",
};

const TEAM_DATA = [
  {
    id: 0,
    names: ["Atlanta Hawks"],
    abbrevs: ["ATL"],
    colours: [
      {
        year: 1996,
        bg: 'C8102E',
        text: '000000',
        trim: 'FFCD00',
      },
      {
        year: 2008,
        bg: 'E03A3E',
        text: 'FFFFFF',
        trim: 'C1D32F',
      },
    ]
  },
  {
    id: 1,
    names: ["Brooklyn Nets", "New Jersey Nets"],
    abbrevs: ["BKN", "NJN"],
    colours: [
      {
        year: 1996,
        bg: '002A60',
        text: 'C6CFD4',
        trim: 'CD1041',
      },
      {
        year: 2013,
        bg: '000000',
        text: 'FFFFFF',
        trim: 'FFFFFF',
      },
    ]
  },
  {
    id: 2,
    names: ["Boston Celtics"],
    abbrevs: ["BOS"],
    colours: [
      {
        year: 1996,
        bg: '007A33',
        text: 'FFFFFF',
        trim: 'FFFFFF',
      },
    ]
  },
  {
    id: 3,
    names: ["Charlotte Hornets", "Charlotte Bobcats"],
    abbrevs: ["CHO", "CHA"],
    colours: [
      {
        year: 1996,
        bg: '00778B',
        text: 'FFFFFF',
        trim: '280071',
      },
      {
        year: 1999,
        bg: '00788C',
        text: 'FFFFFF',
        trim: '1D1160',
      },
    ]
  },
  {
    id: 4,
    names: ["Chicago Bulls"],
    abbrevs: ["CHI"],
    colours: [
      {
        year: 1996,
        bg: 'CE1141',
        text: '000000',
        trim: '000000',
      },
    ]
  },
  {
    id: 5,
    names: ["Cleveland Cavaliers"],
    abbrevs: ["CLE"],
    colours: [
      {
        year: 1996,
        bg: 'E35205',
        text: '5C88DA',
        trim: '27251F',
      },
      {
        year: 2004,
        bg: '6F263D',
        text: '000000',
        trim: 'FFB81C',
      },
    ]
  },
  {
    id: 6,
    names: ["Dallas Mavericks"],
    abbrevs: ["DAL"],
    colours: [
      {
        year: 1996,
        bg: '002855',
        text: 'FFFFFF',
        trim: '00843D',
      },
      {
        year: 2002,
        bg: '00538C',
        text: 'FFFFFF',
        trim: 'B8C4CA',
      },
    ]
  },
  {
    id: 7,
    names: ["Denver Nuggets"],
    abbrevs: ["DEN"],
    colours: [
      {
        year: 1996,
        bg: '041E42',
        text: 'FFFFFF',
        trim: '9D2235',
      },
      {
        year: 2004,
        bg: '00285E',
        text: 'FDB927',
        trim: '418FDE',
      },
      {
        year: 2017,
        bg: '0E2240',
        text: 'FEC524',
        trim: '8B2131',
      },
    ]
  },
  {
    id: 8,
    names: ["Detroit Pistons"],
    abbrevs: ["DET"],
    colours: [
      {
        year: 1996,
        bg: '006272',
        text: 'FFFFFF',
        trim: '9D2235',
      },
      {
        year: 2002,
        bg: 'D50032',
        text: 'FFFFFF',
        trim: '003DA5',
      },
      {
        year: 2017,
        bg: 'ED174C',
        text: 'FFFFFF',
        trim: '006BB6',
      },
    ]
  },
  {
    id: 9,
    names: ["Golden State Warriors"],
    abbrevs: ["GSW"],
    colours: [
      {
        year: 1996,
        bg: '041E42',
        text: 'FFA300',
        trim: 'BE3A34',
      },
      {
        year: 2011,
        bg: '006BB6',
        text: 'FDB927',
        trim: 'FDB927',
      },
    ]
  },
  {
    id: 10,
    names: ["Houston Rockets"],
    abbrevs: ["HOU"],
    colours: [
      {
        year: 1996,
        bg: 'BA0C2F',
        text: 'FFFFFF',
        trim: '041E42',
      },
      {
        year: 2004,
        bg: 'CE1141',
        text: 'FFFFFF',
        trim: '000000',
      },
    ]
  },
  {
    id: 11,
    names: ["Indiana Pacers"],
    abbrevs: ["IND"],
    colours: [
      {
        year: 1996,
        bg: '002D62',
        text: 'FDBB30',
        trim: 'FDBB30',
      },
    ]
  },
  {
    id: 12,
    names: ["Los Angeles Clippers"],
    abbrevs: ["LAC"],
    colours: [
      {
        year: 1996,
        bg: 'FFFFFF',
        text: 'C8102E',
        trim: '1D428A',
      },
    ]
  },
  {
    id: 13,
    names: ["Los Angeles Lakers"],
    abbrevs: ["LAL"],
    colours: [
      {
        year: 1996,
        bg: 'FDB927',
        text: '552583',
        trim: '552583',
      },
    ]
  },
  {
    id: 14,
    names: ["Vancouver Grizzlies", "Memphis Grizzlies"],
    abbrevs: ["VAN", "MEM"],
    colours: [
      {
        year: 1996,
        bg: '00B2A9',
        text: 'FFFFF',
        trim: 'E43C40',
      },
      {
        year: 2004,
        bg: '6189B9',
        text: 'FDB927',
        trim: '00285E',
      },
      {
        year: 2018,
        bg: '5D76A9',
        text: 'F5B112',
        trim: '12173F',
      },
    ]
  },
  {
    id: 15,
    names: ["Miami Heat"],
    abbrevs: ["MIA"],
    colours: [
      {
        year: 1996,
        bg: 'BA0C2F',
        text: 'FEDD00',
        trim: '000000',
      },
      {
        year: 2000,
        bg: '98002E',
        text: 'F9A01B',
        trim: '000000',
      },
    ]
  },
  {
    id: 16,
    names: ["Milwaukee Bucks"],
    abbrevs: ["MIL"],
    colours: [
      {
        year: 1996,
        bg: '702F8A',
        text: 'FFFFFF',
        trim: '2C5234',
      },
      {
        year: 2006,
        bg: '274E37',
        text: 'FFFFFF',
        trim: 'AC1A2F',
      },
      {
        year: 2015,
        bg: '00471B',
        text: 'FFFFFF',
        trim: 'EEE1C6',
      },
      {
        year: 2006,
        bg: '274E37',
        text: 'FFFFFF',
        trim: 'AC1A2F',
      },
    ]
  },
  {
    id: 17,
    names: ["Minnesota Timberwolves"],
    abbrevs: ["MIN"],
    colours: [
      {
        year: 1996,
        bg: '236192',
        text: 'FFFFFF',
        trim: '00843D',
      },
      {
        year: 2017,
        bg: '0C2340',
        text: 'FFFFFF',
        trim: '78BE20',
      },
    ]
  },
  {
    id: 19,
    names: ["Oklahoma City Thunder"],
    abbrevs: ["OKC"],
    colours: [
      {
        year: 1996,
        bg: '007AC1',
        text: 'FFFFFF',
        trim: 'EF3B24',
      },
    ]
  },
  {
    id: 20,
    names: ["New Orleans Hornets", "New Orleans/Oklahoma City Hornets", "Oklahoma City Hornets", "New Orleans Pelicans"],
    abbrevs: ["NOH", "NOK", "OKH", "NOP"],
    colours: [
      {
        year: 1996,
        bg: '00778B',
        text: 'FFFFFF',
        trim: '280071',
      },
      {
        year: 2014,
        bg: '0C2340',
        text: 'FFFFFF',
        trim: '85714D',
      },
    ]
  },
  {
    id: 21,
    names: ["New York Knickerbockers", "New York Knicks"],
    abbrevs: ["NYK"],
    colours: [
      {
        year: 1996,
        bg: '0072CE',
        text: 'FE5000',
        trim: 'FE5000',
      },
      {
        year: 1998,
        bg: '006BB6',
        text: 'F58426',
        trim: 'F58426',
      },
    ]
  },
  {
    id: 22,
    names: ["Orlando Magic"],
    abbrevs: ["ORL"],
    colours: [
      {
        year: 1996,
        bg: '0077C0',
        text: 'FFFFFF',
        trim: '000000',
      },
    ]
  },
  {
    id: 23,
    names: ["Philadelphia 76ers"],
    abbrevs: ["PHI"],
    colours: [
      {
        year: 1996,
        bg: '006BB6',
        text: 'FFFFFF',
        trim: 'ED174C',
      },
    ]
  },
  {
    id: 24,
    names: ["Phoenix Suns"],
    abbrevs: ["PHX"],
    colours: [
      {
        year: 1996,
        bg: '5F259F',
        text: 'FF6900',
        trim: 'EF3340',
      },
      {
        year: 2001,
        bg: '1D1160',
        text: 'E56020',
        trim: 'B95915',
      },
    ]
  },
  {
    id: 25,
    names: ["Portland Trailblazers", "Portland Trail Blazers"],
    abbrevs: ["POR"],
    colours: [
      {
        year: 1996,
        bg: 'E03A3E',
        text: '000000',
        trim: 'FFFFFF',
      },
    ]
  },
  {
    id: 26,
    names: ["Sacramento Kings"],
    abbrevs: ["SAC"],
    colours: [
      {
        year: 1996,
        bg: '542E91',
        text: 'FFFFFF',
        trim: 'C4CED4',
      },
      {
        year: 2016,
        bg: '5A2D81',
        text: 'FFFFFF',
        trim: '63727A',
      },
    ]
  },
  {
    id: 27,
    names: ["San Antonio Spurs"],
    abbrevs: ["SAS"],
    colours: [
      {
        year: 1996,
        bg: 'C4CED4',
        text: '000000',
        trim: '000000',
      },
    ]
  },
  {
    id: 28,
    names: ["Seattle Supersonics", "Seattle SuperSonics"],
    abbrevs: ["SEA"],
    colours: [
      {
        year: 1996,
        bg: '173F35',
        text: 'FFA300',
        trim: '9E2A2F',
      },
      {
        year: 2002,
        bg: '00653A',
        text: 'FFC200',
        trim: 'FFFFFF',
      },
    ]
  },
  {
    id: 29,
    names: ["Toronto Raptors"],
    abbrevs: ["TOR"],
    colours: [
      {
        year: 1996,
        bg: '753BBD',
        text: 'FFFFFF',
        trim: 'BA0C2F',
      },
      {
        year: 2003,
        bg: 'CE1141',
        text: 'FFFFFF',
        trim: '000000',
      },
      {
        year: 2015,
        bg: '000000',
        text: 'FFFFFF',
        trim: 'CE1141',
      },
    ]
  },
  {
    id: 30,
    names: ["Utah Jazz"],
    abbrevs: ["UTA"],
    colours: [
      {
        year: 1996,
        bg: '753BBD',
        text: '00A9E0',
        trim: '006272',
      },
      {
        year: 2005,
        bg: '00275D',
        text: '6CAEDF',
        trim: '3E2680',
      },
      {
        year: 2011,
        bg: '002B5C',
        text: 'F9A01B',
        trim: '00471B',
      },
    ]
  },
  {
    id: 31,
    names: ["Washington Wizards", "Washington Bullets"],
    abbrevs: ["WAS"],
    colours: [
      {
        year: 1996,
        bg: '002B5C',
        text: 'FFFFFF',
        trim: 'E31837',
      },
    ]
  },
];

const getTeamObj = (teamAbbrev, year) => {
  const result = TEAM_DATA.filter(team => {
    if(team.abbrevs.includes(teamAbbrev)) {
      return true;
    }
  });
  if(result) {
    return result[0];
  }
  return null;
}

export const getTeamAbbrev = (teamName) => {
  let abbr = TEAM_ABBREVS[teamName];
  if(!abbr || abbr.length < 1) {
    abbr = teamName
  }
  return abbr;
}

export const getTeamInfo = (csvRecord) => {
  const isPlayoffTeam = csvRecord.Team.includes('*');
  const formattedName = !isPlayoffTeam ? csvRecord.Team : csvRecord.Team.replace("*", "");
  const teamAbbrev = getTeamAbbrev(formattedName);
  const teamDetails = getTeamObj(teamAbbrev, csvRecord.Year);
  
  const colours = teamDetails.colours.filter(col => {
    if(col.year <= csvRecord.Year) {
      return true;
    }
  }).sort(function(col1, col2) {
    return col2.year - col1.year;
  });

  return {
    team: formattedName,
    teamAbbrev: teamAbbrev,
    playoffs: isPlayoffTeam,
    bg: colours[0].bg,
    colours: {
      trim: colours[0].trim,
      text: colours[0].text,
      bg: colours[0].bg,
    },
  }
};
