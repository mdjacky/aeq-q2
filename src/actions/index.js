export function addTransformer(transformer) {
  return {
    type: transformer.team === 'autobots'? 'ADD_AUTO' : 'ADD_DECP',
    payload: transformer
  };
}

export function clearAll() {
  return {
    type: 'CLEAR_ALL',
    payload: null
  };
}

export function deleteTransformer(transformer) {
  return {
    type: transformer.team === 'autobots'? 'DELETE_AUTO' : 'DELETE_DECP',
    payload: transformer
  };
}

export function calculateResult(autobots, deceptions) {
  autobots.forEach(transformer => transformer.isDestroyed = false );
  deceptions.forEach(transformer => transformer.isDestroyed = false );

  // Sort by rank
  autobots = autobots.sort((a, b) => { return b.rank - a.rank; });
  deceptions = deceptions.sort((a, b) => { return b.rank - a.rank; });
  
  // Fight
  let isAllDied = false;
  let autoScore = 0;
  let i = 0;
  
  while(i<autobots.length && i<deceptions.length && !isAllDied) {
    const curr_autobot = autobots[i];
    const curr_deception = deceptions[i];

    switch(getWinningTeam(curr_autobot, curr_deception)) {
      case 'autobot':
        autoScore++;
        curr_deception.isDestroyed = true;
        break;
      case 'deception':
        autoScore--;
        curr_autobot.isDestroyed = true;
        break;
      case 'tie':
        curr_autobot.isDestroyed = true;
        curr_autobot.isDestroyed = true;
        break;
      case 'ALL_DIE':
        isAllDied = true;
    };

    i++;
  }

  // Summary the result
  let lostTeamSurvivors = [];
  let winningTeam = '';

  if(isAllDied){
    winningTeam = 'Tie';
  } else {
    if(autoScore > 0) {
      winningTeam = 'Autobots';
      lostTeamSurvivors = deceptions.filter(transformer => !transformer.isDestroyed);
    } else if (autoScore < 0) {
      winningTeam = 'Deceptions';
      lostTeamSurvivors = autobots.filter(transformer => !transformer.isDestroyed);
    } else {
      winningTeam = 'Tie';
    }
  }

  return {
    type: 'DISPLAY_RESULT',
    payload: {
      battleNum: i,
      winningTeam,
      lostTeamSurvivors
    }
  };
}

function getWinningTeam(autobot, deception) {
  //Check name
  const isAutobotMaster = autobot.name === 'Optimus Prime' || autobot.name === 'Predaking';
  const isDeceptionMaster = deception.name === 'Optimus Prime' || deception.name === 'Predaking';

  if(isAutobotMaster && isDeceptionMaster) {
    return 'ALL_DIE';
  } 
  
  if (isAutobotMaster) {
    return 'autobot';
  } 
  
  if (isDeceptionMaster) {
    return 'deception';
  }

  //Check courage and strength value
  if(autobot.courage + 4 <= deception.courage && autobot.strength + 3 <= deception.strength) {
    return 'deception';
  } 
  
  if (deception.courage + 4 <= autobot.courage && deception.strength + 3 <= autobot.strength) {
    return 'autobot';
  }

  //Check skill value
  if (autobot.skill + 3 <= deception.skill) {
    return 'deception';
  }

  if (deception.skill + 3 <= autobot.skill) {
    return 'autobot';
  }

  //Check overall rating value
  if (getOverallRating(autobot) < getOverallRating(deception)) {
    return 'deception';
  }
  
  if (getOverallRating(autobot) > getOverallRating(deception)) {
    return 'autobot';
  }

  //Tie 
  return 'tie';
}

function getOverallRating({ strength, intelligence, speed, endurance, firepower }) {
  return strength + intelligence + speed + endurance + firepower;
}