import { getTeamInfo } from './team-data';

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
        bestSeasonWins: 1e-6,
        bestPlayoffWins: 1e-6,
      };
    }
  }

  isValidYear(year) {
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
      team: teamInfo.team,
      teamAbbrev: teamInfo.teamAbbrev,
      playoffs: type === 'playoffs' || teamInfo.playoffs,
      adjWinRate: 0,
      adjPlayoffWinRate: 0,
      overallRtg: 0,
      champion: false,
      colours: teamInfo.colours,
      winRate: 0,
      netRtg: 0,
      playoffWinRate: 0,
      playoffNetRtg: 0,
      regWins: 0,
      regLosses: 0,
      wr: 0,
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
    const teamInfo = getTeamInfo(csvRecord);
    let newRecord = this.getTeamRecord(csvRecord.Year, teamInfo);

    if (!newRecord) {
      newRecord = this.initializeTeamRecord(csvRecord, teamInfo);
    }

    if (type === 'regSeason') {
      const wins = parseInt(csvRecord.W, 10);
      const losses = parseInt(csvRecord.L, 10);
      const oRtg = parseFloat(csvRecord.ORtg);
      const dRtg = parseFloat(csvRecord.DRtg);

      const totalGames = wins + losses;
      const winRate = wins / totalGames;
      const netRtg = oRtg - dRtg;

      newRecord.regWins = wins;
      newRecord.regLosses = losses;
      newRecord.wr = winRate;
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
      let pWins = 0;

      wRate = rec.winRate / currentYear.bestSeasonWins;
      rec.adjWinRate = Number(Math.round((wRate * 100) + 'e2') + 'e-2')

      if (rec.playoffs) {
        pWins = rec.playoffWinRate / currentYear.bestPlayoffWins;
        rec.adjPlayoffWinRate = Number(Math.round((pWins * 100) + 'e2') + 'e-2')
        rec.champion = rec.adjPlayoffWinRate === 100;
      }

      let overallRtg = (wRate + wRate + pWins) / 3;
      if(rec.champion) {
        overallRtg += 0.2;
      }
      rec.overallRtg = Number(Math.round((overallRtg * 100) + 'e2') + 'e-2');
    }
  }
}

export default SeasonStats;
