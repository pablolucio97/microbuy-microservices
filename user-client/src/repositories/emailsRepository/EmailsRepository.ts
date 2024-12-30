import { emailsApi } from "../../services/emailsService";
import { IEmailData, IEmailsRepository } from "./interface";

export class EmailsRepository implements IEmailsRepository {
  async sendEmail(data: IEmailData) {
    try {
      const response = await emailsApi.post("/emails/send", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
