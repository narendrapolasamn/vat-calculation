
module.exports = (on:any, config:any) => {
    on('task',{
        log(message:any){
            console.log(message);
            return null;
        }
    })
}
