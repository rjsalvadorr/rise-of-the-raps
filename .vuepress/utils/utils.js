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
}

export const getTeamAbbrev = (teamName) => {
  let abbr = TEAM_ABBREVS[teamName];
  if(!abbr || abbr.length < 1) {
    abbr = teamName
  }
  return abbr;
}

export const getBasicTeamInfo = (csvRecord) => {
  const isPlayoffTeam = csvRecord.Team.includes('*');
  const formattedName = !isPlayoffTeam ? csvRecord.Team : csvRecord.Team.replace("*", "");

  return {
    team: formattedName,
    teamAbbrev: getTeamAbbrev(formattedName),
    playoffs: isPlayoffTeam,
  }
};
