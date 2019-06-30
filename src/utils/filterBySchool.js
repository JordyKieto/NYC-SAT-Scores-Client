const filterBySchool = (originalScores, schoolIndex)=>{
    return Object.keys(originalScores).reduce((newScores, race)=>{
        newScores[race] = [originalScores[race][schoolIndex]]
        return newScores;
    }, {});
};
export default filterBySchool;