export default {
  remainTime(deadLineTimeStamp, type) {
    let result;

    function DHMS() {
      const nowTimeStamp = Date.parse(new Date());
      const remainTime = deadLineTimeStamp - nowTimeStamp;
      let remainDays = Math.floor(remainTime / (24 * 60 * 60 * 1000));
      let remainHours = Math.floor((remainTime % (24 * 3600 * 1000)) / (3600 * 1000));
      let remainMinutes = Math.floor(((remainTime % (24 * 3600000)) % 3600000) / (60 * 1000));
      let remainSeconds = Math.floor((((remainTime % 86400000) % 3600000) % 60000) / 1000);

      if (remainDays < 10) {
        remainDays = `0${remainDays}`;
      }

      if (remainHours < 10) {
        remainHours = `0${remainHours}`;
      }

      if (remainMinutes < 10) {
        remainMinutes = `0${remainHours}`;
      }

      if (remainSeconds < 10) {
        remainSeconds = `0${remainSeconds}`;
      }

      return `${remainDays} 天 ${remainHours} 时 ${remainMinutes} 分 ${remainSeconds} 秒`;
    }

    switch (type) {
      case 1:
        result = DHMS();
        break;
      default:
        break;
    }

    return result;
  },
};
