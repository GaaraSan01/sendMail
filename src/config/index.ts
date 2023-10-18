import { Resend } from "resend";
import { EmailType } from "../@types/typeEmail";

const resend = new Resend(Bun.env.KEY);
// export const setEmail = (data:EmailType) => console.log(data)
export const setEmail = (data:EmailType) => resend.emails.send(data);