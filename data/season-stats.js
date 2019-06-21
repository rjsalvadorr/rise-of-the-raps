const START_YEAR = 1996;
const CHAMP_YEAR = 2019;

class SeasonStats {
  constructor() {
    this.stats = {};
    for (var yr = START_YEAR; yr <= CHAMP_YEAR; yr++) {
      this.stats["" + yr] = {
        records: [],
        bestSeasonWins: 0,
        bestPlayoffWins: 0,
      };
    }
  }

  getStatsByYear(year) {
    return this.stats[year];
  }

  getTeamRecord(year, additions) {
    const currentYear = this.getStatsByYear(year);
    for (let rec of currentYear.records) {
      if (rec.teamAbbrev === additions.teamAbbrev) {
        return rec;
      }
    }
    return null;
  }

  initializeTeamRecord(csvRecord, additions, type) {
    const currentYear = this.getStatsByYear(csvRecord.Year);
    const newRecord = {
      // team: csvRecord.Team,
      teamAbbrev: additions.teamAbbrev,
      playoffs: type === 'playoffs' || additions.playoffs,
      adjWinRate: 0,
      adjPlayoffWinRate: 0,
      overallRtg: 0,
    }
    currentYear.records.push(newRecord);
    return newRecord;
  }

  addData(csvRecord, type) {
    const currentYear = this.getStatsByYear(csvRecord.Year);
    const additions = getBasicTeamInfo(csvRecord);
    let newRecord = this.getTeamRecord(csvRecord.Year, additions);

    if (!newRecord) {
      newRecord = this.initializeTeamRecord(csvRecord, additions);
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

  recalculateStats(year, newRecord) {
    const currentYear = this.getStatsByYear(year);
    let seasonStatsChanged = false;
    let playoffStatsChanged = false;

    if (newRecord.winRate && newRecord.winRate > currentYear.bestSeasonWins) {
      currentYear.bestSeasonWins = newRecord.winRate;
      // seasonStatsChanged = true;
    }

    if (newRecord.playoffWinRate && newRecord.playoffWinRate > currentYear.bestPlayoffWins) {
      currentYear.bestPlayoffWins = newRecord.playoffWinRate;
      // playoffStatsChanged = true;
    }

    // if (seasonStatsChanged || playoffStatsChanged) {
      for (let rec of currentYear.records) {
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
    // }
  }
}
