require('dotenv').config()

const config = {
  port: parseInt(process.env.PORT || '8000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL || '',
  jwtSecret: process.env.JWT_SECRET || '',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880', 10),
  uploadPath: process.env.UPLOAD_PATH || './uploads',
}

module.exports = { config }


