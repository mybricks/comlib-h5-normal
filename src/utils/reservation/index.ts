export enum ReservationStatus {
  RESERVEON = 'RESERVEON', // 预约中
  CANCELRERSERVE = 'CANCELRERSERVE', // 取消预约
  GOTOROOM = 'GOTOROOM', // 进入直播间
  ROOMCLOSE = 'ROOMCLOSE', // 直播结束
  NOPLAY = 'NOPLAY', // 未开播
}

export const ReservationStatusHans = {
  RESERVEON: '预约中', // 预约中
  CANCELRERSERVE: '取消预约', // 取消预约
  GOTOROOM: '进入直播间', // 进入直播间
  ROOMCLOSE: '直播结束', // 直播结束
  NOPLAY: '未开播', // 未开播
};

const href = window.location.href;
const isProd = href.includes('fangzhou.kwaixiaodian.com');
const isLocal = href.includes('localhost') || /\d+\.\d+\.\d+\.\d+/.test(href);
const reservationHost = isProd || isLocal ? '' : 'https://fangzhou.kwaixiaodian.com';

const headers = {
  'trace-context': '{"laneId":"PRT.test"}',
};

function requestData(env, url, options) {
  return env.ajax(url, options);
}

export async function createReservation({ env, data }) {
  const { title, startTime, endTime, authorId } = data;

  if (title && startTime && endTime && authorId) {
    // 发送请求
    const url = reservationHost + '/rest/app/activity/traffic/c/reserve/create';
    const opts = {
      method: 'POST',
      headers,
      data: {
        reserveTitle: title,
        authorId,
        startReservationTime: +new Date() + 3600 * 1000 * 0.5, // 允许用户开始预约的时间
        endReservationTime: endTime + 3600 * 1000 * 0.5, // 用户截止预约的时间
        startPushTime: startTime, // 主播预计开始直播的时间
        endPushTime: endTime, // 主播预计结束直播的时间
      },
    };
    return requestData(env, url, opts);
  }
}

export async function getReservationDetail({ env, ids }) {
  const url = reservationHost + '/rest/h5/activity/traffic/c/delivery/resource/h5';
  const opts = {
    method: 'POST',
    headers,
    data: {
      pageCode: 'qixiMainPage',
      resource: [
        {
          resourceCode: 'liveNotice',
          param: {
            cursor: 0,
            size: ids.length,
            firstRequest: false,
            idList: ids,
            pageCode: env.getPageCode(),
          },
        },
      ],
    },
  };

  return requestData(env, url, opts);
}

export async function bookReservation({ env, id }) {
  const url = reservationHost + '/rest/app/activity/traffic/c/reserve/book';
  const opts = {
    method: 'POST',
    headers,
    data: {
      reserveId: id,
      pageCode: env.getPageCode(),
    },
  };
  return requestData(env, url, opts);
}

export async function cancelReservation({ env, id }) {
  const url = reservationHost + '/rest/app/activity/traffic/c/reserve/cancel';

  const opts = {
    method: 'POST',
    headers,
    data: {
      reserveId: id,
      pageCode: env.getPageCode(),
    },
  };

  return requestData(env, url, opts);
}
