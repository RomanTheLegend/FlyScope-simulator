class DataPoint {
    static A_GRAVITY = 9.81;  // Earth's gravitational acceleration
  
    constructor() {
      this.ts = 0;
      this.hasGeodetic = false;
      this.isValid = false;
  
      this.lat = 0.0;
      this.lon = 0.0;
      this.hMSL = 0.0;
  
      this.velN = 0.0;
      this.velE = 0.0;
      this.velD = 0.0;
  
      this.hAcc = 0.0;
      this.vAcc = 0.0;
      this.sAcc = 0.0;
  
      this.heading = 0.0;
      this.cAcc = 0.0;
  
      this.gpsFix = 0;
      this.numSV = 0;
  
      this.t = 0.0;
      this.x = 0.0;
      this.y = 0.0;
      this.z = 0.0;
  
      this.dist2D = 0.0;
      this.dist3D = 0.0;
  
      this.curv = 0.0;
      this.accel = 0.0;
  
      this.ax = 0.0;
      this.ay = 0.0;
      this.az = 0.0;
      this.amag = 0.0;
  
      this.lift = 0.0;
      this.drag = 0.0;
  
      this.vx = 0.0;
      this.vy = 0.0;
  
      this.theta = 0.0;
      this.omega = 0.0;
    }
  
    static interpolate(p1, p2, a) {
      const result = new DataPoint();
      result.vx = p1.vx + a * (p2.vx - p1.vx);
      result.vy = p1.vy + a * (p2.vy - p1.vy);
      // Continue interpolating other fields as needed
      return result;
    }
  
    static elevation(dp) {
      return dp.z;
    }
  
    static northSpeed(dp) {
      return dp.vy;
    }
  
    static eastSpeed(dp) {
      return dp.vx;
    }
  
    static northSpeedRaw(dp) {
      return dp.velN;
    }
  
    static eastSpeedRaw(dp) {
      return dp.velE;
    }
  
    static verticalSpeed(dp) {
      return dp.velD;
    }
  
    static horizontalSpeed(dp) {
      return Math.sqrt(dp.velE * dp.velE + dp.velN * dp.velN);
    }
  
    static totalSpeed(dp) {
      return Math.sqrt(dp.velE * dp.velE + dp.velN * dp.velN + dp.velD * dp.velD);
    }
  
    static diveAngle(dp) {
      const pi = 3.14159265359;
      return Math.atan2(dp.velD, Math.sqrt(dp.vx * dp.vx + dp.vy * dp.vy)) / pi * 180;
    }
  
    static curvature(dp) {
      return dp.curv;
    }
  
    static glideRatio(dp) {
      try {
        if (dp.velD !== 0) {
          return Math.sqrt(dp.velE * dp.velE + dp.velN * dp.velN) / dp.velD;
        } else {
          return 0;
        }
      } catch (e) {
        return 0;
      }
    }
  
    static horizontalAccuracy(dp) {
      return dp.hAcc;
    }
  
    static verticalAccuracy(dp) {
      return dp.vAcc;
    }
  
    static speedAccuracy(dp) {
      return dp.sAcc;
    }
  
    static numberOfSatellites(dp) {
      return dp.numSV;
    }
  
    static time(dp) {
      return dp.t;
    }
  
    static distance2D(dp) {
      return dp.dist2D;
    }
  
    static distance3D(dp) {
      return dp.dist3D;
    }
  
    static acceleration(dp) {
      return dp.accel;
    }
  
    static accForward(dp) {
      return dp.ax;
    }
  
    static accRight(dp) {
      return dp.ay;
    }
  
    static accDown(dp) {
      return dp.az;
    }
  
    static accMagnitude(dp) {
      return dp.amag;
    }
  
    static totalEnergy(dp) {
      const v = DataPoint.totalSpeed(dp);
      return v * v / 2 + DataPoint.A_GRAVITY * DataPoint.elevation(dp);
    }
  
    static energyRate(dp) {
      return DataPoint.totalSpeed(dp) * DataPoint.acceleration(dp) - DataPoint.A_GRAVITY * DataPoint.verticalSpeed(dp);
    }
  
    static liftCoefficient(dp) {
      return dp.lift;
    }
  
    static dragCoefficient(dp) {
      return dp.drag;
    }
  
    static course(dp) {
      return dp.theta;
    }
  
    static courseRate(dp) {
      return dp.omega;
    }
  
    static courseAccuracy(dp) {
      return dp.cAcc;
    }
  }

