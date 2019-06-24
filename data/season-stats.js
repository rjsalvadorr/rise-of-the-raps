const START_YEAR = 1996;
const CHAMP_YEAR = 2019;

/**
* Data store containing the NBA season summaries for every year since the
* Toronto Raptors expansion year. Methods are centred around reading data
* from two large CSV files and stitching them together.
*/
class SeasonStats {
  constructor() {
    this.stats = {};
    for (var yr = START_YEAR; yr <= CHAMP_YEAR; yr++) {
      this.stats["" + yr] = {
        children: [],
        bestSeasonWins: 0,
        bestPlayoffWins: 0,
      };
    }
  }

  isValidYear(year) {
    console.log(year, year >= START_YEAR && year <= CHAMP_YEAR);
    if(year >= START_YEAR && year <= CHAMP_YEAR) {
      return true;
    }
    return false;
   }

  /**
  * Gets a given year's season summary
  */
  getStatsByYear(year) {
    return this.stats[year];
  }

  /**
  * Gets a given year's season summary
  */
  getTeamRecord(year, teamInfo) {
    const currentYear = this.getStatsByYear(year);
    for (let rec of currentYear.children) {
      if (rec.teamAbbrev === teamInfo.teamAbbrev) {
        return rec;
      }
    }
    return null;
  }

  /**
  * Initializes a given team's record
  */
  initializeTeamRecord(csvRecord, teamInfo, type) {
    const currentYear = this.getStatsByYear(csvRecord.Year);
    const newRecord = {
      // team: csvRecord.Team,
      teamAbbrev: teamInfo.teamAbbrev,
      playoffs: type === 'playoffs' || teamInfo.playoffs,
      adjWinRate: 0,
      adjPlayoffWinRate: 0,
      overallRtg: 0,
    }
    currentYear.children.push(newRecord);
    return newRecord;
  }

  /**
  * Reads data from a CSV record, and adds them to the data store
  * instance
  */
  addData(csvRecord, type) {
    const currentYear = this.getStatsByYear(csvRecord.Year);
    const teamInfo = getBasicTeamInfo(csvRecord);
    let newRecord = this.getTeamRecord(csvRecord.Year, teamInfo);

    if (!newRecord) {
      newRecord = this.initializeTeamRecord(csvRecord, teamInfo);
    }

    if (type === 'season') {
      const wins = parseInt(csvRecord.W, 10);
      const losses = parseInt(csvRecord.L, 10);
      const oRtg = parseFloat(csvRecord.ORtg);
      const dRtg = parseFloat(csvRecord.DRtg);

      const totalGames = wins + losses;
      const winRate = wins / totalGames;
      const netRtg = oRtg - dRtg;

      newRecord.winRate = Number(Math.round((winRate * 100) + 'e2') + 'e-2');
      newRecord.netRtg = Number(Math.round(netRtg + 'e2') + 'e-2');
    }

    if (type === 'playoffs') {
      const wins = parseInt(csvRecord.W, 10);
      const oRtg = parseFloat(csvRecord.ORtg);
      const dRtg = parseFloat(csvRecord.DRtg);

      const netRtg = oRtg - dRtg;

      newRecord.playoffWinRate = wins;
      newRecord.playoffNetRtg = Number(Math.round(netRtg + 'e2') + 'e-2');
    }

    this.recalculateStats(csvRecord.Year, newRecord);
  }

  /**
  * Recalculates relative stats as CSV records are added in
  */
  recalculateStats(year, newRecord) {
    const currentYear = this.getStatsByYear(year);
    let seasonStatsChanged = false;
    let playoffStatsChanged = false;

    if (newRecord.winRate && newRecord.winRate > currentYear.bestSeasonWins) {
      currentYear.bestSeasonWins = newRecord.winRate;
    }

    if (newRecord.playoffWinRate && newRecord.playoffWinRate > currentYear.bestPlayoffWins) {
      currentYear.bestPlayoffWins = newRecord.playoffWinRate;
    }

    for (let rec of currentYear.children) {
      let wRate;
      let pWins;

      wRate = rec.winRate / currentYear.bestSeasonWins;
      rec.adjWinRate = Number(Math.round((wRate * 100) + 'e2') + 'e-2')

      if (rec.playoffs) {
        pWins = rec.playoffWinRate / currentYear.bestPlayoffWins;
        rec.adjPlayoffWinRate = Number(Math.round((pWins * 100) + 'e2') + 'e-2')
      }
      else {
        pWins = 0;
      }

      const overallRtg = (wRate + wRate + pWins) / 3;
      rec.overallRtg = Number(Math.round((overallRtg * 100) + 'e2') + 'e-2')
    }
  }
}
