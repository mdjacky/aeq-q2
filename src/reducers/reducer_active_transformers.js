let autobotList = [];
let deceptionList = [];

export function AutobotList (state = [], action) {
  switch(action.type) {
    case 'ADD_AUTO':
      autobotList = autobotList.concat([action.payload]);
      return autobotList;
    case 'DELETE_AUTO':
      autobotList = removeHelper(autobotList, action.payload);
      return autobotList;
    case 'CLEAR_ALL':
      autobotList = [];
      return autobotList;
    default:
      return state;
  }
}

export function DeceptionList (state = [], action) {
  switch(action.type) {
    case 'ADD_DECP':
      deceptionList = deceptionList.concat([action.payload]);
      return deceptionList;
    case 'DELETE_DECP':
      deceptionList = removeHelper(deceptionList, action.payload);
      return deceptionList;
    case 'CLEAR_ALL':
      deceptionList = [];
      return deceptionList;
    default:
      return state;
  }
}

function removeHelper(list, target) {
  let targetIndex;
  list.map((item, index) => {
    if(item.name === target.name) {
      targetIndex = index;
    }
  });

  if(typeof targetIndex === 'number'){
    return list.slice(0, targetIndex).concat(list.slice(targetIndex+1));
  }

  return list;
}