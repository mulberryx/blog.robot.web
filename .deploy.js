/**
 * 部署配置
 * @author Philip
 */
module.exports = {
  name: 'robot',
  dist: 'dist',
  type: 'web',
  build: 'build/build.js',
  ali_oss: {
    accessKeyId: 'LTAI2PBQSdfLOUme',
    accessKeySecret: 'uMuFXEuK06PGTEmHRiFCvoCNtgx8nb',
    bucket: 'raddeana-robot',
    region: 'oss-cn-hangzhou'
  }
}
