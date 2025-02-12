export const validate =(schema)=>  async(req,res,next)=> {
    try {
        const parseBody = await schema.parseAsync(req.body);//! ye chack kare ga ki jo mene scema banaya hai auth-validation.js me os se milta hai ki nahi
        console.log(req.body);
        req.body = parseBody;
        next();
        
    } catch (err) {
        const status = 422;
        const message = "Invalid Input from validate middleware"
        const extraDetail =  err.errors[0].message;
        const error ={
            status,
            message,
            extraDetail,
        }
       next(error)
    }
}