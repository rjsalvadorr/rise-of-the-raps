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
        text: '222222',
        bg: 'FFFFFF',
      },
      {
        year: 1999,
        text: '222222',
        bg: 'FFFFFF',
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
        text: 'C6CFD4',
        bg: '002A60',
      },
      {
        year: 2013,
        text: 'FFFFFF',
        bg: '000000',
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
        text: 'FFFFFF',
        bg: '007A33',
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
        text: '222222',
        bg: 'FFFFFF',
      },
      {
        year: 1999,
        text: '222222',
        bg: 'FFFFFF',
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
        text: '000000',
        bg: 'CE1141',
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
        text: '5C88DA',
        bg: 'E35205',
      },
      {
        year: 2004,
        text: '000000',
        bg: '6F263D',
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
        text: '222222',
        bg: 'FFFFFF',
      },
      {
        year: 1999,
        text: '222222',
        bg: 'FFFFFF',
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
        text: '222222',
        bg: 'FFFFFF',
      },
      {
        year: 1999,
        text: '222222',
        bg: 'FFFFFF',
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
        text: 'FFFFFF',
        bg: '006272',
      },
      {
        year: 2002,
        text: 'D50032',
        bg: '003DA5',
      },
      {
        year: 2017,
        text: 'ED174C',
        bg: '006BB6',
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
        text: 'FFA300',
        bg: '041E42',
      },
      {
        year: 2011,
        text: 'FDB927',
        bg: '006BB6',
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
        text: '222222',
        bg: 'FFFFFF',
      },
      {
        year: 1999,
        text: '222222',
        bg: 'FFFFFF',
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
        text: 'FDBB30',
        bg: '002D62',
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
        text: '222222',
        bg: 'FFFFFF',
      },
      {
        year: 1999,
        text: '222222',
        bg: 'FFFFFF',
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
        text: '552583',
        bg: 'FDB927',
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
        text: '222222',
        bg: 'FFFFFF',
      },
      {
        year: 1999,
        text: '222222',
        bg: 'FFFFFF',
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
        text: 'FEDD00',
        bg: 'BA0C2F',
      },
      {
        year: 2000,
        text: 'F9A01B',
        bg: '98002E',
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
        text: '222222',
        bg: 'FFFFFF',
      },
      {
        year: 1999,
        text: '222222',
        bg: 'FFFFFF',
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
        text: '222222',
        bg: 'FFFFFF',
      },
      {
        year: 1999,
        text: '222222',
        bg: 'FFFFFF',
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
        text: '222222',
        bg: 'FFFFFF',
      },
      {
        year: 1999,
        text: '222222',
        bg: 'FFFFFF',
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
        text: '222222',
        bg: 'FFFFFF',
      },
      {
        year: 1999,
        text: '222222',
        bg: 'FFFFFF',
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
        text: 'FE5000',
        bg: '0072CE',
      },
      {
        year: 1998,
        text: 'F58426',
        bg: '006BB6',
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
        text: '222222',
        bg: 'FFFFFF',
      },
      {
        year: 1999,
        text: '222222',
        bg: 'FFFFFF',
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
        text: 'FFFFFF',
        bg: '006BB6',
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
        text: '222222',
        bg: 'FFFFFF',
      },
      {
        year: 1999,
        text: '222222',
        bg: 'FFFFFF',
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
        text: '222222',
        bg: 'FFFFFF',
      },
      {
        year: 1999,
        text: '222222',
        bg: 'FFFFFF',
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
        text: '222222',
        bg: 'FFFFFF',
      },
      {
        year: 1999,
        text: '222222',
        bg: 'FFFFFF',
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
        text: '000000',
        bg: 'C4CED4',
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
        text: 'FFA300',
        bg: '173F35',
      },
      {
        year: 2002,
        text: 'FFC200',
        bg: '00653A',
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
        text: 'FFFFFF',
        bg: '753BBD',
      },
      {
        year: 2003,
        text: 'FFFFFF',
        bg: 'CE1141',
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
        text: '00A9E0',
        bg: '753BBD',
      },
      {
        year: 2005,
        text: '6CAEDF',
        bg: '00275D',
      },
      {
        year: 2011,
        text: 'F9A01B',
        bg: '00471B',
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
        text: '222222',
        bg: 'FFFFFF',
      },
      {
        year: 1999,
        text: '222222',
        bg: 'FFFFFF',
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
    colours: {
      bg: colours[0].bg,
      text: colours[0].text,
    },
  }
};
