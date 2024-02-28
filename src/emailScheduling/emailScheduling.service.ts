
import { Injectable } from '@nestjs/common';
import EmailService from '../email/email.service';
import EmailScheduleDto from './dto/emailSchedule.dto';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export default class EmailSchedulingService {
  constructor(
    private readonly emailService: EmailService,
    private readonly schedulerRegistry: SchedulerRegistry
  ) { }

  scheduleEmail(emailSchedule: EmailScheduleDto) {
    const date = new Date(emailSchedule.date);
    console.log(date);
    const dateseconds = date.getSeconds();
    console.log(dateseconds);

    const dateMinutes = date.getMinutes();
    console.log(dateMinutes);

    const dateHour = date.getUTCHours();
    console.log(dateHour); // Đảm bảo rằng bạn không có chỗ trống trước "dateHour"


    const dateDayOfMonth = date.getDate();
    console.log(dateDayOfMonth);

    const dateMonth = date.getMonth() + 1; // Tháng bắt đầu từ 0, cần cộng thêm 1
    console.log(dateMonth);

    // const dateYear = date.get;
    // console.log(dateYear);


    const job = new CronJob(`${dateseconds} ${dateMinutes} ${dateHour} ${dateDayOfMonth} ${dateMonth} *`, () => {
      this.emailService.sendMail({
        to: emailSchedule.recipient,
        subject: emailSchedule.subject,
        text: emailSchedule.content
      });
    });

    // Log để kiểm tra việc tạo job
    console.log(`Job ${emailSchedule.subject} created at ${emailSchedule.date}`);

    // Đăng ký job với SchedulerRegistry
    this.schedulerRegistry.addCronJob(`${Date.now()}-${emailSchedule.subject}`, job);

    // Log để kiểm tra việc đăng ký job
    console.log(`Job ${Date.now()}-${emailSchedule.subject} registered`);

    // Kích hoạt job
    job.start();

    // Log để kiểm tra việc kích hoạt job
    console.log(`Job ${emailSchedule.subject} started`);
  }
}