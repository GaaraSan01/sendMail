import { STATUS_CODES } from "http";
import {verifyContentEmail} from "../middlewares/middlewares"
import { setEmail } from "../config";

export default async function RequirementsApi (req:Request)  {
    const message = "Mensagem enviada com sucesso!"

    if (req.method === 'OPTIONS') {
        //Adicionando Cors
        const response = new Response(null, {status: 204});
        response.headers.set('Access-Control-Allow-Origin', '*');
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
        return response;
    }
    const url = new URL(req.url)
    if(url.pathname === "/"){
        return new Response(STATUS_CODES[200], {status: 200, statusText:"Server online"})
    }
    if(url.pathname === "/email" && req.method === "POST"){
        const emailData = await verifyContentEmail(req);
        if (emailData instanceof Response) {
            emailData.headers.set('Access-Control-Allow-Origin', '*');
            emailData.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            return emailData;
        }
        setEmail(emailData).then(res => console.log(res)).catch(error => console.error(error))
        return new Response(STATUS_CODES[200], {status:200, statusText:message})
    }
    return new Response(STATUS_CODES[404], {status: 404, statusText:"Page not found"})
}