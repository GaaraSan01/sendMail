import { EmailType } from "../@types/typeEmail";


export const verifyContentEmail = async (req: Request) => {
    const emailFrom = Bun.env.EMAIL
    const data: EmailType = JSON.parse(await req.text()) 
    data.from = emailFrom || "onboarding@resend.dev"
    if(!data){
        return new Response("Invalid email data.", { status: 400 });
    }
    return data
}