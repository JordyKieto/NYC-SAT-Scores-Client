const filterByRange = (originalScores, [lesserOrEqual, greaterOrEqual])=>{
    return Object.keys(originalScores).reduce((newScores, race)=>{
        newScores[race] = originalScores[race].filter(({y})=>{ return y <= greaterOrEqual && y >= lesserOrEqual})
        return newScores;
    }, {})
}
export default filterByRange;