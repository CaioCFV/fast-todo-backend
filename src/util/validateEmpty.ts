function validateEmpty(data: Record<string, any>): Array<any> {
    const fieldsEmpty = Object.entries(data).filter((item)=>{
        return item[1] == '';
    });
      
    const allEmpty = fieldsEmpty.reduce((acum,curr)=>{
        return acum.concat(curr[0])
    },[]);
  
    return allEmpty;
}

export default validateEmpty;