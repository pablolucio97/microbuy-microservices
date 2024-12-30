export interface IEmailData {
  to: string;
}

export interface IEmailsRepository {
  sendEmail: (data: IEmailData) => Promise<void>;
}
