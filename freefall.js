// Import the DataPoint class
const DataPoint = require('./datapoint');

const SLOPE_LEN = 4;
const A_GRAVITY = 9.81; // Earth's gravitational acceleration

function get_slope(timeseries) {
    let sumx = 0, sumy = 0, sumxx = 0, sumxy = 0;

    for (let i = 0; i < SLOPE_LEN; i++) {
        const y = timeseries[i].velD;
        const t = timeseries[i].t;

        sumx += t;
        sumy += y;
        sumxx += t * t;
        sumxy += t * y;
    }

    const n = SLOPE_LEN;
    const slope = (sumxy - sumx * sumy / n) / (sumxx - sumx * sumx / n);
    return slope;
}

function detect_freefall(timeseries) {
    timeseries[SLOPE_LEN - 1].az = get_slope(timeseries);
    const g = A_GRAVITY;

    const p = SLOPE_LEN - 2;
    const c = SLOPE_LEN - 1;

    const a = (g - timeseries[p].velD) / (timeseries[c].velD - timeseries[p].velD);
    if (a < 0 || a > 1) {
        return null;
    }

    const v_acc = timeseries[p].vAcc + a * (timeseries[c].vAcc - timeseries[p].vAcc);
    if (v_acc > 10) {
        return null;
    }

    const az = timeseries[p].az + a * (timeseries[c].az - timeseries[p].az);
    if (az < g / 5.0) {
        return null;
    }

    const exit_ts = parseInt(timeseries[p].ts + a * (timeseries[c].ts - timeseries[p].ts) - g / az * 1000);

    const exit_dp = new DataPoint();
    exit_dp.ts = exit_ts;
    exit_dp.lat = timeseries[p].lat + a * (timeseries[c].lat - timeseries[p].lat);
    exit_dp.lon = timeseries[p].lon + a * (timeseries[c].lon - timeseries[p].lon);

    return exit_dp;
}

