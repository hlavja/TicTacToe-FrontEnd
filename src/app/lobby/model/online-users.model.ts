export class OnlineUser {
  constructor(public sessionId: string, public userLogin: string, public ipAddress: string, public page: string, public time: string) {}
}
