import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';

dayjs.extend(relativeTime);

const checkDate = (old)=>{
  const date = `${old.year}-${old.month}-${old.day}`
  return dayjs(date).fromNow();
};

export default checkDate;