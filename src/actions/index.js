
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

  //Sort by rank
  autobots = autobots.sort((a, b) => { return b.rank - a.rank; });
  deceptions = deceptions.sort((a, b) => { return b.rank - a.rank; });
  
  //Fight
  let winningTeam = '';
  let lostTeamSurvivors = [];
  
  let autoScore = 0;
  let i = 0;
  while(i<autobots.length && i<deceptions.length) {
    const curr_autobot = autobots[i];
    const curr_deception = deceptions[i];

    //Check Name
    const isAutobotMaster = curr_autobot.name === 'Optimus Prime' || curr_autobot.name === 'Predaking';
    const isDeceptionMaster = curr_deception.name === 'Optimus Prime' || curr_deception.name === 'Predaking';
    
    if(isAutobotMaster && isDeceptionMaster) {
      winningTeam = 'Tie';
      autobots = [];
      deceptions = [];
      i++;
      break;
    } else if (isAutobotMaster) {
      autoScore++;
      curr_deception.isDestroyed = true;
    } else if (isDeceptionMaster) {
      autoScore--;
      curr_autobot.isDestroyed = true;
    } 
    //Check courage and strength
    else if(curr_autobot.courage + 4 <= curr_deception.courage && curr_autobot.strength + 3 <= curr_deception.strength) {
      autoScore--;
      curr_autobot.isDestroyed = true;
    } else if (curr_deception.courage + 4 <= curr_autobot.courage && curr_deception.strength + 3 <= curr_autobot.strength) {
      autoScore++;
      curr_deception.isDestroyed = true;
    }
    //Check skill
    else if (curr_autobot.skill + 3 <= curr_deception.skill) {
      autoScore--;
      curr_autobot.isDestroyed = true;
    } else if (curr_deception.skill + 3 <= curr_autobot.skill) {
      autoScore++;
      curr_deception.isDestroyed = true;
    }
    //Check overall rating
    else if (getOverallRating(curr_autobot) < getOverallRating(curr_deception)) {
      autoScore--;
      curr_autobot.isDestroyed = true;
    } else if (getOverallRating(curr_autobot) > getOverallRating(curr_deception)) {
      autoScore++;
      curr_deception.isDestroyed = true;
    }
    //Tie 
    else {
      curr_autobot.isDestroyed = true;
      curr_deception.isDestroyed = true;
    }

    i++;
  }

  //Summary the result
  if(winningTeam !== 'Tie'){
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

function getOverallRating({ strength, intelligence, speed, endurance, firepower }) {
  return strength + intelligence + speed + endurance + firepower;
}