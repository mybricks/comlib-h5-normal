export default {
  ':root' ({ data }) {
    return {}
  },
  prompts: {
    summary: '视频，可以播放各种视频',
    usage: `data声明
src: string
poster: string
object-fit: ['contain', 'fill', 'cover'] = 'contain'

styleAry声明
视频容器: .mybricks-video`
  }
}