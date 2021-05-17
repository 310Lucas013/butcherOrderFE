import {OpenTime} from './open-time';

export class Schedule {
  id: number;
  weekNumber: number;
  startDate: Date;
  endDate: Date;
  openTimes: OpenTime[];
}
